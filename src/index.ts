import Matter from 'matter-js';
import * as ECS from '../libs/pixi-ecs';
import * as PixiMatter from '../libs/pixi-matter';
import { GRAVITY_X, GRAVITY_Y } from './constants';
import { GameManager } from './gameManager';

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

		this.binder.init(this.engine.scene, {
			mouseControl: false,
			renderConstraints: false,
			renderAngles: false,
		})

		this.binder.mEngine.gravity.x = GRAVITY_X
		this.binder.mEngine.gravity.y = GRAVITY_Y
		// @ts-ignore - Resolver exists, not defined in TS - this fixes walls being "sticky"
		Matter.Resolver._restingThresh = 0.001;


		this.onAssetsLoaded()
	}

	onAssetsLoaded() {
		let scene: ECS.Scene = this.engine.scene;
		let gm = new GameManager(this.engine, this.binder)
		scene.addGlobalComponent(new ECS.KeyInputComponent())
		scene.addGlobalComponent(gm)
		gm.playIntro()
	}
}

export default new ProjectJumper();