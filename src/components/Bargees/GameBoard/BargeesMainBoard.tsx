import { useEffect, useContext, useState } from "react";
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
import { PATH_1_INDICES, PATH_2_INDICES } from "../../../utils/pathUtils";
import { getTargetOnPath } from "../../../utils/getTargetOnPath";
import {
  CheckIfCanMove,
  getAvailableSquares,
  getSelectedPieceCellPosition,
  preventedCell,
} from "../../../utils/boardHelpers";
export default function BargeesMainBoard() {
  const {
    cowriesGrid,
    boardPieces,
    player1PiecesIndices,
    player2PiecesIndices,
    setPlayer1PiecesIndices,
    setPlayer2PiecesIndices,
    availableMoves,
    selectedPieceIndex,
    playerTurn,
    setAvailableMoves,
    gameState,
    setGameState,
    setPlayerTurn,
    setSelectedPieceIndex,
  } = useContext(BargeesGameContext);

  const [availableCells, setAvailableCells] = useState([]);
  const [killingCells, setKillingCells] = useState([]);

  // note: Download the tailwind function to merge classes
  function StoneColor(index) {
    const selectedPiecePos = getSelectedPieceCellPosition(
      selectedPieceIndex,
      playerTurn,
      player1PiecesIndices,
      player2PiecesIndices,
    );

    let baseStyle;
    if (preventedCell(index)) return "bg-black border-black";
    else if (killingCells.includes(index))
      baseStyle = "bg-linear-90 from-red-500 to-red-800";
    else if (index === selectedPiecePos && selectedPieceIndex !== -1)
      baseStyle = "bg-linear-90 from-blue-500 to-blue-800";
    else if (PLAYER_1_HOME_1 === index || PLAYER_1_HOME_2 === index)
      baseStyle =
        "bg-linear-90 from-blue-500 to-blue-700 rounded-xl shadow-2xl shadow-white";
    else if (PLAYER_2_HOME_1 === index || PLAYER_2_HOME_2 === index)
      baseStyle =
        "bg-linear-90 from-purple-500 to-purple-700 rounded-xl shadow-2xl shadow-white";
    else if (SAFE_CELLS.includes(index))
      baseStyle = "bg-linear-90 from-yellow-400 to-yellow-800 rounded-[4px]";
    else if (
      PLAYER_1_REST_CELLS.includes(index) ||
      PLAYER_2_REST_CELLS.includes(index)
    )
      baseStyle = "bg-red-900 rounded-[4px]";
    else
      baseStyle = "bg-linear-90 from-wood-200/70 to-wood-700/60 rounded-[4px]"; //from-wood-200 to-wood-700

    const isAvailable = availableCells.flat().includes(index);

    if (isAvailable)
      return `${baseStyle} ring-4 ring-green-400 z-10 bg-green-500`;

    return baseStyle;
  }

  function handleStoneClicked(targetCellIdx) {
    // if(gameState !== "playing") return;

    //Prevent player from walking on unAllowed stones for him
    if (preventedCell(targetCellIdx)) return;

    let ALLOWED_TO_MOVE = true;
    // if (preventedCell(targetCellIdx)) ALLOWED_TO_MOVE = false;

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
    if (availableMoves.length === 0) return;

    const SELECTED_PIECE_POSITION = getSelectedPieceCellPosition(
      selectedPieceIndex,
      playerTurn,
      player1PiecesIndices,
      player2PiecesIndices,
    );

    console.log("selected piece position: ", SELECTED_PIECE_POSITION);

    if (SELECTED_PIECE_POSITION === -1 || SELECTED_PIECE_POSITION === null)
      return;

    const currentPath =
      playerTurn === "player1" ? PATH_1_INDICES : PATH_2_INDICES;

    const startIndex = currentPath.indexOf(SELECTED_PIECE_POSITION);
    const endIndex = currentPath.indexOf(targetCellIdx);

    //preventing player on moving but only if cell is in his path
    if (startIndex === -1 || endIndex === -1) return;

    const MOVES = getAvailableSquares(
      selectedPieceIndex,
      playerTurn,
      player1PiecesIndices,
      player2PiecesIndices,
      availableMoves,
    );

    //preventing player from moving on cells that are not available according to his score
    if (!MOVES.flat().includes(targetCellIdx)) return;

    console.log(
      "available squares: ",
      availableCells,
      "target cell idx: ",
      targetCellIdx,
    );

    if (!ALLOWED_TO_MOVE) return;

    // player1Indices => [15,21,56,245]
    const [selectedPlayer, selectedPieceIdxStr] = selectedPieceIndex.split("-"); //player1-0 => [player1, 0]
    const selectedPieceIdx = parseInt(selectedPieceIdxStr);

    if (selectedPlayer !== playerTurn) return;

    //player can move everywhere
    const setPieces =
      selectedPlayer === "player1"
        ? setPlayer1PiecesIndices
        : setPlayer2PiecesIndices;

    //update one piece position in playerPiecesIndices array state
    setPieces((prev) => {
      const newArr = [...prev];
      newArr[selectedPieceIdx] = targetCellIdx;
      return newArr;
    });

    const usedScoreIndex = availableMoves.findIndex((scoreItem) => {
      const calculatedPos = getTargetOnPath(
        playerTurn,
        SELECTED_PIECE_POSITION,
        scoreItem[0],
      );
      return calculatedPos === targetCellIdx;
    });

    if (usedScoreIndex === -1) return;

    setAvailableMoves((prev) => {
      const newMoves = [...prev];
      newMoves.splice(usedScoreIndex, 1);
      return newMoves;
    });

    const killer = playerTurn;
    const opponent = playerTurn === "player1" ? "player2" : "player1";

    const opponentPositions =
      playerTurn === "player1" ? player1PiecesIndices : player2PiecesIndices;

    MOVES.forEach((pos) => {
      const isOpponentPositionsIncludesPos = opponentPositions.forEach(
        (item) => {
          console.log("item: ", item, "position: ", pos);
          return item === pos;
        },
      );
      if (isOpponentPositionsIncludesPos) {
        setKillingCells((prev) => [...prev, pos]);
        console.log("BBB: ", pos);
      }
    });

    // const killer = playerTurn;
    // const opponent = playerTurn === "player1" ? "player2" : "player1";

    // const

    // turn of shaking for the player
    if (gameState === "turnEnds" && availableMoves.length === 1) {
      setGameState("idle");
      setPlayerTurn((prev) => (prev === "player1" ? "player2" : "player1"));
      setAvailableMoves([]);
      console.log("gameState: ", gameState, " playerTurn: ", playerTurn);
      setSelectedPieceIndex(-1);
    }
  }

  useEffect(() => {
    if (selectedPieceIndex !== -1 && selectedPieceIndex !== null) {
      const moves = getAvailableSquares(
        selectedPieceIndex,
        playerTurn,
        player1PiecesIndices,
        player2PiecesIndices,
        availableMoves,
      );
      setAvailableCells(moves);
    } else {
      setAvailableCells([]);
    }
    console.log(selectedPieceIndex);
  }, [
    selectedPieceIndex,
    availableMoves,
    playerTurn,
    player1PiecesIndices,
    player2PiecesIndices,
  ]);

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
