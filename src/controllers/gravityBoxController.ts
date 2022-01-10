import Matter, { World } from 'matter-js';
import * as ECS from '../../libs/pixi-ecs';
import { Level } from '../levels/level';
import { MessageEnum } from '../message';
import { Box } from '../objects/box';
import { Vector } from '../types/common';
import { addBoxGraphics, removeBoxGraphics } from '../utils/boxGraphics';

export class GravityBoxController extends ECS.Component {
    box: Box
    playerBody: Matter.Body
    scene: ECS.Scene
    engine: Matter.Engine

    counter: number
    threshold: number = 1
    active: boolean
    gravity: Vector

    constructor(box: Box, playerBody: Matter.Body, scene: ECS.Scene, engine: Matter.Engine, gravity: Vector) {
        super()
        this.scene = scene
        this.engine = engine

        this.box = box
        this.playerBody = playerBody

        this.counter = 0
        this.active = false
        this.gravity = gravity
    }

    onInit() {
        this.subscribe(MessageEnum.CHANGE_GRAVITY)
    }

    onMessage(msg: ECS.Message) {
        if(msg.action === MessageEnum.CHANGE_GRAVITY) {
            const collision = Matter.SAT.collides(this.box.body, this.playerBody)
            console.log(collision.collided)
            if(collision.collided) {
                this.activate()
            } else {
                this.deactivate()
            }
        }
    }

    activate() {
        this.active = true
        const boxGroup = this.scene.findObjectsByTag(this.box.group)
        boxGroup.forEach(b => {
            removeBoxGraphics(b)
            addBoxGraphics(b, this.box.activeColor)
            this.engine.gravity.x = this.gravity.x
            this.engine.gravity.y = this.gravity.y
        })
    }

    deactivate() {
        this.counter = 0
        this.active = false
        const boxGroup = this.scene.findObjectsByTag(this.box.group)
        boxGroup.forEach(b => {
            removeBoxGraphics(b)
            addBoxGraphics(b, this.box.color)
        })
    }

    updateColor() {
        const collision = Matter.SAT.collides(this.box.body, this.playerBody)

        if(!this.active && collision.collided && collision.normal.y < 0) {
            if(this.counter >= this.threshold) {
                this.activate()
                this.sendMessage(MessageEnum.CHANGE_GRAVITY)
            } else {
                this.counter += 1
            }
        }
    }

    onUpdate(delta: number, absolute: number): void {
        this.updateColor()
    }
}