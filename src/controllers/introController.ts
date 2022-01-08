import * as ECS from '../../libs/pixi-ecs';
import { Resolution } from '../types/common';
import { IntroStages } from '../types/intro';
import { dateDifferenceInSeconds } from '../utils/date';

export class IntroController extends ECS.Component {
    scene: ECS.Scene
    resolution: Resolution
    alpha: number
    stage: IntroStages
    text: ECS.Text
    cover: ECS.Graphics
    wait: Date

    constructor(scene: ECS.Scene, resolution: Resolution) {
        super()
        this.scene = scene
        this.resolution = resolution
        this.alpha = 0
        this.stage = IntroStages.WAIT
        this.wait = new Date()

        const style = new PIXI.TextStyle({
	        fontFamily: 'Trebuchet MS',
	        fontSize: 80,
	        fill: '#ffffff',
	        stroke: '#4a1850',
	        strokeThickness: 5,
            alpha: this.alpha
	    });

	    this.text = new PIXI.Text('THE BEGINNING', style);
	    this.text.position.set(resolution.width / 2, resolution.height / 2);
	    this.text.anchor.set(0.5);
	    this.scene.stage.addChild(this.text);

        this.scene.stage.sortableChildren = true

        this.createCover()
    }

    createCover() {
        if(this.cover) {
            this.cover.destroy()
        }
        this.cover = new ECS.Graphics().beginFill(0, this.alpha).drawRect(0, 0, this.resolution.width, this.resolution.height)
        this.cover.zIndex = 1000
        this.scene.stage.addChild(this.cover)
    }

    onUpdate(delta: number, absolute: number) {
        if(this.stage === IntroStages.WAIT) {
            if(dateDifferenceInSeconds(this.wait, new Date) > 1.5) {
                this.stage = IntroStages.FADE_BLACK
            }
        } else if(this.stage === IntroStages.FADE_BLACK) {
            this.alpha += 0.0005 * delta
            this.createCover()
            if(this.alpha > 1) {
                this.stage = IntroStages.FADE_OUT
                this.text.destroy()
                this.sendMessage("introdone")
                this.alpha = 1
            }
        } else if(IntroStages.FADE_OUT) {
            this.alpha -= 0.0009 * delta
            this.createCover()
            if(this.alpha <= 0) {
                this.stage = IntroStages.DESTROY
                this.cover.destroy()
                this.finish()
            }
        }
    }
}