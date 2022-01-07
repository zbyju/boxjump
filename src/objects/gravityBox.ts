import Matter from "matter-js";
import * as ECS from '../../libs/pixi-ecs';
import { MatterBind } from "../../libs/pixi-matter";
import { GravityChangingBox } from "../controllers/gravityChangingBox";
import { Coordinates, Size, Vector } from "../types/common";
import { Box } from "./box";
import { BoxBodyWrapper } from "./boxBodyWrapper";

export class GravityBox extends Box {
    gravity: Vector

    constructor(bodyWrapper: BoxBodyWrapper, container: ECS.Container, group: string, gravity: Vector, color: number = 0x22172b, activeColor: number = 0x8403fc) {
        super(bodyWrapper, container, group, color, activeColor)

        this.gravity = gravity
    }

    override addComponents(playerBody: Matter.Body, binder: MatterBind): void {
        super.addComponents(playerBody, binder)
        this.container.addComponent(new GravityChangingBox(this, playerBody, binder.scene, binder.mEngine, this.gravity))
    }
}