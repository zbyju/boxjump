import * as ECS from '../libs/pixi-ecs';
import * as PIXI from 'pixi.js';

class ProjectJumper {
	engine: ECS.Engine;

	constructor() {
		this.engine = new ECS.Engine();
		let canvas = (document.getElementById('gameCanvas') as HTMLCanvasElement);

		this.engine.init(canvas, {
			resizeToScreen: true,
		});

		this.engine.app.loader
			.reset()
			.add('ghost', 'assets/ghost.png')
			.load(() => this.onAssetsLoaded());
	}

	onAssetsLoaded() {
		let scene = this.engine.scene;

		Array(100).fill(0, 0, 100).forEach(() => {
			new ECS.Builder(scene)
				.localPos(Math.random() * this.engine.app.screen.width, Math.random() * this.engine.app.screen.height)
				.anchor(0.5)
				.scale(0.15)
				.withParent(scene.stage)
				.withComponent(new ECS.FuncComponent('rotation').doOnUpdate((cmp, delta, absolute) => cmp.owner.rotation += 0.001 * delta))
				.asSprite(PIXI.Texture.from('ghost'))
				.build();
		});

		new ECS.Builder(scene)
			.localPos(this.engine.app.screen.width / 2, this.engine.app.screen.height / 2)
			.anchor(0.5)
			.withParent(scene.stage)
			.withComponent(new ECS.FuncComponent('rotation').doOnUpdate((cmp, delta, absolute) => cmp.owner.rotation += 0.001 * delta))
			.asText('Hello World', new PIXI.TextStyle({ fill: '#FF0000', fontSize: 80, fontFamily: 'Courier New' }))
			.build();
	}
}

export default new ProjectJumper();