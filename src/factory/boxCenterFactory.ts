import Matter, { IChamferableBodyDefinition } from "matter-js";
import { WALL_WIDTH } from "../constants";
import { getDefaultBoxOptions } from "../default/boxDefaults";
import { Box } from "../objects/box";
import { BoxBodyWrapper } from "../objects/boxBodyWrapper";
import { Resolution } from "../types/common";
import { coordinatesFromCenterToCorner, coordinatesFromCornerToCenter, coordinatesFromRightCornerToCenter } from "../utils/common";
import { BoxFactory } from "./boxFactory";

export class BoxCenterFactory extends BoxFactory {
    constructor(resolution: Resolution) {
        super(resolution)
    }

    createBox(x: number, y: number, width: number, height: number, options: IChamferableBodyDefinition = getDefaultBoxOptions()): BoxBodyWrapper {
        const _x = this.recalculateXWithWall(x)
        return new BoxBodyWrapper(Matter.Bodies.rectangle(_x, y, width, height, options), {width, height})
    }
}