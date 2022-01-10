import Matter, { IChamferableBodyDefinition } from "matter-js";
import { getDefaultBoxOptions } from "../default/boxDefaults";
import { BoxBodyWrapper } from "../objects/boxBodyWrapper";
import { Resolution } from "../types/common";
import { coordinatesFromCornerToCenter } from "../utils/common";
import { BoxFactory } from "./boxFactory";

export class BoxLeftFactory extends BoxFactory {
    constructor(resolution: Resolution) {
        super(resolution)
    }

    createBox(x: number, y: number, width: number, height: number, group: string, options: IChamferableBodyDefinition = getDefaultBoxOptions()): BoxBodyWrapper {
        const _x = this.recalculateXWithWall(x)
        const coords = coordinatesFromCornerToCenter({x: _x, y}, {width, height})
        return new BoxBodyWrapper(Matter.Bodies.rectangle(coords.x, coords.y, width, height, options), {width, height}, group)
    }
}