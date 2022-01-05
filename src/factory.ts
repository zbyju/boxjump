import * as PixiMatter from '../libs/pixi-matter'
import { Resolution } from './types/common'
import Matter, { IChamferableBodyDefinition } from 'matter-js';
import * as ECS from '../libs/pixi-ecs';
import { PlayerController } from './controllers/playerController';
import { GROUND_FRICTION, GROUND_RESTITUION, GROUND_WIDTH, PLAYER_DENSITY, PLAYER_FRICTION, PLAYER_FRICTION_AIR, PLAYER_HEIGHT, PLAYER_INERTIA, PLAYER_RESTITUTION, PLAYER_WIDTH, WALL_FRICTION, WALL_RESTITUTION, WALL_WIDTH } from './constants';
import { Level } from './levels/level';

export class GameFactory {
    binder: PixiMatter.MatterBind
    resolution: Resolution

    constructor(binder: PixiMatter.MatterBind, resolution: Resolution) {
        this.binder = binder
        this.resolution = resolution
    }

    createPlayer() {
        console.log(PLAYER_DENSITY)
        const options: IChamferableBodyDefinition = {
            density: PLAYER_DENSITY,
            restitution: PLAYER_RESTITUTION,
            friction: PLAYER_FRICTION,
            frictionAir: PLAYER_FRICTION_AIR,
            inertia: PLAYER_INERTIA,
        }
        const playerBody = Matter.Bodies.rectangle(
            this.resolution.width / 2, this.resolution.height - GROUND_WIDTH - 2,
            PLAYER_WIDTH, PLAYER_HEIGHT, options
        )
		const playerContainer: ECS.Container = this.binder.addBody(playerBody)
		playerContainer.addComponent(new PlayerController(playerBody, this.resolution))
        playerContainer.addChild(new ECS.Graphics().beginFill(0xFFFFFF).drawRect(-PLAYER_WIDTH / 2, - PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT))

        return playerBody
    }

    createWalls() {
        const options: IChamferableBodyDefinition = { isStatic: true, restitution: WALL_RESTITUTION, friction: WALL_FRICTION }
        const leftWall = Matter.Bodies.rectangle(WALL_WIDTH / 2, this.resolution.height / 2, WALL_WIDTH, this.resolution.height, options)
        const rightWall = Matter.Bodies.rectangle(this.resolution.width - WALL_WIDTH / 2, this.resolution.height / 2, WALL_WIDTH, this.resolution.height, options)
        leftWall.restitution = WALL_RESTITUTION
        rightWall.restitution = WALL_RESTITUTION
        Matter.World.add(this.binder.mWorld, [leftWall, rightWall]);
        return [leftWall, rightWall]
    }

    createBoxes(level: Level) {
        const boxes = level.getBoxes()
        boxes.forEach(box => {
            const boxContainer: ECS.Container = this.binder.addBody(box.box)
            const graphics = new ECS.Graphics().beginFill(0x2D2D2D).drawRect(- boxContainer.width / 2, - boxContainer.height / 2, boxContainer.width, boxContainer.height)
            if(box.box.angle != 0){
                const ratio = boxContainer.width / box.size.width
                graphics.width = Math.ceil(boxContainer.width / ratio) + 1
                graphics.height = Math.ceil(boxContainer.height / ratio) + 1
                graphics.rotation = box.box.angle
            }
            boxContainer.addChild(
                graphics
            ).addTag("box")
        })
        return boxes
    }
}