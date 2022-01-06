import Matter from "matter-js";
import { MatterBody } from "../../libs/pixi-matter";
import * as ECS from '../../libs/pixi-ecs';
import { Coordinates, Size } from "../types/common";
import { BoxBodyWrapper } from "./boxBodyWrapper";

export class Box {
    size: Size
    body: Matter.Body
    container: ECS.Container
    color: number
    activeColor: number

    constructor(bodyWrapper: BoxBodyWrapper, container: ECS.Container, color: number = 0x2d2d2d, activeColor: number = 0x34a5eb) {
        this.size = bodyWrapper.size
        this.body = bodyWrapper.body
        this.container = container
        this.color = color
        this.activeColor = activeColor

        this.addGraphics()
    }

    removeGraphics() {
        this.container.removeChildren()
    }

    addGraphics(color: number = this.color) {
        const coords = {
            x: -this.container.width / 2,
            y: -this.container.height / 2 
        }
        const size = {
            width: this.container.width,
            height: this.container.height
        }
        this.createGraphics(coords, size, color)
    }

    createGraphics(coords: Coordinates, size: Size, color: number) {
        const graphics = new ECS.Graphics().beginFill(color).drawRect(coords.x, coords.y, size.width, size.height)
        this.container.addChild(graphics).addTag("box")
    }
}