import * as PixiMatter from '../libs/pixi-matter'
import { Resolution } from './types/common'
import Matter, { IChamferableBodyDefinition } from 'matter-js';
import * as ECS from '../libs/pixi-ecs';
import { PlayerController } from './controllers/playerController';
import { BOUDNRY_THICKNESS } from './constants';

export class GameFactory {
    binder: PixiMatter.MatterBind
    resolution: Resolution

    constructor(binder: PixiMatter.MatterBind, resolution: Resolution) {
        this.binder = binder
        this.resolution = resolution
    }

    createPlayer(width: number, height: number) {
        const options: IChamferableBodyDefinition = { // TODO: Doesn't work
            density: .025,
            restitution: 0,
            render: {
                fillStyle: 'red',
                strokeStyle: 'blue',
                lineWidth: 3
           }
        }
        const playerBody = Matter.Bodies.rectangle(
            this.resolution.width / 2, this.resolution.height - BOUDNRY_THICKNESS,
            width, height, options
        )
		const playerContainer: ECS.Container = this.binder.addBody(playerBody)
		playerContainer.addComponent(new PlayerController(playerBody))
    }

    createBoundry() {
        this.createWalls()
        this.createGround()
    }

    createWalls() {
        const options: IChamferableBodyDefinition = { isStatic: true, restitution: 1 }
        const leftWall = Matter.Bodies.rectangle(BOUDNRY_THICKNESS / 2, this.resolution.height / 2, BOUDNRY_THICKNESS, this.resolution.height, options)
        const rightWall = Matter.Bodies.rectangle(this.resolution.width - BOUDNRY_THICKNESS / 2, this.resolution.height / 2, BOUDNRY_THICKNESS, this.resolution.height, options)
        leftWall.restitution = .99
        rightWall.restitution = .99
        Matter.World.add(this.binder.mWorld, [leftWall, rightWall]);
    }

    createGround() {
        Matter.World.add(this.binder.mWorld, [
			Matter.Bodies.rectangle(this.resolution.width / 2, this.resolution.height - BOUDNRY_THICKNESS / 2, this.resolution.width, BOUDNRY_THICKNESS, {
                isStatic: true,
                restitution: 0
            }),
		]);
    }
}