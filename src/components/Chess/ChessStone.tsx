import { useContext, useEffect } from "react";
import { ChessGameContext } from "../../contexts/ChessGameContext";
import { getPlayerSettingOnCell, getSelectedPlayerInfo } from "../../utils/ChessGame/boardHelper";
import ChessPiece from "./ChessPiece";
import { pawnsInitialStateType, PieceIndexType, selectedPlayerAvailableCellType } from "../../types/ChessGame/ChessGameTypes";
import { BlackPiecesInitialPositions } from "../../constants/ChessGame/PiecesInitialIndicies";
import { useMovePath } from "../../hooks/useMovePath";
import { useChessActions } from "../../hooks/useChessActions";

export function ChessStone({ color, stoneIdx }: { color: "white" | "black", stoneIdx: number }) {
  const { whitePiecesPositions,
    blackPiecesPositions, 
      whiteSelectedPiece,
      setWhiteSelectedPiece,
      blackSelectedPiece,
      setBlackSelectedPiece,
      setBlackPiecesPositions,
      setWhitePiecesPositions,
      playerTurn,
      setPlayerTurn,
      blackPawnsHaveMoved, 
      setBlackPawnsHaveMoved,
      whiteKingHasCastled, 
      setWhiteKingHasCastled,
      blackKingHasCastled, 
      setBlackKingHasCastled,
      whitePawnsHaveMoved, 
      setWhitePawnHaveMoved,
      selectedPlayerAvailableCells,
      setSelectedPlayerAvailableCells
   } = useContext(ChessGameContext);
  // const {colorTheme, setColorTheme} = useSettings();

    const {getMovesPath} = useMovePath();
    const {executeMove} = useChessActions();
      
    const currentPlayerSelectedPiece = playerTurn === "white" ? whiteSelectedPiece : blackPiecesPositions
    const selectedPlayerPosition = playerTurn === "white" ? whiteSelectedPiece : blackSelectedPiece;
    const setPlayerSelectedPiece = playerTurn === "white" ? setWhiteSelectedPiece : setBlackSelectedPiece;
    const playerSelectedPiece = playerTurn === "white" ? whiteSelectedPiece : blackSelectedPiece;
    const setPlayerPiecesPositions = playerTurn === "white" ? setWhitePiecesPositions : setBlackPiecesPositions;
    // const playerPiecesPositions = playerTurn === "white" ? whitePiecesPositions : blackPiecesPositions;
    
    const playerSettingOnCell = getPlayerSettingOnCell(stoneIdx, whitePiecesPositions, blackPiecesPositions);

    // const cellColor = (currentPlayerSelectedPiece !== -1 && currentPlayerSelectedPiece === stoneIdx) ? 
    // "bg-yellow-500" : (selectedPlayerPosition !== -1 && selectedPlayerPosition === stoneIdx) ? 
    // "bg-mint-500/90 border-mint-700 border-4 border-solid rounded-xl" : color === "white" ? "dark:bg-gray-500 bg-gray-300" : "dark:bg-black bg-gray-800";

  function handleStoneClicked()
  {
    // const playerKingHasCastled = playerTurn === "white" ? whiteKingHasCastled : blackKingHasCastled;
    // const playerPawnHaveMoved = playerTurn === "white" ? whitePawnsHaveMoved : blackPawnsHaveMoved;
    // const setPlayerPawnHaveMoved = playerTurn === "white" ? setWhitePawnHaveMoved : setBlackPawnsHaveMoved;
    const clickedCellInfo = getPlayerSettingOnCell(stoneIdx, whitePiecesPositions, blackPiecesPositions);
    const selectedPlayer = getSelectedPlayerInfo(selectedPlayerPosition, whitePiecesPositions, blackPiecesPositions);
    
    if(selectedPlayerPosition === -1 || !selectedPlayer)
    {
        if(clickedCellInfo && clickedCellInfo.color === playerTurn)
        {
          const moves = getMovesPath(clickedCellInfo);
          setSelectedPlayerAvailableCells(moves);
          setPlayerSelectedPiece(stoneIdx);
        }
        return;
    }

    if(selectedPlayerPosition === stoneIdx) {
      setPlayerSelectedPiece(-1);
      setSelectedPlayerAvailableCells([]);
      return;}
    
    // if(!selectedPlayer) return;
    const movePath = getMovesPath(selectedPlayer);
    const movePathIndices = movePath.map(item => item.idx);
    setSelectedPlayerAvailableCells(movePath);

    if(movePathIndices.includes(stoneIdx))
    {
        // setPlayerPiecesPositions((prev: PieceIndexType[]) => {
        //     return prev.map((piece) => piece.idx === selectedPlayerPosition ? {...piece, idx: stoneIdx} : piece)});
            
        // if(selectedPlayer.pieceType === "pawn")
        // {
        //     setPlayerPawnHaveMoved((prev: pawnsInitialStateType) => prev.id === selectedPlayer.id ? {...prev, hasMovedBefore: true} : prev);
        // }
            
        // setPlayerTurn(prev => prev ==="white" ? "black" : "white");
        // setPlayerSelectedPiece(-1);
        // setSelectedPlayerAvailableCells([]);
        executeMove(selectedPlayer, stoneIdx, clickedCellInfo);
    } else {
        if(clickedCellInfo && clickedCellInfo.color === playerTurn)
        {
            setPlayerSelectedPiece(stoneIdx);
            const moves = getMovesPath(clickedCellInfo)
            setSelectedPlayerAvailableCells(moves);
        } else console.log("invalid move");
    }
    
  }

  const attackCells = selectedPlayerAvailableCells.map((item: selectedPlayerAvailableCellType) =>
     item.moveType === "capture" ? item.idx : -1);
  const regularMoveCells = selectedPlayerAvailableCells.map((item: selectedPlayerAvailableCellType) => 
      item.moveType === "normal" ? item.idx : -1);
  const isValidTarget = attackCells.includes(stoneIdx) || regularMoveCells.includes(stoneIdx);
  const isSelected = selectedPlayerPosition === stoneIdx;

  let finalColorClass = "";
  const whiteColor = "dark:bg-gray-500 bg-linear-to-r from-gray-200 to-gray-400 border-gray-400";
  const blackColor = "dark:bg-black bg-linear-to-b from-gray-700 to-gray-900 border-gray-900 text-white"
  const defaultColor = color === "white" ? whiteColor : blackColor;
  if (isSelected) {
    finalColorClass = "bg-yellow-500 border-yellow-700";
  } else if (isValidTarget) {
    if (attackCells.includes(stoneIdx)) {
       finalColorClass = `${defaultColor} border-red-500 border-4 border-solid`; // Capture
    } else if(regularMoveCells.includes(stoneIdx)) {
       finalColorClass = `${defaultColor} border-mint-500 border-4 border-solid`; // Move
    }
  } else {
    finalColorClass = defaultColor;
  }

  return (
    <div className={`w-full relative h-full cursor-pointer border-2 border-double rounded-[5px] text-sm
    ${finalColorClass}
     ${color === "white" ? " border-gray-400 " : " border-gray-900 text-white"}`}
     onClick={handleStoneClicked}
     >
      <>
      {playerSettingOnCell?.idx === stoneIdx && <ChessPiece type={playerSettingOnCell.pieceType} player={playerSettingOnCell.color} />}
      {stoneIdx}
      </>
    </div>
  )
}