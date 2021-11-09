import * as ECS from '../libs/pixi-ecs';
import * as PIXI from 'pixi.js';
import Matter, { Body } from 'matter-js';
import * as PixiMatter from '../libs/pixi-matter'
import { interactiveTarget } from 'pixi.js';


class PlayerController extends ECS.Component {
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

interface Resolution {
	width: number,
	height: number,
}

class ProjectJumper {
	engine: ECS.Engine;
	binder: PixiMatter.MatterBind

	constructor() {
		this.engine = new ECS.Engine();
		const canvas = (document.getElementById('gameCanvas') as HTMLCanvasElement);
		this.binder = new PixiMatter.MatterBind();

		this.engine.init(canvas, {
			resizeToScreen: true,
			backgroundColor: 0x000000,
			width: canvas.width,
			height: canvas.height,
		});

		this.engine.app.loader
			.reset()
			.add('ghost', 'assets/ghost.png')
			.load(() => this.onAssetsLoaded());

		this.binder.init(this.engine.scene, {
			mouseControl: false,
			renderConstraints: true,
			renderAngles: false
		})
	}

	onAssetsLoaded() {
		let scene: ECS.Scene = this.engine.scene;
		scene.addGlobalComponent(new ECS.KeyInputComponent())

		this.initBoundry()
		this.initPlayer();
	}

	initBoundry() {
		const boundryThickness = 25
		Matter.World.add(this.binder.mWorld, [
			Matter.Bodies.rectangle(boundryThickness / 2, this.engine.app.screen.height / 2, boundryThickness, this.engine.app.screen.height, { isStatic: true }),
		]);
		Matter.World.add(this.binder.mWorld, [
			Matter.Bodies.rectangle(this.engine.app.screen.width - boundryThickness / 2, this.engine.app.screen.height / 2, boundryThickness, this.engine.app.screen.height, { isStatic: true }),
		]);
		Matter.World.add(this.binder.mWorld, [
			Matter.Bodies.rectangle(this.engine.app.screen.width / 2, this.engine.app.screen.height - boundryThickness / 2, this.engine.app.screen.width, boundryThickness, { isStatic: true }),
		]);
	}

	initPlayer() {
		const playerBody = Matter.Bodies.rectangle(this.engine.app.screen.width / 2, this.engine.app.screen.height - 60, 20, 35)
		const playerContainer = this.binder.addBody(playerBody)

		playerContainer.addComponent(new PlayerController(playerBody))
	}

	initLevel() {

	}
}

export default new ProjectJumper();