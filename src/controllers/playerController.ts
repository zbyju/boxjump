import * as ECS from '../../libs/pixi-ecs';
import Matter from 'matter-js';
import { JumpDirection, PlayerJump, PlayerState } from '../types/player'
import { getDefaultJump } from '../default/playerDefaults';
import { calculateJumpPower } from '../utils/player';
import { JUMP_POWER, JUMP_X, JUMP_Y, MOVE_SPEED, SPEED } from '../constants';
import PositionQueue from '../utils/positionQueue';
import { Resolution } from '../types/common';
import { Level } from '../levels/level';

export class PlayerController extends ECS.Component {
	playerBody: Matter.Body
	playerState: PlayerState
	playerJump: PlayerJump
	speed: number
	positionQueue: PositionQueue
	resolution: Resolution

	constructor(playerBody: Matter.Body, resolution: Resolution) {
		super()
		this.playerBody = playerBody
		this.positionQueue = new PositionQueue(3)
		this.playerState = PlayerState.STANDING
		this.resolution = resolution

		this.speed = 0
		this.playerJump = getDefaultJump()
	}

	onInit(): void {
		this.subscribe("changelevelnext", "changelevelprev")
	}

	calcMoveSpeed(delta: number) {
		return MOVE_SPEED * delta * SPEED
	}
	moveLeft(delta: number) {
		Matter.Body.applyForce(this.playerBody, this.playerBody.position, { x: -this.calcMoveSpeed(delta), y: 0})
	}

	moveRight(delta: number) {
		Matter.Body.applyForce(this.playerBody, this.playerBody.position, { x: this.calcMoveSpeed(delta), y: 0})
	}

	jump(delta: number) {
		const jumpPower = calculateJumpPower(this.playerJump)
		const jumpVector = Matter.Vector.normalise(Matter.Vector.create(this.playerJump.jumpDirection * JUMP_X, -1 * JUMP_Y))
		Matter.Body.applyForce(this.playerBody, {
			x: this.playerBody.position.x,
			y: this.playerBody.position.y
		}, Matter.Vector.mult(jumpVector, jumpPower * JUMP_POWER * delta * SPEED))
	}

	updateState(delta: number) {
		if(this.positionQueue.getMaxDifferenceY() > 0.01) {
			this.playerState = PlayerState.FLYING
			return
		} else if(this.playerState === PlayerState.FLYING) {
			Matter.Body.setAngle(this.playerBody, 0)
			this.playerState = PlayerState.STANDING
		}
		
		if(this.positionQueue.getMaxDifferenceY() <= 0.1) {
			const keyInputComponent = this.scene.findGlobalComponentByName<ECS.KeyInputComponent>(ECS.KeyInputComponent.name)
			if(this.playerState !== PlayerState.JUMPING) {
				let isAction = false
				if(keyInputComponent.isKeyPressed(ECS.Keys.KEY_SPACE)) {
					this.playerJump = getDefaultJump()
					this.playerState = PlayerState.JUMPING
					this.playerJump.jumpStart = Date.now()
					isAction = true
				}

				if(this.playerState !== PlayerState.JUMPING) {
					if(keyInputComponent.isKeyPressed(ECS.Keys.KEY_RIGHT)) {
						this.playerState = PlayerState.RUNNING_RIGHT
						this.moveRight(delta)
						isAction = true
					}
					if(keyInputComponent.isKeyPressed(ECS.Keys.KEY_LEFT)) {
						this.playerState = PlayerState.RUNNING_LEFT
						this.moveLeft(delta)
						isAction = true
					}
					if(!isAction) {
						this.playerState = PlayerState.STANDING
					}
				}
			}
			if(this.playerState === PlayerState.JUMPING && !keyInputComponent.isKeyPressed(ECS.Keys.KEY_SPACE)) {
				if(keyInputComponent.isKeyPressed(ECS.Keys.KEY_RIGHT) &&
				   !keyInputComponent.isKeyPressed(ECS.Keys.KEY_LEFT)) {
					this.playerJump.jumpDirection = JumpDirection.RIGHT
				}
				else if(keyInputComponent.isKeyPressed(ECS.Keys.KEY_LEFT) &&
						!keyInputComponent.isKeyPressed(ECS.Keys.KEY_RIGHT)) {
					this.playerJump.jumpDirection = JumpDirection.LEFT
				} else {
					this.playerJump.jumpDirection= JumpDirection.UP
				}
				this.playerJump.jumpEnd = Date.now()
				this.jump(delta)
			}
		}
	}

	onMessage(msg: ECS.Message) {
		if(msg.action === "changelevelnext") {
			Matter.Body.setPosition(this.playerBody, {
				x: this.playerBody.position.x,
				y: this.playerBody.position.y + this.resolution.height
			})
		} else if(msg.action === "changelevelprev") {
			Matter.Body.setPosition(this.playerBody, {
				x: this.playerBody.position.x,
				y: this.playerBody.position.y - this.resolution.height
			})
		}
	}

	updateLevel() {
		//Update to next level
		if(this.playerBody.position.y < 0) {
			this.sendMessage("nextlevel")
		}
		if(this.playerBody.bounds.min.y > this.resolution.height) {
			this.sendMessage("prevlevel")
		}
	}

	updatePositionQueue() {
		this.positionQueue.addPosition(this.playerBody.position)
	}

	onUpdate(delta: number, absolute: number) {
		this.updatePositionQueue()
		this.updateState(delta)
		this.updateLevel()
	}
}