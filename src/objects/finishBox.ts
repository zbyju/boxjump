import Matter from "matter-js";
import * as ECS from '../../libs/pixi-ecs';
import { MatterBind } from "../../libs/pixi-matter";
import { FinishBoxController } from "../controllers/finishBoxController";
import { Box } from "./box";
import { BoxBodyWrapper } from "./boxBodyWrapper";

export class FinishBox extends Box {
    constructor(bodyWrapper: BoxBodyWrapper, container: ECS.Container, group: string, color: number = 0xd4f542, activeColor: number = 0x8403fc) {
        super(bodyWrapper, container, group, color, activeColor)
    }

    override addComponents(playerBody: Matter.Body, binder: MatterBind): void {
        this.container.addComponent(new FinishBoxController(this, playerBody, binder.scene, binder.mEngine, this.gravity))
    }
}