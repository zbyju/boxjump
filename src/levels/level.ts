import Matter from "matter-js"
import { Resolution } from "../types/common"

export abstract class Level {
    abstract readonly name: string
    abstract readonly playerStart: Resolution
    abstract readonly playerEnd: Resolution
    abstract readonly boxes: Matter.Body[]
    readonly resolution: Resolution

    constructor(resolution: Resolution) {
        this.resolution = resolution
    }

    abstract getBoxes(): Array<Matter.Body>
}