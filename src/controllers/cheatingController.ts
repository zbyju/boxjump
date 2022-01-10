import Matter from 'matter-js';
import * as ECS from '../../libs/pixi-ecs';
import { Level } from '../levels/level';
import { MessageEnum } from '../message';
import { Resolution } from '../types/common';
import { dateDifferenceInSeconds } from '../utils/date';
import { KeyboardController } from './keyboardController';

export class CheatingController extends ECS.Component {
	playerBody: Matter.Body
	resolution: Resolution
    lastTeleport: Date
    threshold: number = 0.5

	constructor(playerBody: Matter.Body, resolution: Resolution) {
		super()
		this.playerBody = playerBody
		this.resolution = resolution
        this.lastTeleport = new Date()
	}

	updateState(delta: number) {
        const keyController = new KeyboardController(this.scene.findGlobalComponentByName<ECS.KeyInputComponent>(ECS.KeyInputComponent.name))
        if(dateDifferenceInSeconds(this.lastTeleport, new Date()) > this.threshold) {
            if(keyController.shouldTeleportEnd()) {
                const level: Level = this.scene.getGlobalAttribute("level")
                Matter.Body.setPosition(this.playerBody, {x: level.playerEnd.width, y: level.playerEnd.height})
                this.lastTeleport = new Date()
            }
            if(keyController.shouldTeleportStart()) {
                const level: Level = this.scene.getGlobalAttribute("level")
                Matter.Body.setPosition(this.playerBody, {x: level.playerStart.width, y: level.playerStart.height})
                this.lastTeleport = new Date()
            }
            if(keyController.shouldTeleportNextLevel()) {
                this.sendMessage(MessageEnum.NEXT_LEVEL)
                const level: Level = this.scene.getGlobalAttribute("level")
                Matter.Body.setPosition(this.playerBody, {x: level.playerStart.width, y: level.playerStart.height})
                this.lastTeleport = new Date()
            }
            if(keyController.shouldTeleportPreviousLevel()) {
                this.sendMessage(MessageEnum.PREV_LEVEL)
                const level: Level = this.scene.getGlobalAttribute("level")
                Matter.Body.setPosition(this.playerBody, {x: level.playerStart.width, y: level.playerStart.height})
                this.lastTeleport = new Date()
            }
        }
	}

	onUpdate(delta: number, absolute: number) {
		this.updateState(delta)
	}
}