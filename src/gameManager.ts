import { GameFactory } from "./factory"
import * as ECS from '../libs/pixi-ecs';
import * as PixiMatter from '../libs/pixi-matter'
import { getResolutionFromEngine } from "./utils/common";

export class GameManager {
    engine: ECS.Engine;
	binder: PixiMatter.MatterBind
    factory: GameFactory

    constructor(engine: ECS.Engine, binder: PixiMatter.MatterBind) {
        this.engine = engine;
        this.binder = binder;
        this.factory = new GameFactory(this.binder, getResolutionFromEngine(this.engine))
    }

    initializeGame() {
        this.initBoundry()
        this.initPlayer()
    }

    initBoundry() {
        this.factory.createBoundry()
    }

    initPlayer() {
        this.factory.createPlayer(20, 35)
    }
}