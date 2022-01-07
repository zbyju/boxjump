import Matter from "matter-js";
import { MatterBody } from "../../libs/pixi-matter";
import { Size, Vector } from "../types/common";
import { Box } from "./box";
import { BoxBodyWrapper } from "./boxBodyWrapper";
import { GravityBox } from "./gravityBox";
import * as ECS from '../../libs/pixi-ecs';

export class GravityBoxBodyWrapper extends BoxBodyWrapper {
    gravity: Vector

    constructor(body: Matter.Body, size: Size, group: string, gravity: Vector) {
        super(body, size, group)

        this.gravity = gravity
    }

    override createBox(container: ECS.Container, color?: number, activeColor?: number): Box {
        return new GravityBox(this, container, this.group, this.gravity, color, activeColor)
    }
}