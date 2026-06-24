import { useCallback, useContext } from "react";
import { ChessGameContext } from "../contexts/ChessGameContext";
import {  PieceIndexType, selectedPlayerAvailableCellType } from "../types/ChessGame/ChessGameTypes";
import { getPawnMoves } from "../utils/ChessGame/getPawnMoves";

export function useMovePath()
{
    const {
            playerTurn,
            whitePiecesPositions,
            blackPiecesPositions,
            whitePawnsHaveMoved,
            blackPawnsHaveMoved
        } = useContext(ChessGameContext);

    const getMovesPath = useCallback((selectedPlayer: PieceIndexType | null) : selectedPlayerAvailableCellType[] => {
        if(!selectedPlayer || !selectedPlayer.color || playerTurn !== selectedPlayer.color) return [];

        const isWhitePlayer = playerTurn === "white";
        const playerPawnHasMoved = isWhitePlayer ? whitePawnsHaveMoved : blackPawnsHaveMoved;

        let moves: selectedPlayerAvailableCellType[] = [];
        switch(selectedPlayer.pieceType)
        {
            case "pawn": moves = getPawnMoves(
                selectedPlayer,
                playerTurn,
                whitePiecesPositions,
                blackPiecesPositions,
                playerPawnHasMoved); break;
            case "queen": break;
            case "king": break;
            case "knight": break;
            case "rook": break;
            case "bishop": break;
        }
        return moves.filter(item => item.idx >= 0 && item.idx <= 63);
    }, [playerTurn, whitePawnsHaveMoved, blackPawnsHaveMoved, whitePiecesPositions, blackPiecesPositions]);
    return {getMovesPath};
}
