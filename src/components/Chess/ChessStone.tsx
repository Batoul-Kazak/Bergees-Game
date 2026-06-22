import { useContext, useEffect } from "react";
import { ChessGameContext } from "../../contexts/ChessGameContext";
import { getMovePath, getPieceType, getPlayerSettingOnCell, getSelectedPlayerInfo } from "../../utils/ChessGame/boardHelper";
import ChessPiece from "./ChessPiece";
import { pawnsInitialStateType, PieceIndexType } from "../../types/ChessGame/ChessGameTypes";
import { BlackPiecesInitialPositions } from "../../constants/ChessGame/PiecesInitialIndicies";

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

  // function color_() {
    // switch(colorTheme)
    // {
      // case "wooden": return color === "light" ? "dark:bg-gray-500 bg-gray-100" : "dark:bg-black bg-gray-800"; 
      // case "blackAndWhite": return color === "light" ? "dark:bg-gray-500 bg-gray-100" : "dark:bg-black bg-gray-800";
      // case "glass": return color === "light" ? "dark:bg-gray-500 bg-gray-100" : "dark:bg-black bg-gray-800"
    // }
  // }

    const currentPlayerSelectedPiece = playerTurn === "white" ? whiteSelectedPiece : blackPiecesPositions
    const selectedPlayerPosition = playerTurn === "white" ? whiteSelectedPiece : blackSelectedPiece;
    const setPlayerSelectedPiece = playerTurn === "white" ? setWhiteSelectedPiece : setBlackSelectedPiece;
    const playerSelectedPiece = playerTurn === "white" ? whiteSelectedPiece : blackSelectedPiece;
    const setPlayerPiecesPositions = playerTurn === "white" ? setWhitePiecesPositions : setBlackPiecesPositions;
    // const playerPiecesPositions = playerTurn === "white" ? whitePiecesPositions : blackPiecesPositions;
    
    const playerSettingOnCell = getPlayerSettingOnCell(stoneIdx, whitePiecesPositions, blackPiecesPositions);

//   function getCellColor()
//   {
    // let cellColor;
// 
    // if(selectedCell === whiteSelectedPiece || selectedCell === blackSelectedPiece) cellColor = "bg-yellow-500 border-yellow-700";
    // else if(selectedCell === stoneIdx) cellColor = "bg-mint-500/90 border-mint-700";
    // else if(color === "white") cellColor = "dark:bg-gray-500 bg-gray-300 border-gray-400"; 
    // else cellColor = "dark:bg-black bg-gray-800 border-gray-900 text-white";
    // console.log(cellColor)
    // return cellColor;
//   }

  const cellColor = (currentPlayerSelectedPiece !== -1 && currentPlayerSelectedPiece === stoneIdx) ? 
  "bg-yellow-500" : (selectedPlayerPosition !== -1 && selectedPlayerPosition === stoneIdx) ? 
  "bg-mint-500/90 border-mint-700 border-4 border-solid rounded-xl" : color === "white" ? "dark:bg-gray-500 bg-gray-300" : "dark:bg-black bg-gray-800";

  function handleStoneClicked()
  {
    const playerKingHasCastled = playerTurn === "white" ? whiteKingHasCastled : blackKingHasCastled;
    const playerPawnHaveMoved = playerTurn === "white" ? whitePawnsHaveMoved : blackPawnsHaveMoved;
    const setPlayerPawnHaveMoved = playerTurn === "white" ? setWhitePawnHaveMoved : setBlackPawnsHaveMoved;
    const clickedCellInfo = getPlayerSettingOnCell(stoneIdx, whitePiecesPositions, blackPiecesPositions);
    const selectedPlayer = getSelectedPlayerInfo(selectedPlayerPosition, whitePiecesPositions, blackPiecesPositions);

    const getMoves = (piece) => piece ? getMovePath(piece, playerTurn, whitePiecesPositions, blackPiecesPositions, playerKingHasCastled, playerPawnHaveMoved) : [];

    
    if(selectedPlayerPosition === -1 || !selectedPlayer)
    {
        if(clickedCellInfo && clickedCellInfo.color === playerTurn)
        {
          setSelectedPlayerAvailableCells(getMoves(clickedCellInfo));
          setPlayerSelectedPiece(stoneIdx);
        }
        return;
    }

    if(selectedPlayerPosition === stoneIdx) {
      setPlayerSelectedPiece(-1);
      setSelectedPlayerAvailableCells([]);
      return;}
    
    // if(!selectedPlayer) return;
    const movePath = getMoves(selectedPlayer);
    setSelectedPlayerAvailableCells(movePath);

    if(movePath.includes(stoneIdx))
    {
        setPlayerPiecesPositions((prev: PieceIndexType[]) => {
            return prev.map((piece) => piece.idx === selectedPlayerPosition ? {...piece, idx: stoneIdx} : piece)});
            
        if(selectedPlayer.pieceType === "pawn")
        {
            setPlayerPawnHaveMoved((prev: pawnsInitialStateType) => prev.id === selectedPlayer.id ? {...prev, hasMovedBefore: true} : prev);
        }
            
        setPlayerTurn(prev => prev ==="white" ? "black" : "white");
        setPlayerSelectedPiece(-1);
        setSelectedPlayerAvailableCells([]);
    } else {
        if(clickedCellInfo && clickedCellInfo.color === playerTurn)
        {
            setPlayerSelectedPiece(stoneIdx);
            setSelectedPlayerAvailableCells(getMoves(clickedCellInfo));
        } else console.log("invalid move");
    }
    
  }

  const isValidTarget = selectedPlayerAvailableCells.includes(stoneIdx);
  const isSelected = selectedPlayerPosition === stoneIdx;

  // Determine Color
  let finalColorClass = "";
  const whiteColor = "dark:bg-gray-500 bg-linear-to-r from-gray-200 to-gray-400 border-gray-400";
  const blackColor = "dark:bg-black bg-linear-to-b from-gray-700 to-gray-900 border-gray-900 text-white"
  const defaultColor = color === "white" ? whiteColor : blackColor;
  if (isSelected) {
    finalColorClass = "bg-yellow-500 border-yellow-700";
  } else if (isValidTarget) {
    // Check if it's a capture (has enemy piece) or just a move (empty)
    if (playerSettingOnCell) {
       finalColorClass = `${defaultColor} border-mint-500 border-4 border-solid`; // Capture
    } else {
       finalColorClass = `${defaultColor} border-mint-500 border-4 border-solid`; // Move
    }
  } else {
    // Default Board Colors
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