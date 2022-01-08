import { IChamferableBodyDefinition } from "matter-js"
import { PLAYER_DENSITY, PLAYER_RESTITUTION, PLAYER_FRICTION, PLAYER_FRICTION_AIR, PLAYER_FRICTION_STATIC, PLAYER_INERTIA, PLAYER_WIDTH, PLAYER_HEIGHT } from "../constants"
import { Size } from "../types/common"
import { JumpDirection, PlayerJump } from "../types/player"

export const getDefaultJump = (): PlayerJump => {
    return { jumpStart: null, jumpEnd: null, jumpDirection: JumpDirection.UP }
}

export const getDefaultPlayerOptions = (): IChamferableBodyDefinition => {
    return {
        density: PLAYER_DENSITY,
        restitution: PLAYER_RESTITUTION,
        friction: PLAYER_FRICTION,
        frictionAir: PLAYER_FRICTION_AIR,
        frictionStatic: PLAYER_FRICTION_STATIC,
        inertia: PLAYER_INERTIA,
    }
}

export const getDefaultPlayerSize = (): Size => {
    return {
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT
    }
}