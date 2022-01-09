import { GameFactory } from "./factory"
import * as ECS from '../libs/pixi-ecs';
import * as PixiMatter from '../libs/pixi-matter'
import { getResolutionFromEngine } from "./utils/common";
import { Level1 } from "./levels/level1";
import Matter from "matter-js";
import { Level } from "./levels/level";
import { Level2 } from "./levels/level2";
import { Box } from "./objects/box";
import { GRAVITY_X, GRAVITY_Y } from "./constants";
import { Player } from "./objects/player";
import pixiSound from "pixi-sound";
import { IntroController } from "./controllers/introController";
import { OutroStages } from "./types/scenes";
import { OutroController } from "./controllers/outroController";

export class GameManager extends ECS.Component {
    engine: ECS.Engine;
	binder: PixiMatter.MatterBind
    factory: GameFactory
    player: Player
    walls: Array<Matter.Body>
    boxes: Array<Box>
    gameStart: Date

    constructor(engine: ECS.Engine, binder: PixiMatter.MatterBind) {
        super()
        this.engine = engine;
        this.binder = binder;
        this.factory = new GameFactory(this.binder, getResolutionFromEngine(this.engine))
        this.boxes = []
    }

    onInit(): void {
        this.subscribe("nextlevel", "prevlevel", "finishgame", "introdone", "outrofadeout")
    }

    onMessage(msg: ECS.Message) {
        if(msg.action == "nextlevel") {
            const level: Level = this.engine.scene.getGlobalAttribute("level")
            const nextLevel = level.getNextLevel()
            if(nextLevel == null) return
            this.removeAllBoxes()
            this.engine.scene.assignGlobalAttribute("level", nextLevel)
    
            this.boxes = this.initBoxes()
            this.resetWorldParams()

            this.sendMessage("changelevelnext")
        } else if(msg.action == "prevlevel") {
            const level: Level = this.engine.scene.getGlobalAttribute("level")
            const prevLevel = level.getPrevLevel()
            if(prevLevel == null) return
            this.removeAllBoxes()
            this.engine.scene.assignGlobalAttribute("level", prevLevel)
    
            this.boxes = this.initBoxes()
            this.resetWorldParams()

            this.sendMessage("changelevelprev")
        } else if(msg.action == "finishgame") {
            this.finishGame()
        } else if(msg.action == "introdone") {
            this.initializeGame()
        } else if(msg.action == "outrofadeout") {
            this.initializeGame()
        }
    }

    finishGame() {
        const resolution = getResolutionFromEngine(this.engine)
        this.binder.scene.stage.addComponentAndRun(new OutroController(this.binder.scene, resolution, this.gameStart))
    }

    playIntro() {
        const resolution = getResolutionFromEngine(this.engine)
        this.binder.scene.stage.addComponentAndRun(new IntroController(this.binder.scene, resolution))
    }

    removeAllBoxes() {
        if(!this.boxes) return 
        this.boxes.forEach(b => {
            Matter.World.remove(this.binder.mWorld, b.body)
            
            const pixi = this.binder.findSyncObjectForBody(b.body)
            if(pixi) pixi.destroy()
        })
        this.boxes = []
    }

    removePlayer() {
        if(!this.player) return
        Matter.World.remove(this.binder.mWorld, this.player.body)
        this.player.container.destroy()
    }

    removeWalls() {
        if(!this.walls) return
        this.walls.forEach(w => {
            Matter.World.remove(this.binder.mWorld, w)
        })
    }

    initializeGame() {
        this.removeAllBoxes()
        this.removePlayer()
        this.removeWalls()

        this.walls = this.initBoundry()
        this.player = this.initPlayer()
        this.engine.scene.assignGlobalAttribute("player", this.player)
        
        const level1 = new Level1(getResolutionFromEngine(this.engine))
        this.engine.scene.assignGlobalAttribute("level", level1)

        this.boxes = this.initBoxes()

        this.resetWorldParams()

        this.gameStart = new Date()
    }

    initBoundry() {
        return this.factory.createWalls()
    }

    initPlayer() {
        return this.factory.createPlayer()
    }

    initBoxes() {
        return this.factory.createBoxes(this.engine.scene.getGlobalAttribute("level"), this.engine.scene.getGlobalAttribute("player").body)
    }

    resetWorldParams() {
        this.binder.mEngine.gravity.x = GRAVITY_X
        this.binder.mEngine.gravity.y = GRAVITY_Y
    }
}