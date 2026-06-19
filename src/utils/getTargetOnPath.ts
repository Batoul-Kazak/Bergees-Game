

import { PATH_1_INDICES, PATH_2_INDICES } from './pathUtils';

export function getTargetOnPath(player: string, 
    firstPosition: number, //the selected position (started point)
     step: number) //steps is the cost for example dust => 10 //ignore the carry for now
{
    const PATH = player === "player1" ? PATH_1_INDICES : PATH_2_INDICES;
    
    const firstIdx_onPath =  PATH.findIndex(el => el === firstPosition); //selectedPiecePosition
    
    const targetIdx = firstIdx_onPath + step; //cell index we want to remove
    const targetCellPosition = PATH.find((_el, i) => i === targetIdx);

    return targetCellPosition;
}