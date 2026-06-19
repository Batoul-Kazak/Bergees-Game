import { Forward } from "@mui/icons-material";
import { WIN_CELLS } from "../constants/boardWinCells";
import { PATH_1_INDICES, PATH_2_INDICES } from "./pathUtils";
import { PLAYER_1_HOME_1, PLAYER_2_HOME_1 } from "../constants/boardHomes";
import { getTargetOnPath } from "./getTargetOnPath";

const GRID_SIZE = 19;

export function preventedCell(index) {
  const row = Math.floor(index / GRID_SIZE);
  const col = index % GRID_SIZE;

  const group1 = row <= 7 && col <= 7;
  const group2 = row <= 7 && col >= 11;
  const group3 = row >= 11 && col <= 7;
  const group4 = row >= 11 && col >= 11;
  const isWinCell = WIN_CELLS.includes(index);

  return isWinCell || group1 || group2 || group3 || group4;
}

export function getSelectedPieceCellPosition(
  selectedPieceIndex,
  playerTurn,
  player1PiecesIndices,
  player2PiecesIndices
) {
  if (selectedPieceIndex === -1 || selectedPieceIndex === null) return -1;

  const [player, pieceIdStr] = selectedPieceIndex.split("-");
  const pieceId = parseInt(pieceIdStr);

  const playerPiecesIndices =
    playerTurn === "player1" ? player1PiecesIndices : player2PiecesIndices;

  // if(!Array.isArray(playerPiecesIndices)) return -1;

  const selectedPlayerPosition = playerPiecesIndices.find(
    (pos, i) => i === pieceId
  );
  return selectedPlayerPosition;
}

export function getAvailableSquares(
  selectedPieceIndex,
  playerTurn,
  player1PiecesIndices,
  player2PiecesIndices,
  availableMoves
) {
  const START_INDEX = getSelectedPieceCellPosition(
    selectedPieceIndex,
    playerTurn,
    player1PiecesIndices,
    player2PiecesIndices
  );

  const availableSquares: number[] = [];

  //   if(!availableMoves || Array.isArray(availableMoves)) return [];

  console.log(availableMoves);

  availableMoves.forEach((score) => {
    if (!selectedPieceIndex || selectedPieceIndex === -1) return;

    // console.log("player1 path: ", PATH_1_INDICES);

    const TARGET_CELL_POSITION_1 = getTargetOnPath(
      playerTurn,
      START_INDEX,
      score[0], //for the main value (in case it is dust/binj)
    );
    const TARGET_CELL_POSITION_2 = getTargetOnPath(
      playerTurn,
      START_INDEX,
      score[1] //for the rest value (in case it is dust/binj)
    );

    const isEqual = TARGET_CELL_POSITION_1 === TARGET_CELL_POSITION_2;
    const position = isEqual
      ? TARGET_CELL_POSITION_1
      : [TARGET_CELL_POSITION_1, TARGET_CELL_POSITION_2];

    availableSquares.push(position);
  });

  // *this solution is the best but i won't return a Set because i treated this function as array in many places
  // const flattedAvailableSquares = availableSquares.flat(2);
  // const uniqueAvailableSquares = new Set(flattedAvailableSquares);
  // const opponentHome = playerTurn === "player1" ? PLAYER_2_HOME_1 : PLAYER_1_HOME_1;
  // uniqueAvailableSquares.forEach(item => {
  //   if(item === opponentHome)
  //     uniqueAvailableSquares.delete(item); 
  // })
  
  // const result = availableSquares.filter(item => item !== opponentHome);
  console.log(availableSquares);
  return availableSquares;
}

export function getFlattedAvailableSquares(
  selectedPieceIndex,
  playerTurn,
  player1PiecesIndices,
  player2PiecesIndices,
  availableMoves)
{
  // **this function flatten + make the items of the original function unique
  
  const flattedAvailableSquares = getAvailableSquares(
  selectedPieceIndex,
  playerTurn,
  player1PiecesIndices,
  player2PiecesIndices,
  availableMoves).flat(2);

  const uniqueAvailableSquares = new Set(flattedAvailableSquares);
  const opponentHome = playerTurn === "player1" ? PLAYER_2_HOME_1 : PLAYER_1_HOME_1;
  uniqueAvailableSquares.forEach(item => {
    if(item === opponentHome)
      uniqueAvailableSquares.delete(item); 
  })

  const result: number[] = [];
  uniqueAvailableSquares.forEach(item => {
    result.push(item);
  })

  return result;
  
}

export function CheckIfCanMove(arr, isAllowed, targetIdx) {
  arr.forEach((winCellIdx) => {
    if (winCellIdx === targetIdx) {
      isAllowed = false;
      return;
    }
  });
  return isAllowed;
}


// **i made this function to use to be able to identify the used availableMoves item to delete from moves after player is moved 
// ** this function returns array of two elements [index of first layer, index of the inner layer] for example [2,1] 

//**which means of this array [[6, 0], [12, 0],[10,1]] */ get number 1
export function getUsedMoveIndices(
  player: string,
  firstPosition: number,
  targetCellIdx: number,
  availableMoves: [number, number][]
): [number, number] {
  const PATH = player === "player1" ? PATH_1_INDICES : PATH_2_INDICES;
  const firstIdx_onPath = PATH.findIndex(el => el === firstPosition);

  for (let i = 0; i < availableMoves.length; i++) {
    const [step1, step2] = availableMoves[i];

    const pos1 = firstIdx_onPath + step1;
    if (pos1 < PATH.length && PATH[pos1] === targetCellIdx) {
      return [i, 0];  
    }

    const pos2 = firstIdx_onPath + step2;
    if (pos2 < PATH.length && PATH[pos2] === targetCellIdx) {
      return [i, 1]; 
    }
  }

  return [-1, -1]; 
}

// export function getAvailableSquares2( selectedPieceIndex: number,
//   playerTurn: string,
//   player1PiecesIndices: number[],
//   player2PiecesIndices: number[],
//   availableMoves: number[][]
// ){
//     const playerPieceIndices = playerTurn === "player1" ? player1PiecesIndices : player2PiecesIndices;
//     const playerPath = playerTurn === "player1" ? PLAYER_1_PATH : PLAYER_2_PATH;

//     const availableSquares: number[] = [];

//     let found = false;
//     let stepsTaken = 0;
//     const flattenAvailableMoves = availableMoves.flat().sort((a: number,b: number) => a - b);
//                           //{start: 352, end: 219, step: -19} 
//     playerPath.forEach(pathRange => {
//       if(flattenAvailableMoves.length === 0) console.log("empty");
//       const isForward = pathRange.step > 0;
//       for(let i = pathRange.start; isForward ? i <= pathRange.end : i >= pathRange.end; i += pathRange.step)
//       {
//         if(selectedPieceIndex === i) found = true;
//         if(!found) continue;

//         stepsTaken++;
//         if(flattenAvailableMoves.includes(stepsTaken))
//         {
//           if(!availableSquares.includes(i))
//           availableSquares.push(i);
//         }
//       }
//     })

//     return availableSquares;
//   }