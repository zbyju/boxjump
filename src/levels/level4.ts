import { Body } from "matter-js";
import { BoxCenterFactory } from "../factory/boxCenterFactory";
import { BoxLeftFactory } from "../factory/boxLeftFactory";
import { BoxRightFactory } from "../factory/boxRightFactory";
import { Box } from "../objects/box";
import { Resolution } from "../types/common";
import { Level } from "./level";
import { Level3 } from "./level3";

export class Level4 extends Level {
    boxes: Box[];
    name: string = "2"
    playerStart: Resolution;
    playerEnd: Resolution;

    constructor(resolution: Resolution) {
        super(resolution)
        this.playerStart = {width: 50, height: this.resolution.height - 50}
        this.playerEnd = {width: this.resolution.width / 3 - 20, height: this.resolution.height / 6}

        const bfl = new BoxLeftFactory(this.resolution)
        const bfr = new BoxRightFactory(this.resolution)
        const bfc = new BoxCenterFactory(this.resolution)
        this.boxes = [
            bfl.createBox(-2, 0, 4, 1000),
            bfr.createBox(-2, 0, 4, 1000),
            bfl.createMDBox(0, this.resolution.height - 10),
            bfl.createXSBox(150, this.resolution.height - 200),
            bfl.createXSBox(400, this.resolution.height - 280),
            bfl.createXSBox(650, this.resolution.height - 360),

            bfl.createBox(0, this.resolution.height - 400, 300, 30),
        ]
    }

    getNextLevel(): Level | null {
        return null
    }

    getPrevLevel(): Level | null {
        return new Level3(this.resolution)
    }

}
