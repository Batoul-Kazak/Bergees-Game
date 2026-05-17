import { useEffect, useContext, useState } from 'react';
import { BargeesGameContext } from "../../../contexts/BargeesGameContext";
import {
  FORBIDDEN_CELLS,
  PLAYER_1_FORBIDDEN_CELLS,
  PLAYER_2_FORBIDDEN_CELLS,
} from "../../../constants/boardPaths";

import {
  PLAYER_1_REST_CELLS,
  WIN_CELLS,
} from "../../../constants/boardWinCells";
import { PLAYER_2_REST_CELLS } from "../../../constants/boardWinCells";
import {
  SAFE_CELLS,
  PLAYER_1_HOME_2,
  PLAYER_1_HOME_1,
  PLAYER_2_HOME_1,
  PLAYER_2_HOME_2,
} from "../../../constants/boardHomes";
import Cowrie from "./Cowrie";
import Player from "./Player";
import { PATH_1_INDICES } from "../../../utils/pathUtils";
import { getTargetOnPath } from "../../../utils/getTargetOnPath";
// import { usePieceMove } from "../../../hooks/usePieceMove";
// import { useSelectedPiece } from "../../../hooks/useSelectedPiece";
export default function BargeesMainBoard() {
  const GRID_SIZE = 19;
  const {
    cowriesGrid,
    boardPieces,
    player1PiecesIndices,
    player2PiecesIndices,
    setPlayer1PiecesIndices,
    setPlayer2PiecesIndices,
    currentPlayerScore,
    selectedPieceIndex,
    playerTurn,
  } = useContext(BargeesGameContext);
  // const [idx, setIdx] = useState(0);
  // const {getAvailableSquares} = usePieceMove();
  // const {getSelectedPieceIndex} = useSelectedPiece();
  const [availableCells, setAvailableCells] = useState([]);

  function preventedCell(index) {
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;

    const group1 = row <= 7 && col <= 7;
    const group2 = row <= 7 && col >= 11;
    const group3 = row >= 11 && col <= 7;
    const group4 = row >= 11 && col >= 11;
    const isWinCell = WIN_CELLS.includes(index);

    return isWinCell || group1 || group2 || group3 || group4;
  }

  // note: Download the tailwind function to merge classes
  function StoneColor(index) {
    let baseStyle = "";

    if (preventedCell(index)) return "bg-black border-black";
    else if (PLAYER_1_HOME_1 === index || PLAYER_1_HOME_2 === index)
      baseStyle = "bg-linear-90 from-blue-500 to-blue-700 rounded-xl shadow-2xl shadow-white";
    else if (PLAYER_2_HOME_1 === index || PLAYER_2_HOME_2 === index)
      baseStyle = "bg-linear-90 from-purple-500 to-purple-700 rounded-xl shadow-2xl shadow-white";
    else if (SAFE_CELLS.includes(index))
      baseStyle = "bg-linear-90 from-yellow-400 to-yellow-800 rounded-[4px]";
    else if (
      PLAYER_1_REST_CELLS.includes(index) ||
      PLAYER_2_REST_CELLS.includes(index)
    )
      baseStyle = "bg-red-900 rounded-[4px]";
    else baseStyle = "bg-linear-90 from-wood-200 to-wood-700 rounded-[4px]";

    const isAvailable = availableCells.flat().includes(index);
    if(isAvailable) return `${baseStyle} ring-4 ring-green-400 z-10 bg-green-500 `;

    return baseStyle;
  }

  function CheckIfCanMove(arr, isAllowed, targetIdx) {
    arr.forEach((winCellIdx) => {
      if (winCellIdx === targetIdx) {
        isAllowed = false;
        return;
      }
    });
    return isAllowed;
  }

  function getSelectedPieceCellPosition() {
    // console.log(getSelectedPieceCellPosition);
    if (selectedPieceIndex === -1 || selectedPieceIndex === null) return -1;

    const [player, pieceIdStr] = selectedPieceIndex.split("-");
    const pieceId = parseInt(pieceIdStr);

    const playerPiecesIndices =
    playerTurn === "player1" ? player1PiecesIndices : player2PiecesIndices;
    
    // const selectedPlayerPosition = playerPiecesIndices[pieceId];
    const selectedPlayerPosition = playerPiecesIndices.find((pos, i) => i === pieceId);
    return selectedPlayerPosition;
  }

  function getAvailableSquares() {
    const START_INDEX = getSelectedPieceCellPosition();
    
    const availableSquares = []; // e.g.[{squareNumber: 234, cost: "10"}] //10 means dust without carry
    
    currentPlayerScore.forEach((score) => { 
      if (!selectedPieceIndex || selectedPieceIndex === -1) return;

      console.log("player1 path: ", PATH_1_INDICES);
      // const TARGET_CELL_POSITION_1 = START_INDEX + score[0];  //this is wrong because the path is not a regular square
      // const TARGET_CELL_POSITION_2 = START_INDEX + score[1];

      const TARGET_CELL_POSITION_1 = getTargetOnPath(playerTurn, START_INDEX, score[0]);
      const TARGET_CELL_POSITION_2 = getTargetOnPath(playerTurn, START_INDEX, score[1]);
      // console.log("TTTTTTTTTT: ", TARGET_CELL_POSITION_1); //number

      // const END_INDEX_1 =
      //   playerTurn === "player1"
      //     ? PATH_1_INDICES.indexOf(TARGET_CELL_POSITION_1)
      //     : PATH_2_INDICES.indexOf(TARGET_CELL_POSITION_1);
      // const END_INDEX_2 =
      //   playerTurn === "player1"
      //     ? PATH_1_INDICES.indexOf(TARGET_CELL_POSITION_2)
      //     : PATH_2_INDICES.indexOf(TARGET_CELL_POSITION_2);

      // let newValue1 = {};
      // let newValue2 = {};

      // if (END_INDEX_1 === END_INDEX_2) {
      //   newValue1 = { squareIdx: END_INDEX_1, cost: score[0] };
      //   availableSquares.push(newValue1);
      // } else {
      //   newValue1 = { squareIdx: END_INDEX_1, cost: score[0] };
      //   newValue2 = { squareIdx: END_INDEX_2, cost: score[1] };

      //   availableSquares.push(newValue1);
      //   availableSquares.push(newValue2);
      // }
      const isEqual = TARGET_CELL_POSITION_1 === TARGET_CELL_POSITION_2;
      const position = isEqual ? TARGET_CELL_POSITION_1 : [TARGET_CELL_POSITION_1, TARGET_CELL_POSITION_2];
      availableSquares.push(position);
      // setAvailableCells(availableCells => [...availableCells, position]);
    });
    return availableSquares;
  }

  function handleStoneClicked(targetCellIdx) {
    // if(gameState !== "playing") return;

    //Prevent player from walking on unAllowed stones for him
    let ALLOWED_TO_MOVE = true;
    if (preventedCell(targetCellIdx)) ALLOWED_TO_MOVE = false;

    ALLOWED_TO_MOVE = CheckIfCanMove(
      FORBIDDEN_CELLS,
      ALLOWED_TO_MOVE,
      targetCellIdx,
    );
    if (playerTurn === "player1")
      ALLOWED_TO_MOVE = CheckIfCanMove(
        PLAYER_1_FORBIDDEN_CELLS,
        ALLOWED_TO_MOVE,
        targetCellIdx,
      );
    else if (playerTurn === "player2")
      ALLOWED_TO_MOVE = CheckIfCanMove(
        PLAYER_2_FORBIDDEN_CELLS,
        ALLOWED_TO_MOVE,
        targetCellIdx,
      );

    //Prevent player from walking if doesn't have enough score
    if (currentPlayerScore.length === 0) return;

    const SELECTED_PIECE_POSITION = getSelectedPieceCellPosition();

    console.log("selected piece position: ", SELECTED_PIECE_POSITION);

    if (
      SELECTED_PIECE_POSITION === -1 ||
      SELECTED_PIECE_POSITION === null ||
      SELECTED_PIECE_POSITION === undefined
    )
      return;

    const startIndex =
      playerTurn === "player1"
        ? PATH_1_INDICES.indexOf(SELECTED_PIECE_POSITION)
        : PATH_2_INDICES.indexOf(SELECTED_PIECE_POSITION);
    const endIndex =
      playerTurn === "player1"
        ? PATH_1_INDICES.indexOf(targetCellIdx)
        : PATH_2_INDICES.indexOf(targetCellIdx);

    if (startIndex === -1 || endIndex === -1) return;

    const distance = endIndex - startIndex - 1;
    console.log("distance: ", distance);

    const MOVES = getAvailableSquares();

    if(!MOVES.flat().includes(targetCellIdx)) ALLOWED_TO_MOVE = false;

    console.log("available squares: ", availableCells, "target cell idx: ", targetCellIdx);

    if (!ALLOWED_TO_MOVE) return;

    if (selectedPieceIndex === -1 || selectedPieceIndex === null) return;

    const [selectedPlayer, selectedPieceIdxStr] = selectedPieceIndex.split("-"); //player1-0 => [player1, 0]
    const selectedPieceIdx = parseInt(selectedPieceIdxStr);

    if (selectedPlayer !== playerTurn) return;

    //player can move everywhere
    const setPieces =
      selectedPlayer === "player1"
        ? setPlayer1PiecesIndices
        : setPlayer2PiecesIndices;
    setPieces((prev) => {
      const newArr = [...prev];
      newArr[selectedPieceIdx] = targetCellIdx;
      return newArr;
    });

    // setSelectedPieceIndex(-1);
    // console.log(idx + "  " + player1PiecesIndices);
  }

  //   useEffect(() => {
  //     console.log("P1 Pieces:", player1PiecesIndices);
  //     console.log("P2 Pieces:", player2PiecesIndices);
  //   }, [player1PiecesIndices, player2PiecesIndices]);

  //   useEffect(() => {
  //     console.log("player1 forbidden cells: ", PLAYER_1_FORBIDDEN_CELLS);
  //     console.log("player2 forbidden cells: ", PLAYER_2_FORBIDDEN_CELLS);
  //     console.log("general forbidden ", FORBIDDEN_CELLS);
  //   }, []);

  useEffect(() => {
    if(selectedPieceIndex !== -1 && selectedPieceIndex !== null)
    {
      const moves = getAvailableSquares();
      setAvailableCells(moves);
      
      // if(!availableSquares.flat().includes(targetCellIdx)) ALLOWED_TO_MOVE = false;
    } else {
      setAvailableCells([]);
    }
      console.log(selectedPieceIndex);
    // console.log(PATH_2_INDICES);
  }, [selectedPieceIndex, currentPlayerScore, playerTurn, player1PiecesIndices, player2PiecesIndices]);

  return (
    <div
      className="grid bg-black shadow-2xl -rotate-45 rounded-[1px] overflow-hidden "
      style={{
        gridTemplateColumns: "repeat(19, 1fr)",
        width: "min(60vw, 760px)",
        aspectRatio: "1/1",
        height: "min(60vw, 760px)",
        // gap: "1px"
      }}
    >
      {boardPieces.map((_, index) => {
        const isHidden = preventedCell(index);
        const winCellIndex = WIN_CELLS.indexOf(index);
        const stoneType =
          winCellIndex !== -1 ? cowriesGrid[winCellIndex] : null;

        return (
          <div
            key={index}
            className={`border-[0.5px] inset-0 relative cursor-pointer 
                        flex justify-center items-center ${StoneColor(index)} font-bold text-red-950 text-[12px] w-9 h-9`}
            onClick={() => handleStoneClicked(index)}
          >
            {!isHidden && !WIN_CELLS.includes(index) && index}
            {stoneType && <Cowrie type={stoneType} />}
            {!isHidden &&
              !WIN_CELLS.includes(index) &&
              player1PiecesIndices.includes(index) &&
              player1PiecesIndices.map((pos, pieceIdx) =>
                pos === index ? (
                  <Player
                    key={`p1-${pieceIdx}`}
                    player="player1"
                    id={pieceIdx}
                  />
                ) : null,
              )}

            {!isHidden &&
              !WIN_CELLS.includes(index) &&
              player2PiecesIndices.includes(index) &&
              player2PiecesIndices.map((pos, pieceIdx) =>
                pos === index ? (
                  <Player
                    key={`p2-${pieceIdx}`}
                    player="player2"
                    id={pieceIdx}
                  />
                ) : null,
              )}
          </div>
        );
      })}
    </div>
  );
}
