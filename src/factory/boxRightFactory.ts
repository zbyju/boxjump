import Matter, { IChamferableBodyDefinition } from "matter-js";
import { WALL_WIDTH } from "../constants";
import { getDefaultBoxOptions } from "../default/boxDefaults";
import { Box } from "../objects/box";
import { BoxBodyWrapper } from "../objects/boxBodyWrapper";
import { Resolution } from "../types/common";
import { coordinatesFromRightCornerToCenter } from "../utils/common";
import { BoxFactory } from "./boxFactory";

export class BoxRightFactory extends BoxFactory {
    constructor(resolution: Resolution) {
        super(resolution)
    }

    createBox(x: number, y: number, width: number, height: number, group: string, options: IChamferableBodyDefinition = getDefaultBoxOptions()): BoxBodyWrapper {
        const _x = this.recalculateXWithWall(x)
        const coords = coordinatesFromRightCornerToCenter({x: _x, y}, {width, height}, this.resolution)
        return new BoxBodyWrapper(Matter.Bodies.rectangle(coords.x, coords.y, width, height, options), {width, height}, group)
    }
}