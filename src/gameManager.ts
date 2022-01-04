import { GameFactory } from "./factory"
import * as ECS from '../libs/pixi-ecs';
import * as PixiMatter from '../libs/pixi-matter'
import { getResolutionFromEngine } from "./utils/common";
import { Level1 } from "./levels/level1";
import Matter from "matter-js";
import { Level } from "./levels/level";
import { Level2 } from "./levels/level2";

export class GameManager extends ECS.Component {
    engine: ECS.Engine;
	binder: PixiMatter.MatterBind
    factory: GameFactory
    player: Matter.Body
    walls: Array<Matter.Body>
    boxes: Array<Matter.Body>

    constructor(engine: ECS.Engine, binder: PixiMatter.MatterBind) {
        super()
        this.engine = engine;
        this.binder = binder;
        this.factory = new GameFactory(this.binder, getResolutionFromEngine(this.engine))
    }

    onInit(): void {
        this.subscribe("nextlevel", "prevlevel")
    }

    onMessage(msg: ECS.Message) {
        if(msg.action == "nextlevel") {
            this.boxes.forEach(b => {
                Matter.World.remove(this.binder.mWorld, b)
                
                const pixi = this.binder.findSyncObjectForBody(b)
                if(pixi) pixi.destroy()
            })
            const level2: Level = new Level2(getResolutionFromEngine(this.engine))
            this.engine.scene.assignGlobalAttribute("level", level2)
    
            this.boxes = this.initBoxes()
        } else if(msg.action == "prevlevel") {
            this.boxes.forEach(b => {
                Matter.World.remove(this.binder.mWorld, b)
                
                const pixi = this.binder.findSyncObjectForBody(b)
                if(pixi) pixi.destroy()
            })
            const level1: Level = new Level1(getResolutionFromEngine(this.engine))
            this.engine.scene.assignGlobalAttribute("level", level1)
    
            this.boxes = this.initBoxes()
        }
    }

    initializeGame() {
        this.walls = this.initBoundry()
        this.player = this.initPlayer()
        
        const level1 = new Level1(getResolutionFromEngine(this.engine))
        this.engine.scene.assignGlobalAttribute("level", level1)

        this.boxes = this.initBoxes()
        
    }

    initBoundry() {
        return this.factory.createWalls()
    }

    initPlayer() {
        return this.factory.createPlayer()
    }

    initBoxes() {
        return this.factory.createBoxes(this.engine.scene.getGlobalAttribute("level"))
    }
}