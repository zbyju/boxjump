import * as ECS from '../../libs/pixi-ecs';
import Matter from 'matter-js';
import { JumpDirection, PlayerJump, PlayerState } from '../types/player'
import { getDefaultJump } from '../default/playerDefaults';
import { calculateJumpPower } from '../utils/player';

export class PlayerController extends ECS.Component {
	playerBody: Matter.Body
	lastPosition: Matter.Vector
	playerState: PlayerState
	playerJump: PlayerJump
	speed: number

	constructor(playerBody: Matter.Body) {
		super()
		this.playerBody = playerBody
		this.lastPosition = Object.assign({}, playerBody.position)
		this.playerState = PlayerState.STANDING

		this.speed = 0
		this.playerJump = getDefaultJump()
	}

	moveLeft() {
		Matter.Body.setVelocity(this.playerBody, { x: -2, y: 0 })
	}

	moveRight() {
		Matter.Body.setVelocity(this.playerBody, { x: 2, y: 0 })
	}

	jump() {
		const jumpPower = calculateJumpPower(this.playerJump)
		const jumpVector = Matter.Vector.normalise(Matter.Vector.create(this.playerJump.jumpDirection * 0.2, -1))
		Matter.Body.applyForce(this.playerBody, {
			x: this.playerBody.position.x,
			y: this.playerBody.position.y
		}, Matter.Vector.mult(jumpVector, jumpPower))
	}

	updateState() {
		Matter.Body.setAngle(this.playerBody, 0)
		// If started flying then player has no control
		if(Math.abs(this.lastPosition.y - this.playerBody.position.y) > 0.01) {
			this.playerState = PlayerState.FLYING
			return
		}
		//If landed reset jump
		if(this.lastPosition.y === this.playerBody.position.y){
			if(this.playerState === PlayerState.FLYING) {
				this.playerState = PlayerState.STANDING
				this.playerJump = getDefaultJump()
			}
		}
		//If space if pressed
		const keyInputComponent = this.scene.findGlobalComponentByName<ECS.KeyInputComponent>(ECS.KeyInputComponent.name)
		if(keyInputComponent.isKeyPressed(ECS.Keys.KEY_SPACE)) {
			//If player was standing (now starting to jump) then set jump
			if(this.playerState !== PlayerState.JUMPING) {
				this.playerState = PlayerState.JUMPING
				this.playerJump.jumpStart = Date.now()
			}
		} else { //If player is not holding space
			//If was jumping then jump
			if(this.playerState === PlayerState.JUMPING) {
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
				this.jump()
			}
			//Else check if move
			if(keyInputComponent.isKeyPressed(ECS.Keys.KEY_RIGHT)) {
				this.playerState = PlayerState.RUNNING_RIGHT
				this.moveRight()
			}
			if(keyInputComponent.isKeyPressed(ECS.Keys.KEY_LEFT)) {
				this.playerState = PlayerState.RUNNING_LEFT
				this.moveLeft()
			}
		}
	}

	updateLastState() {
		this.lastPosition = Object.assign({}, this.playerBody.position)
	}

	onUpdate(delta: number, absolute: number) {
		this.updateState()
		this.updateLastState()
	}
}