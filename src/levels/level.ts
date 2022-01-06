import Matter from "matter-js"
import { Box } from "../objects/box"
import { BoxBodyWrapper } from "../objects/boxBodyWrapper"
import { Resolution } from "../types/common"

export abstract class Level {
    abstract readonly name: string
    abstract readonly playerStart: Resolution
    abstract readonly playerEnd: Resolution
    abstract readonly boxes: BoxBodyWrapper[]
    readonly resolution: Resolution

    constructor(resolution: Resolution) {
        this.resolution = resolution
    }

    getBoxes(): Array<BoxBodyWrapper> {
        return this.boxes
    }

    abstract getNextLevel(): Level | null
    abstract getPrevLevel(): Level | null
}