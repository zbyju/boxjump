import Matter from 'matter-js';
import * as ECS from '../../libs/pixi-ecs';
import { Level } from '../levels/level';
import { Box } from '../objects/box';
import { addBoxGraphics, removeBoxGraphics } from '../utils/boxGraphics';

export class FinishBoxController extends ECS.Component {
    box: Box
    playerBody: Matter.Body

    constructor(box: Box, playerBody: Matter.Body) {
        super()

        this.box = box
        this.playerBody = playerBody
    }
    
    checkFinishGame() {
        const collision = Matter.SAT.collides(this.box.body, this.playerBody)

        if(collision.collided) {
            console.log("test")
            this.sendMessage("finishgame")
            this.finish()
        }
    }

    onUpdate(delta: number, absolute: number): void {
        this.checkFinishGame()
    }
}