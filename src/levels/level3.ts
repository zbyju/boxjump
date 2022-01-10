import { GRAVITY_X, GRAVITY_Y, PLAYER_WIDTH } from "../constants";
import { BoxCenterFactory } from "../factory/boxCenterFactory";
import { BoxLeftFactory } from "../factory/boxLeftFactory";
import { BoxRightFactory } from "../factory/boxRightFactory";
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
        this.playerEnd = {width: this.resolution.width / 2, height: 30}

        const bfl = new BoxLeftFactory(this.resolution)
        const bfr = new BoxRightFactory(this.resolution)
        const bfc = new BoxCenterFactory(this.resolution)
        this.boxes = [
            bfc.createMDBox(this.resolution.width / 2, this.resolution.height - 10, "1"),

            bfl.createGravityBox(200, this.resolution.height - 15, bfl.smSize.width, bfl.smSize.height, "2", {x: 0.042, y: GRAVITY_Y}),

            bfc.createBox(this.resolution.width / 2, this.resolution.height - 100, bfc.mdSize.width + PLAYER_WIDTH + 10, bfc.mdSize.height, "3"),

            bfr.createXSBox(180, this.resolution.height - 150, "4"),
            bfr.createXSBox(80, this.resolution.height - 200, "5"),
            bfr.createGravityBox(150, this.resolution.height - 300, bfr.xsSize.width, bfr.xsSize.height, "6", {x: -0.042, y: GRAVITY_Y}),

            bfl.createGravityBox(120, this.resolution.height - 300, bfr.mdSize.width, bfr.xsSize.height, "7", {x: GRAVITY_X, y: GRAVITY_Y}),

            bfl.createBox(300, this.resolution.height - 500, this.resolution.width - 400, bfl.smSize.height, "8"),

        ]
    }

    getNextLevel(): Level | null {
        return new Level4(this.resolution)
    }

    getPrevLevel(): Level | null {
        return new Level2(this.resolution)
    }

}
