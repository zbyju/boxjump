import Matter from "matter-js";
import { MatterBody } from "../../libs/pixi-matter";
import { Size } from "../types/common";

export class Box {
    size: Size
    box: Matter.Body

    constructor(box: Matter.Body, size: Size) {
        this.size = size
        this.box = box
    }
}