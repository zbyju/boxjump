import * as ECS from '../../libs/pixi-ecs';
import { Resolution } from '../types/common';
import { dateDifferenceInSeconds } from '../utils/date';
import { Cover, OPAQUE, OutroStages, TRANSPARENT } from '../types/scenes';
import { MessageEnum } from '../message';

export class OutroController extends ECS.Component {
    scene: ECS.Scene
    resolution: Resolution
    gameStart: Date

    stage: OutroStages
    texts: ECS.Text[]
    background: Cover
    foreground: Cover
    wait: Date

    constructor(scene: ECS.Scene, resolution: Resolution, gameStart: Date) {
        super()
        this.scene = scene
        this.resolution = resolution
        this.gameStart = gameStart

        this.stage = OutroStages.FADE_BLACK
        this.wait = new Date()

        this.scene.stage.sortableChildren = true

        this.background = {cover: null, alpha: TRANSPARENT, zIndex: 500}
        this.foreground = {cover: null, alpha: OPAQUE, zIndex: 1001}

        this.texts = []
    }

    createForeground() {
        if(this.foreground.cover !== null) {
            this.foreground.cover.destroy()
        }
        const newCover = new ECS.Graphics().beginFill(0, this.foreground.alpha).drawRect(0, 0, this.resolution.width, this.resolution.height)
        newCover.zIndex = this.foreground.zIndex
        this.foreground.cover = newCover
    }
    createBackground() {
        if(this.background.cover) {
            this.background.cover.destroy()
        }
        const newCover = new ECS.Graphics().beginFill(0, this.background.alpha).drawRect(0, 0, this.resolution.width, this.resolution.height)
        newCover.zIndex = this.background.zIndex
        this.background.cover = newCover
    }

    recreateForeground() {
        this.createForeground()
        this.scene.stage.addChild(this.foreground.cover)
    }
    recreateBackground() {
        this.createBackground()
        this.scene.stage.addChild(this.background.cover)
    }

    createText() {
        const style = new PIXI.TextStyle({
	        fontFamily: 'Trebuchet MS',
	        fontSize: 80,
	        fill: '#ffffff',
	        stroke: '#4a1850',
	        strokeThickness: 5,
	    });

        const style2 = new PIXI.TextStyle({
	        fontFamily: 'Trebuchet MS',
	        fontSize: 40,
	        fill: '#ffffff',
	        stroke: '#4a1850',
	        strokeThickness: 5,
	    });

        const endText = new PIXI.Text('THE END', style);
	    endText.position.set(this.resolution.width / 2, this.resolution.height / 3);
        endText.anchor.set(0.5);
        endText.zIndex = 750
        
        const scoreText = new PIXI.Text('Time to beat: ' + dateDifferenceInSeconds(this.gameStart, new Date()).toFixed(2) + "s", style2);
	    scoreText.position.set(this.resolution.width / 2, this.resolution.height / 3 * 2);
        scoreText.anchor.set(0.5);
        scoreText.zIndex = 750
        
        this.texts = [endText, scoreText]
	    this.scene.stage.addChild(endText);
	    this.scene.stage.addChild(scoreText);
    }

    removeText() {
        this.texts.forEach(t => t.destroy())
    }

    increaseAlpha(delta: number, cover: Cover) {
        cover.alpha += 0.0009 * delta
    }

    decreaseAlpha(delta: number, cover: Cover) {
        cover.alpha -= 0.0005 * delta
    }

    onUpdate(delta: number, absolute: number) {
        if(this.stage === OutroStages.FADE_BLACK) {
            if(this.background.alpha < OPAQUE) {
                this.increaseAlpha(delta, this.background)
                this.recreateBackground()
            } else {
                this.stage = OutroStages.FADE_TEXT_IN
                this.createText()
                this.foreground.alpha = OPAQUE
                this.createForeground()
            }
        } else if(this.stage === OutroStages.FADE_TEXT_IN) {
            if(this.foreground.alpha >= TRANSPARENT) {
                this.decreaseAlpha(delta, this.foreground)
                this.recreateForeground()
            } else {
                this.stage = OutroStages.WAIT
                this.wait = new Date()
            }
        } else if(this.stage === OutroStages.WAIT) {
            if(dateDifferenceInSeconds(this.wait, new Date()) > 5) {
                this.stage = OutroStages.FADE_TEXT_OUT
                this.foreground.alpha = TRANSPARENT
            }
        } else if(this.stage === OutroStages.FADE_TEXT_OUT) {
            if(this.foreground.alpha < OPAQUE) {
                this.increaseAlpha(delta, this.foreground)
                this.recreateForeground()
            } else {
                this.stage = OutroStages.FADE_OUT
                this.sendMessage(MessageEnum.OUTRO_FADE_OUT)
                this.removeText()
                this.background.alpha = OPAQUE
                this.createBackground()
                this.foreground.cover.destroy()
            }
        } else if(this.stage === OutroStages.FADE_OUT) {
            if(this.background.alpha >= TRANSPARENT) {
                this.decreaseAlpha(delta, this.background)
                this.recreateBackground()
            } else {
                this.stage = OutroStages.DESTROY
                this.sendMessage(MessageEnum.OUTRO_DONE)
                this.background.cover.destroy()
            }
        }
    }
}