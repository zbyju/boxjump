import * as PixiMatter from '../libs/pixi-matter'
import { Resolution } from './types/common'
import Matter, { IChamferableBodyDefinition } from 'matter-js';
import * as ECS from '../libs/pixi-ecs';
import { PlayerController } from './controllers/playerController';
import { GROUND_FRICTION, GROUND_RESTITUION, GROUND_WIDTH, PLAYER_DENSITY, PLAYER_FRICTION, PLAYER_FRICTION_AIR, PLAYER_HEIGHT, PLAYER_INERTIA, PLAYER_RESTITUTION, PLAYER_WIDTH, WALL_FRICTION, WALL_RESTITUTION, WALL_WIDTH } from './constants';

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
		playerContainer.addComponent(new PlayerController(playerBody))
        playerContainer.addChild(new ECS.Graphics().beginFill(0xFFFFFF).drawRect(-PLAYER_WIDTH / 2, - PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT))
    }

    createBoundry() {
        this.createWalls()
        this.createGround()
    }

    createWalls() {
        const options: IChamferableBodyDefinition = { isStatic: true, restitution: WALL_RESTITUTION, friction: WALL_FRICTION }
        const leftWall = Matter.Bodies.rectangle(WALL_WIDTH / 2, this.resolution.height / 2, WALL_WIDTH, this.resolution.height, options)
        const rightWall = Matter.Bodies.rectangle(this.resolution.width - WALL_WIDTH / 2, this.resolution.height / 2, WALL_WIDTH, this.resolution.height, options)
        leftWall.restitution = WALL_RESTITUTION
        rightWall.restitution = WALL_RESTITUTION
        Matter.World.add(this.binder.mWorld, [leftWall, rightWall]);
    }

    createGround() {
        Matter.World.add(this.binder.mWorld, [
			Matter.Bodies.rectangle(this.resolution.width / 2, this.resolution.height - GROUND_WIDTH, this.resolution.width, GROUND_WIDTH, {
                isStatic: true,
                restitution: GROUND_RESTITUION,
                friction: GROUND_FRICTION
            }),
		]);
    }

    createBoxes() {
        const options: IChamferableBodyDefinition = { isStatic: true, restitution: 0.7, friction: 0 }
        const box1 = Matter.Bodies.rectangle(130, 400, 60, 20, options)
        const box2 = Matter.Bodies.rectangle(140, 300, 60, 20, options)
        const box3 = Matter.Bodies.rectangle(430, 200, 60, 20, options)
        const box4 = Matter.Bodies.rectangle(530, 100, 60, 20, options)
        const box5 = Matter.Bodies.rectangle(72, 526, 60, 20, options)
        Matter.Body.setAngle(box5, Math.PI / 4)
        Matter.World.add(this.binder.mWorld, [box1, box2, box3, box4, box5]);
    }
}