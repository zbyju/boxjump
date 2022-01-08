import * as PixiMatter from '../libs/pixi-matter'
import { Resolution } from './types/common'
import Matter, { IChamferableBodyDefinition } from 'matter-js';
import * as ECS from '../libs/pixi-ecs';
import { PlayerController } from './controllers/playerController';
import { CHEATING, GROUND_FRICTION, GROUND_RESTITUION, GROUND_WIDTH, PLAYER_DENSITY, PLAYER_FRICTION, PLAYER_FRICTION_AIR, PLAYER_FRICTION_STATIC, PLAYER_HEIGHT, PLAYER_INERTIA, PLAYER_RESTITUTION, PLAYER_WIDTH, WALL_FRICTION, WALL_RESTITUTION, WALL_WIDTH } from './constants';
import { Level } from './levels/level';
import { BoxController } from './controllers/boxController';
import { Box } from './objects/box';
import { CheatingController } from './controllers/cheatingController';
import { Player } from './objects/player';
import { getDefaultPlayerOptions, getDefaultPlayerSize } from './default/playerDefaults';
import { getDefaultBoxOptions } from './default/boxDefaults';

export class GameFactory {
    binder: PixiMatter.MatterBind
    resolution: Resolution

    constructor(binder: PixiMatter.MatterBind, resolution: Resolution) {
        this.binder = binder
        this.resolution = resolution
    }

    createPlayer() {
        const size = getDefaultPlayerSize()
        const options = getDefaultPlayerOptions()
        const playerBody = Matter.Bodies.rectangle(
            this.resolution.width / 2, this.resolution.height - GROUND_WIDTH - 2,
            size.width, size.height, options
        )
		const playerContainer: ECS.Container = this.binder.addBody(playerBody)
        const player = new Player(playerBody, playerContainer, this.resolution)
		
        return player
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

    createBoxes(level: Level, player: Matter.Body): Box[] {
        const boxes = level.getBoxes()
        return boxes.map(b => {
            const boxContainer: ECS.Container = this.binder.addBody(b.body)
            const box: Box = b.createBox(boxContainer)
            box.addComponents(player, this.binder)
            return box
        })
    }
}