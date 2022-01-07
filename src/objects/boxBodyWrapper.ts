import Matter from "matter-js";
import { MatterBody } from "../../libs/pixi-matter";
import { Size } from "../types/common";

export class BoxBodyWrapper {
    body: Matter.Body
    size: Size
    group: string

    constructor(body: Matter.Body, size: Size, group: string) {
        this.body = body
        this.size = size
        this.group = group
    }
}