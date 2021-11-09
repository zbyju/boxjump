import * as ECS from '../../libs/pixi-ecs';
import { Resolution } from '../types/common';

export const getResolutionFromEngine = (engine: ECS.Engine): Resolution => {
    return { width: engine.app.screen.width, height: engine.app.screen.height }
}