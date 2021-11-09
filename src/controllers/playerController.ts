import * as ECS from '../../libs/pixi-ecs';
import Matter from 'matter-js';

export class PlayerController extends ECS.Component {
	playerBody: Matter.Body

	constructor(playerBody: Matter.Body) {
		super()
		this.playerBody = playerBody
	}

	moveLeft() {
		Matter.Body.setPosition(this.playerBody, {
			x: this.playerBody.position.x - 5,
			y: this.playerBody.position.y
		})
	}

	moveRight() {
		Matter.Body.setPosition(this.playerBody, {
			x: this.playerBody.position.x + 5,
			y: this.playerBody.position.y
		})
	}

	onUpdate(delta: number, absolute: number) {
		const keyInputComponent = this.scene.findGlobalComponentByName<ECS.KeyInputComponent>(ECS.KeyInputComponent.name)

		if(keyInputComponent.isKeyPressed(ECS.Keys.KEY_LEFT)) {
			this.moveLeft()
		}
		if(keyInputComponent.isKeyPressed(ECS.Keys.KEY_RIGHT)) {
			this.moveRight()
		}
	}
}