import * as ECS from '../../libs/pixi-ecs';

export class KeyboardController {
    keyInputComponent: ECS.KeyInputComponent

    constructor(keyInputComponent: ECS.KeyInputComponent) {
        this.keyInputComponent = keyInputComponent
    }

    shouldMoveRight() {
        return this.keyInputComponent.isKeyPressed(ECS.Keys.KEY_RIGHT) || this.keyInputComponent.isKeyPressed(ECS.Keys.KEY_D)
    }

    shouldMoveLeft() {
        return this.keyInputComponent.isKeyPressed(ECS.Keys.KEY_LEFT) || this.keyInputComponent.isKeyPressed(ECS.Keys.KEY_A)
    }

    shouldJump() {
        return this.keyInputComponent.isKeyPressed(ECS.Keys.KEY_SPACE)
    }

    shouldJumpRight() {
        return !this.shouldMoveLeft() && this.shouldMoveRight()
    }

    shouldJumpLeft() {
        return this.shouldMoveLeft() && !this.shouldMoveRight()
    }

    shouldTeleportNextLevel() {
        return this.keyInputComponent.isKeyPressed(ECS.Keys.KEY_O)
    }

    shouldTeleportPreviousLevel() {
        return this.keyInputComponent.isKeyPressed(ECS.Keys.KEY_K)
    }

    shouldTeleportEnd() {
        return this.keyInputComponent.isKeyPressed(ECS.Keys.KEY_P)
    }

    shouldTeleportStart() {
        return this.keyInputComponent.isKeyPressed(ECS.Keys.KEY_L)
    }
}