import Matter from "matter-js"
import { Box } from "../objects/box"
import { Resolution } from "../types/common"

export abstract class Level {
    abstract readonly name: string
    abstract readonly playerStart: Resolution
    abstract readonly playerEnd: Resolution
    abstract readonly boxes: Box[]
    readonly resolution: Resolution

    constructor(resolution: Resolution) {
        this.resolution = resolution
    }

    getBoxes(): Array<Box> {
        return this.boxes
    }

    abstract getNextLevel(): Level | null
    abstract getPrevLevel(): Level | null
}