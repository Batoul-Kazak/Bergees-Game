// import { PATH_1_INDICES, PATH_2_INDICES } from './pathUtils';
// export function canMoveOnPath(player, firstPosition, targetPosition, steps) //steps is the cost for example dust => 10 //ignore the carry for now
// {
//     const PATH = player === "player1" ? PATH_1_INDICES : PATH_2_INDICES;

//     const firstIdx_onPath =  PATH.findIndex(el => el === firstPosition);
//     const targetIdx_onPath =  PATH.findIndex(el => el === targetPosition);

//     // const isFirstLess = firstIdx_onPath < targetIdx_onPath;
//     // console.log(!isFirstLess ? "first is less" : "");

//     // const steps_onPath = isFirstLess ? targetIdx_onPath - firstIdx_onPath : firstIdx_onPath - targetIdx_onPath;

//     //didn't calculate targetIdx_onPath + steps ==== fistIdx... because we only want to move forward
//     const canReachTarget = firstIdx_onPath + steps === targetIdx_onPath ? true : false; 
//     // [12,23,445,56,41,72,83]

//     // const actualOneStep = //how many number difference between first index and the next square on path
//     // number of squares (path1 elements) needed to pass to reach the targetPosition
//     console.log("firstIdx on path + steps: ", firstIdx_onPath+steps);
//     return canReachTarget;
// }

import { PATH_1_INDICES, PATH_2_INDICES } from './pathUtils';
export function getTargetOnPath(player, firstPosition, steps) //steps is the cost for example dust => 10 //ignore the carry for now
{
    const PATH = player === "player1" ? PATH_1_INDICES : PATH_2_INDICES;

    const firstIdx_onPath =  PATH.findIndex(el => el === firstPosition);

    const targetIdx = firstIdx_onPath + steps; 
    const targetCellPosition = PATH.find((el, i) => i === targetIdx);

    return targetCellPosition;
}