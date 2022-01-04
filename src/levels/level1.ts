import { Body } from "matter-js";
import { BoxFactory } from "../factory/boxFactory";
import { Resolution } from "../types/common";
import { Level } from "./level";

export class Level1 extends Level {
    name: string = "1"
    playerStart: Resolution;
    playerEnd: Resolution;

    constructor(resolution: Resolution) {
        super(resolution)
        this.playerStart = {width: this.resolution.width / 2, height: this.resolution.height - 10}
        this.playerEnd = {width: this.resolution.width / 8, height: this.resolution.height / 7.5 - 10}

        const bf = new BoxFactory(this.resolution) 
               
        this.boxes =[
            bf.createBox(this.resolution.width / 2, this.resolution.height - 2, this.resolution.width, 2),
            bf.createBox(this.resolution.width - 125, this.resolution.height - 75, 250, 150),
            bf.createBox(125, this.resolution.height - 75, 250, 150),

            bf.createMDBox(this.resolution.width / 3.2, this.resolution.height / 1.6),
            bf.createMDBox(60, this.resolution.height / 2.4),
            bf.createMDBox(this.resolution.width / 2, this.resolution.height / 3),
            bf.createSMBox(this.resolution.width / 8, this.resolution.height / 7.5),
            bf.createSMBox(this.resolution.width / 8 * 7, this.resolution.height / 7.5),
        ]
    }

    getBoxes(): Body[] {
        return this.boxes
    }

}