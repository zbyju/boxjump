import { Body } from "matter-js";
import { BoxCenterFactory } from "../factory/boxCenterFactory";
import { BoxLeftFactory } from "../factory/boxLeftFactory";
import { BoxRightFactory } from "../factory/boxRightFactory";
import { Box } from "../objects/box";
import { BoxBodyWrapper } from "../objects/boxBodyWrapper";
import { Resolution } from "../types/common";
import { Level } from "./level";
import { Level1 } from "./level1";
import { Level3 } from "./level3";

export class Level2 extends Level {
    boxes: BoxBodyWrapper[];
    name: string = "2"
    playerStart: Resolution;
    playerEnd: Resolution;

    constructor(resolution: Resolution) {
        super(resolution)
        this.playerStart = {width: this.resolution.width / 2, height: this.resolution.height - 25}
        this.playerEnd = {width: this.resolution.width / 8, height: 30}

        const bfl = new BoxLeftFactory(this.resolution)
        const bfr = new BoxRightFactory(this.resolution)
        const bfc = new BoxCenterFactory(this.resolution)
        this.boxes = [
            bfc.createBox(this.resolution.width / 2, this.resolution.height - 10, this.resolution.width / 8 * 6, 20, "floor"),
            bfc.createBox(this.resolution.width / 8, (this.resolution.height - 100) / 2, 20, this.resolution.height - 200, "left"),
            bfc.createBox(this.resolution.width / 8 * 7, (this.resolution.height - 100) / 2, 20, this.resolution.height - 200, "right"),

            bfc.createBox(this.resolution.width / 2, this.resolution.height - 200, 20, 150, "1"),
            bfl.createXSBox(this.resolution.width / 2 + 13, this.resolution.height - 230, "1"),
            bfr.createXSBox(this.resolution.width / 2 + 13, this.resolution.height - 230, "1"),

            bfc.createBox(this.resolution.width / 2, this.resolution.height - 450, 20, 150, "2"),
            bfl.createXSBox(this.resolution.width / 2 + 13, this.resolution.height - 480, "2"),
            bfr.createXSBox(this.resolution.width / 2 + 13, this.resolution.height - 480, "2"),


            bfl.createXSBox(this.resolution.width / 8 + 10, this.resolution.height - 150, "left"),
            bfr.createXSBox(this.resolution.width / 8 + 10, this.resolution.height - 300, "right"),
        ]
    }

    getNextLevel(): Level | null {
        return new Level3(this.resolution)
    }

    getPrevLevel(): Level | null {
        return new Level1(this.resolution)
    }

}
