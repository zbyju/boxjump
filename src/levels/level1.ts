import { Body } from "matter-js";
import { BoxFactory } from "../factory/boxFactory";
import { BoxLeftFactory } from "../factory/boxLeftFactory";
import { BoxRightFactory } from "../factory/boxRightFactory";
import { Box } from "../objects/box";
import { BoxBodyWrapper } from "../objects/boxBodyWrapper";
import { Resolution } from "../types/common";
import { Level } from "./level";
import { Level2 } from "./level2";

export class Level1 extends Level {
    boxes: BoxBodyWrapper[];
    name: string = "1"
    playerStart: Resolution;
    playerEnd: Resolution;

    constructor(resolution: Resolution) {
        super(resolution)
        this.playerStart = {width: this.resolution.width / 2, height: this.resolution.height - 10}
        this.playerEnd = {width: this.resolution.width / 8, height: this.resolution.height / 10 - 10}

        const bfl = new BoxLeftFactory(this.resolution) 
        const bfr = new BoxRightFactory(this.resolution) 
               
        this.boxes = [
            bfl.createBox(0, this.resolution.height, this.resolution.width, 2, "floor"),
            bfl.createBox(0, this.resolution.height, 250, 150, "bigright"),
            bfr.createBox(0, this.resolution.height, 250, 150, "bigleft"),

            bfl.createMDBox(185, this.resolution.height - 220, "1"),
            bfl.createMDBox(0, this.resolution.height / 2.4, "2"),
            bfl.createSMBox(this.resolution.width / 2, this.resolution.height / 3, "3"),
            bfr.createSMBox(this.resolution.width / 2, this.resolution.height / 3, "3"),
            bfl.createSMBox(60, this.resolution.height / 7.5, "4"),
            bfr.createSMBox(60, this.resolution.height / 7.5, "5"),
        ]
    }

    getNextLevel(): Level | null {
        return new Level2(this.resolution)
    }

    getPrevLevel(): Level | null {
        return null
    }
}