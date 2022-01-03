import * as ECS from '../libs/pixi-ecs';
import * as PIXI from 'pixi.js';
import Matter from 'matter-js';
import * as PixiMatter from '../libs/pixi-matter'
import { interactiveTarget } from 'pixi.js';
import { PlayerController } from './controllers/playerController';
import { GameManager } from './gameManager';
import { GRAVITY_X, GRAVITY_Y } from './constants';

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

		this.binder.mEngine.gravity.x = GRAVITY_X
		this.binder.mEngine.gravity.y = GRAVITY_Y
		// @ts-ignore - Resolver exists, not defined in TS - this fixes walls being "sticky"
		Matter.Resolver._restingThresh = 0.001;
	}

	onAssetsLoaded() {
		let scene: ECS.Scene = this.engine.scene;
		scene.addGlobalComponent(new ECS.KeyInputComponent())
		new GameManager(this.engine, this.binder).initializeGame()
	}
}

export default new ProjectJumper();