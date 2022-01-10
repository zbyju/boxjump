import Matter from "matter-js";
import * as ECS from '../../libs/pixi-ecs';
import { Size } from "../types/common";
import { Box } from "./box";
import { BoxBodyWrapper } from "./boxBodyWrapper";
import { FinishBox } from "./finishBox";

export class FinishBoxBodyWrapper extends BoxBodyWrapper {
    constructor(body: Matter.Body, size: Size, group: string) {
        super(body, size, group)
    }

    override createBox(container: ECS.Container, color?: number, activeColor?: number): Box {
        return new FinishBox(this, container, this.group, color, activeColor)
    }
}