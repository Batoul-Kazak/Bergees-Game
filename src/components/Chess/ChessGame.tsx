import React, { useState } from 'react'
import ChessBoard from './ChessBoard';
import { ChessGameContext } from '../../contexts/ChessGameContext';
import { BlackPiecesInitialPositions, pawnsInitialState, WhitePiecesInitialPositions } from '../../constants/ChessGame/PiecesInitialIndicies';

type moveTypeType = "capture" | "promotion" | "normal" | "castling"; 

type selectedPlayerAvailableCellType = {
    idx: number,
    moveType: moveTypeType
};

export default function ChessGame() {

  const [whitePiecesPositions, setWhitePiecesPositions] = useState(WhitePiecesInitialPositions);
  const [blackPiecesPositions, setBlackPiecesPositions] = useState(BlackPiecesInitialPositions);
  const [whiteSelectedPiece, setWhiteSelectedPiece] = useState(-1);
  const [blackSelectedPiece, setBlackSelectedPiece] = useState(-1);
  const [whitePawnsHaveMoved, setWhitePawnHaveMoved] = useState(pawnsInitialState);
  const [blackPawnsHaveMoved, setBlackPawnsHaveMoved] = useState(pawnsInitialState);
  const [whiteKingHasCastled, setWhiteKingHasCastled] = useState(false);
  const [blackKingHasCastled, setBlackKingHasCastled] = useState(false);
  const [playerTurn, setPlayerTurn] = useState("white");
  const [selectedPlayerAvailableCells, setSelectedPlayerAvailableCells] = useState<selectedPlayerAvailableCellType[]>([]);

  return (
    <ChessGameContext.Provider value={{
      whitePiecesPositions, 
      setBlackPiecesPositions,
      blackPiecesPositions,
      setWhitePiecesPositions,
      whiteSelectedPiece,
      setWhiteSelectedPiece,
      blackSelectedPiece,
      setBlackSelectedPiece,
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
    }}>
      <ChessBoard />
    </ChessGameContext.Provider>
  )
}
