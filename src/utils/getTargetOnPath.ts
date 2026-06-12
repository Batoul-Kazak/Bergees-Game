

import { PATH_1_INDICES, PATH_2_INDICES } from './pathUtils';
export function getTargetOnPath(player, firstPosition, steps) //steps is the cost for example dust => 10 //ignore the carry for now
{
    const PATH = player === "player1" ? PATH_1_INDICES : PATH_2_INDICES;

    const firstIdx_onPath =  PATH.findIndex(el => el === firstPosition);

    const targetIdx = firstIdx_onPath + steps; 
    const targetCellPosition = PATH.find((el, i) => i === targetIdx);

    return targetCellPosition;
}