import * as ECS from '../../libs/pixi-ecs';

export const removeBoxGraphics = (container: ECS.Container) => {
    container.removeChildren()
}

export const addBoxGraphics = (container: ECS.Container, color: number) => {
    const coords = {
        x: -container.width / 2,
        y: -container.height / 2 
    }
    const size = {
        width: container.width,
        height: container.height
    }

    const graphics = new ECS.Graphics().beginFill(color).drawRect(coords.x, coords.y, size.width, size.height)
    container.addChild(graphics)
}