import { Body } from "matter-js";
import { BoxCenterFactory } from "../factory/boxCenterFactory";
import { BoxLeftFactory } from "../factory/boxLeftFactory";
import { BoxRightFactory } from "../factory/boxRightFactory";
import { Box } from "../objects/box";
import { Resolution } from "../types/common";
import { Level } from "./level";
import { Level2 } from "./level2";

export class Level3 extends Level {
    boxes: Box[];
    name: string = "2"
    playerStart: Resolution;
    playerEnd: Resolution;

    constructor(resolution: Resolution) {
        super(resolution)
        this.playerStart = {width: this.resolution.width / 2, height: this.resolution.height - 25}
        this.playerEnd = {width: this.resolution.width / 8, height: this.resolution.height / 7.5 - 10}

        const bfl = new BoxLeftFactory(this.resolution)
        const bfr = new BoxRightFactory(this.resolution)
        const bfc = new BoxCenterFactory(this.resolution)
        this.boxes = [
            bfc.createBox(this.resolution.width / 2, this.resolution.height - 10, this.resolution.width / 8 * 6, 20),

            bfl.createSMBox(200, this.resolution.height - 250),
            bfr.createSMBox(200, this.resolution.height - 250),
            bfl.createSMBox(200, this.resolution.height - 450),
            bfr.createSMBox(200, this.resolution.height - 650),
        ]
    }

    getNextLevel(): Level | null {
        return null
    }

    getPrevLevel(): Level | null {
        return new Level2(this.resolution)
    }

}
