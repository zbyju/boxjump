import Matter from 'matter-js';
import * as ECS from '../../libs/pixi-ecs';
import { Coordinates, Resolution, Size } from '../types/common';

export const getResolutionFromEngine = (engine: ECS.Engine): Resolution => {
    return { width: engine.app.screen.width, height: engine.app.screen.height }
}

export const coordinatesFromCenterToCorner = (coords: Coordinates, size: Size): Coordinates => {
    return {
        x: coords.x - size.width / 2,
        y: coords.y + size.height / 2
    }
}

export const coordinatesFromCornerToCenter = (coords: Coordinates, size: Size): Coordinates => {
    return {
        x: coords.x + size.width / 2,
        y: coords.y - size.height / 2
    }
}


export const coordinatesFromCenterToRightCorner = (coords: Coordinates, size: Size, resolution: Resolution): Coordinates => {
    return {
        x: resolution.width - (coords.x - size.width / 2),
        y: coords.y + size.height / 2
    }
}

export const coordinatesFromRightCornerToCenter = (coords: Coordinates, size: Size, resolution: Resolution): Coordinates => {
    return {
        x: resolution.width - (coords.x + size.width / 2),
        y: coords.y - size.height / 2
    }
}

export const calculateBoxSize = (box: Matter.Body): Size => {
    return {
        width: box.bounds.max.x - box.bounds.min.x,
        height: box.bounds.max.y - box.bounds.min.y
    }
}