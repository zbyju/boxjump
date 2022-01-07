import Matter from "matter-js";
import { MatterBody } from "../../libs/pixi-matter";
import { Size } from "../types/common";
import * as ECS from '../../libs/pixi-ecs';
import { Box } from "./box";

export class BoxBodyWrapper {
    body: Matter.Body
    size: Size
    group: string

    constructor(body: Matter.Body, size: Size, group: string) {
        this.body = body
        this.size = size
        this.group = group
    }

    createBox(container: ECS.Container, color?: number, activeColor?: number): Box {
        return new Box(this, container, this.group, color, activeColor)
    }
}