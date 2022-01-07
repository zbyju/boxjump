import Matter from 'matter-js';
import * as ECS from '../../libs/pixi-ecs';
import { Level } from '../levels/level';
import { Box } from '../objects/box';
import { addBoxGraphics, removeBoxGraphics } from '../utils/boxGraphics';

export class BoxController extends ECS.Component {
    box: Box
    playerBody: Matter.Body

    changeColorCounter: number
    changeColorThreshold: number = 1
    colorActive: boolean

    constructor(box: Box, playerBody: Matter.Body, scene: ECS.Scene) {
        super()
        this.scene = scene

        this.box = box
        this.playerBody = playerBody

        this.changeColorCounter = 0
        this.colorActive = false
    }

    activateColor() {
        this.colorActive = true
        const boxGroup = this.scene.findObjectsByTag(this.box.group)
        boxGroup.forEach(b => {
            removeBoxGraphics(b)
            addBoxGraphics(b, this.box.activeColor)
        })
    }

    deactivateColor() {
        this.changeColorCounter = 0
        this.colorActive = false
        const boxGroup = this.scene.findObjectsByTag(this.box.group)
        boxGroup.forEach(b => {
            removeBoxGraphics(b)
            addBoxGraphics(b, this.box.color)
        })
    }

    updateColor() {
        const collision = Matter.SAT.collides(this.box.body, this.playerBody)

        if(!this.colorActive && collision.collided && collision.normal.y < 0) {
            if(this.changeColorCounter >= this.changeColorThreshold) {
                this.activateColor()
            } else {
                this.changeColorCounter += 1
            }
        }
        if(this.colorActive && !collision.collided) {
            this.deactivateColor()
        }
    }

    onUpdate(delta: number, absolute: number): void {
        this.updateColor()
    }
}