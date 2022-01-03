import { PlayerPosition } from "../types/player";

export default class PositionQueue {
    positionQueue: Array<PlayerPosition>
    n: number

    constructor(n: number = 20) {
        this.positionQueue = []
        this.n = n
    }

    addPosition(position: PlayerPosition) {
        const newPosition = Object.assign({}, position)
        if(this.positionQueue.length < this.n) {
            this.positionQueue.push(newPosition)
        } else {
            this.positionQueue.shift()
            this.positionQueue.push(newPosition)
        }
    }

    getAverageY(): number {
        if(this.positionQueue.length == 0) return 0
        return this.positionQueue.map(p => p.y).reduce((partialSum, a) => partialSum + a, 0) / this.positionQueue.length
    }

    getAverageX(): number {
        if(this.positionQueue.length == 0) return 0
        return this.positionQueue.map(p => p.x).reduce((partialSum, a) => partialSum + a, 0) / this.positionQueue.length
    }

    getAveragePosition(): PlayerPosition {
        return { x: this.getAverageX(), y: this.getAverageY() }
    }

    getMaxDifferenceX(): number {
        const max = Math.max(...this.positionQueue.map(p => p.x))
        const min = Math.min(...this.positionQueue.map(p => p.x))
        return max - min
    }

    getMaxDifferenceY(): number {
        const max = Math.max(...this.positionQueue.map(p => p.y))
        const min = Math.min(...this.positionQueue.map(p => p.y))
        return max - min
    }

    getMaxDifference(): PlayerPosition {
        return { x: this.getMaxDifferenceX(), y: this.getMaxDifferenceY() }
    }
}