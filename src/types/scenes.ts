import * as ECS from '../../libs/pixi-ecs';

export const TRANSPARENT = 0
export const OPAQUE = 1

export enum IntroStages {
    WAIT,
    FADE_BLACK,
    FADE_OUT,
    DESTROY
}

export enum OutroStages {
    FADE_BLACK = "FADE_BLACK",
    FADE_TEXT_IN = "FADE_TEXT_IN",
    WAIT = "WAIT",
    FADE_TEXT_OUT = "FADE_TEXT_OUT",
    FADE_OUT = "FADE_OUT",
    DESTROY = "DESTROY"
}

export type Cover = {
    cover: ECS.Graphics
    alpha: number,
    zIndex: number
}