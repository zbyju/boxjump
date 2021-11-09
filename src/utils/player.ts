import { PlayerJump } from "../types/player"

function easeInQuad(x: number): number {
    return x * x;
}

export const calculateJumpPower = (jump: PlayerJump): number => {
    const maxTime = 1
    const diffMS = Math.min(maxTime, Math.abs(jump.jumpEnd - jump.jumpStart) / 1e3) / maxTime
    const power = Math.max(0.15, easeInQuad(diffMS))
    console.log(power)
    return power
}