import Matter, { IChamferableBodyDefinition } from "matter-js";
import { WALL_WIDTH } from "../constants";
import { getDefaultBoxOptions } from "../default/boxDefaults";
import { Resolution } from "../types/common";

export class BoxFactory {
    resolution: Resolution

    constructor(resolution: Resolution) {
        this.resolution = resolution
    }

    recalculateXWithWall(x: number) {
        if(x > this.resolution.width / 2) return x - WALL_WIDTH * 2
        else if(x < this.resolution.width / 2) return x + WALL_WIDTH * 2
        else return x
    }

    createBox(x: number, y: number, width: number, height: number, options: IChamferableBodyDefinition = getDefaultBoxOptions()): Matter.Body {
        const _x = this.recalculateXWithWall(x)
        return Matter.Bodies.rectangle(_x, y, width, height, options)
    }

    createSMBox(x: number, y: number): Matter.Body {
        return this.createBox(x, y, 80, 30)
    }
    createMDBox(x: number, y: number): Matter.Body {
        return this.createBox(x, y, 120, 30)
    }
}