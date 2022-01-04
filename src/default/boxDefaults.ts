import { IChamferableBodyDefinition } from "matter-js";

export const getDefaultBoxOptions = (): IChamferableBodyDefinition => {
    return { isStatic: true, restitution: 0.7, friction: 0 }
}