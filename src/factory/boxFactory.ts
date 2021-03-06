import { IChamferableBodyDefinition } from "matter-js";
import { WALL_WIDTH } from "../constants";
import { BoxBodyWrapper } from "../objects/boxBodyWrapper";
import { FinishBoxBodyWrapper } from "../objects/finishBoxBodyWrapper";
import { GravityBoxBodyWrapper } from "../objects/gravityBoxBodyWrapper";
import { Resolution, Size, Vector } from "../types/common";

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

    abstract createBox(x: number, y: number, width: number, height: number, group: string, options?: IChamferableBodyDefinition): BoxBodyWrapper


    createGravityBox(x: number, y: number, width: number, height: number, group: string, gravity: Vector, options?: IChamferableBodyDefinition): BoxBodyWrapper {
        const box = this.createBox(x, y, width, height, group, options)
        return new GravityBoxBodyWrapper(box.body, box.size, box.group, gravity)
    }

    createFinishBox(x: number, y: number, width: number, height: number, group: string, options?: IChamferableBodyDefinition): BoxBodyWrapper {
        const box = this.createBox(x, y, width, height, group, options)
        return new FinishBoxBodyWrapper(box.body, box.size, box.group)
    }

    createXSBox(x: number, y: number, group: string): BoxBodyWrapper {
        return this.createBox(x, y, this.xsSize.width, this.xsSize.height, group)
    }
    createSMBox(x: number, y: number, group: string): BoxBodyWrapper {
        return this.createBox(x, y, this.smSize.width, this.smSize.height, group)
    }
    createMDBox(x: number, y: number, group: string): BoxBodyWrapper {
        return this.createBox(x, y, this.mdSize.width, this.mdSize.height, group)
    }


}