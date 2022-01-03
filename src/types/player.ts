export enum PlayerState {
    STANDING,
    RUNNING_LEFT,
    RUNNING_RIGHT,
    JUMPING,
    FLYING
}

export enum JumpDirection {
    UP = 0,
    LEFT = -1,
    RIGHT = 1,
}

export type PlayerPosition = {
    x: number;
    y: number;
}

export type PlayerJump = {
    jumpStart: number | null,
    jumpEnd: number | null,
    jumpDirection: JumpDirection
}