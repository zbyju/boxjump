import Matter, { IChamferableBodyDefinition } from "matter-js";
import { WALL_WIDTH } from "../constants";
import { getDefaultBoxOptions } from "../default/boxDefaults";
import { Box } from "../objects/box";
import { Resolution } from "../types/common";
import { coordinatesFromCenterToCorner, coordinatesFromCornerToCenter, coordinatesFromRightCornerToCenter } from "../utils/common";
import { BoxFactory } from "./boxFactory";

export class BoxCenterFactory extends BoxFactory {
    constructor(resolution: Resolution) {
        super(resolution)
    }

    createBox(x: number, y: number, width: number, height: number, options: IChamferableBodyDefinition = getDefaultBoxOptions()): Box {
        const _x = this.recalculateXWithWall(x)
        return new Box(Matter.Bodies.rectangle(_x, y, width, height, options), {width, height})
    }

    createBoxAngled(x: number, y: number, width: number, height: number, options: Matter.IChamferableBodyDefinition = getDefaultBoxOptions()): Box {
        const _x = this.recalculateXWithWall(x)
        const body = Matter.Bodies.rectangle(_x, y, width, height, options)
        Matter.Body.setAngle(body, Math.PI / 4)
        return new Box(body, {width, height})
    }
}