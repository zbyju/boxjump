import { Body } from "matter-js";
import { BoxFactory } from "../factory/boxFactory";
import { Resolution } from "../types/common";
import { Level } from "./level";

export class Level2 extends Level {
    name: string = "2"
    playerStart: Resolution;
    playerEnd: Resolution;

    constructor(resolution: Resolution) {
        super(resolution)
        this.playerStart = {width: this.resolution.width / 2, height: this.resolution.height - 10}
        this.playerEnd = {width: this.resolution.width / 8, height: this.resolution.height / 7.5 - 10}

        const bf = new BoxFactory(this.resolution)
        this.boxes = [
            bf.createBox(this.resolution.width - 125, this.resolution.height - 75, 250, 150),
            bf.createBox(125, this.resolution.height - 75, 250, 150),
        ]
    }

    getBoxes(): Body[] {
        return this.boxes
    }

}
