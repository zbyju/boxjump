import Matter, { IChamferableBodyDefinition } from "matter-js";
import { WALL_WIDTH } from "../constants";
import { getDefaultBoxOptions } from "../default/boxDefaults";
import { Box } from "../objects/box";
import { BoxBodyWrapper } from "../objects/boxBodyWrapper";
import { Resolution, Size } from "../types/common";

export abstract class BoxFactory {
    resolution: Resolution

    xsSize: Size = { width: 40, height: 15 }
    smSize: Size = { width: 80, height: 30 }
    mdSize: Size = { width: 120, height: 30 }

    constructor(resolution: Resolution) {
        this.resolution = resolution
    }

    recalculateXWithWall(x: number) {
        if(x > this.resolution.width / 2) return x - WALL_WIDTH * 2
        else if(x < this.resolution.width / 2) return x + WALL_WIDTH * 2
        else return x
    }

    abstract createBox(x: number, y: number, width: number, height: number, options?: IChamferableBodyDefinition): BoxBodyWrapper

    createXSBox(x: number, y: number): BoxBodyWrapper {
        return this.createBox(x, y, this.xsSize.width, this.xsSize.height)
    }
    createSMBox(x: number, y: number): BoxBodyWrapper {
        return this.createBox(x, y, this.smSize.width, this.smSize.height)
    }
    createMDBox(x: number, y: number): BoxBodyWrapper {
        return this.createBox(x, y, this.mdSize.width, this.mdSize.height)
    }
}