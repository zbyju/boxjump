import { Body } from "matter-js";
import { BoxCenterFactory } from "../factory/boxCenterFactory";
import { BoxLeftFactory } from "../factory/boxLeftFactory";
import { BoxRightFactory } from "../factory/boxRightFactory";
import { Box } from "../objects/box";
import { BoxBodyWrapper } from "../objects/boxBodyWrapper";
import { Resolution } from "../types/common";
import { Level } from "./level";
import { Level3 } from "./level3";

export class Level4 extends Level {
    boxes: BoxBodyWrapper[];
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
            bfl.createBox(-2, 0, 4, 1000, "leftb"),
            bfr.createBox(-2, 0, 4, 1000, "rightb"),
            bfl.createMDBox(0, this.resolution.height - 10, "1"),
            bfl.createXSBox(150, this.resolution.height - 200, "2"),
            bfl.createXSBox(400, this.resolution.height - 280, "3"),
            bfl.createXSBox(650, this.resolution.height - 360, "4"),

            bfl.createBox(0, this.resolution.height - 400, 300, 30, "5"),
            bfl.createBox(300, this.resolution.height - 400, 30, 100, "5"),
        ]
    }

    getNextLevel(): Level | null {
        return null
    }

    getPrevLevel(): Level | null {
        return new Level3(this.resolution)
    }

}
