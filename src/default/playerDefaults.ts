import { JumpDirection, PlayerJump } from "../types/player"

export const getDefaultJump = (): PlayerJump => {
    return { jumpStart: null, jumpEnd: null, jumpDirection: JumpDirection.UP }
}