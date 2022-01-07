import { Body } from "matter-js";
import { GRAVITY_Y } from "../constants";
import { BoxCenterFactory } from "../factory/boxCenterFactory";
import { BoxLeftFactory } from "../factory/boxLeftFactory";
import { BoxRightFactory } from "../factory/boxRightFactory";
import { Box } from "../objects/box";
import { BoxBodyWrapper } from "../objects/boxBodyWrapper";
import { Resolution } from "../types/common";
import { Level } from "./level";
import { Level2 } from "./level2";
import { Level4 } from "./level4";

export class Level3 extends Level {
    boxes: BoxBodyWrapper[];
    name: string = "2"
    playerStart: Resolution;
    playerEnd: Resolution;

    constructor(resolution: Resolution) {
        super(resolution)
        this.playerStart = {width: this.resolution.width / 2, height: this.resolution.height - 25}
        this.playerEnd = {width: this.resolution.width / 3 - 20, height: this.resolution.height / 6}

        const bfl = new BoxLeftFactory(this.resolution)
        const bfr = new BoxRightFactory(this.resolution)
        const bfc = new BoxCenterFactory(this.resolution)
        this.boxes = [
            bfc.createMDBox(this.resolution.width / 2, this.resolution.height - 10, "1"),

            bfl.createGravityBox(200, this.resolution.height - 170, bfl.smSize.width, bfl.smSize.height, "2", {x: 0.05, y: GRAVITY_Y}),
            bfl.createXSBox(100, this.resolution.height - 220, "3"),
            bfl.createSMBox(300, this.resolution.height - 280, "4"),
            bfl.createGravityBox(200, this.resolution.height - 450, bfl.smSize.width, bfl.smSize.height, "5", {x: 0, y: GRAVITY_Y}),

            bfr.createXSBox(100, this.resolution.height - 370, "6")
        ]
    }

    getNextLevel(): Level | null {
        return new Level4(this.resolution)
    }

    getPrevLevel(): Level | null {
        return new Level2(this.resolution)
    }

}
