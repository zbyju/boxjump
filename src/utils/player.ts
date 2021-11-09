import { PlayerJump } from "../types/player"

function easeInQuad(x: number): number {
    return x * x;
}

function easeOutCubic(x: number): number {
    return 1 - Math.pow(1 - x, 3);
}

export const calculateJumpPower = (jump: PlayerJump): number => {
    const maxTime = 1
    const diffMS = Math.min(maxTime, Math.abs(jump.jumpEnd - jump.jumpStart) / 1e3) / maxTime
    const power = Math.max(0.15, easeOutCubic(diffMS))
    console.log(power)
    return power
}