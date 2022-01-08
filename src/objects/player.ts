import Matter, { IChamferableBodyDefinition } from "matter-js";
import * as ECS from '../../libs/pixi-ecs';
import { CHEATING, PLAYER_HEIGHT, PLAYER_WIDTH } from "../constants";
import { CheatingController } from "../controllers/cheatingController";
import { PlayerController } from "../controllers/playerController";
import { getDefaultPlayerOptions, getDefaultPlayerSize } from "../default/playerDefaults";
import { Coordinates, Resolution, Size } from "../types/common";

export class Player {
    body: Matter.Body
    container: ECS.Container

    constructor(body: Matter.Body, container: ECS.Container, resolution: Resolution) {
        this.body = body
        this.container = container

        this.container.addComponent(new PlayerController(this.body, resolution))
        if(CHEATING) {
            this.container.addComponent(new CheatingController(this.body, resolution))
        }
        this.container.addChild(new ECS.Graphics().beginFill(0xFFFFFF).drawRect(-PLAYER_WIDTH / 2, - PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT))
    }
}