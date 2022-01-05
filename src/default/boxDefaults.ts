import { IChamferableBodyDefinition } from "matter-js";

export const getDefaultBoxOptions = (): IChamferableBodyDefinition => {
    return { isStatic: true, restitution: 1, friction: 0 }
}