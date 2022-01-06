import Matter from 'matter-js';
import * as ECS from '../../libs/pixi-ecs';
import { Box } from '../objects/box';

export class BoxController extends ECS.Component {
    // boxBody: Matter.Body
    box: Box
    playerBody: Matter.Body

    changeColorCounter: number
    changeColorThreshold: number = 1
    colorActive: boolean

    constructor(box: Box, playerBody: Matter.Body) {
        super()
        this.box = box
        this.playerBody = playerBody

        this.changeColorCounter = 0
        this.colorActive = false
    }

    activateColor() {
        this.colorActive = true
        this.box.removeGraphics()
        this.box.addGraphics(this.box.activeColor)
    }

    deactivateColor() {
        this.changeColorCounter = 0
        this.colorActive = false
        this.box.removeGraphics()
        this.box.addGraphics()
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