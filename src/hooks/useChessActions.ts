import { useContext } from "react";
import { ChessGameContext } from "../contexts/ChessGameContext";
import { pawnsInitialStateType, PieceIndexType } from "../types/ChessGame/ChessGameTypes";

export function useChessActions()
{
    const {  setWhitePiecesPositions,
         setBlackPiecesPositions,
         setWhitePawnHaveMoved,
         setBlackPawnsHaveMoved,
         setPlayerTurn,
        setSelectedPlayerAvailableCells,
        setWhiteSelectedPiece,
        setBlackSelectedPiece} = useContext(ChessGameContext);

        function executeMove(selectedPiece: PieceIndexType, targetIdx: number, clickedCellInfo: PieceIndexType | null)
        {
            const isWhite = selectedPiece.color === "white";
            const playerPiecesPositionsSetter = isWhite ? setWhitePiecesPositions : setBlackPiecesPositions;
            const opponentPiecesPositionsSetter = isWhite ? setBlackPiecesPositions : setWhitePiecesPositions;
            const playerPawnHaveMovedSetter = isWhite ? setWhitePawnHaveMoved : setBlackPawnsHaveMoved;
            const selectedPieceSetter = isWhite ? setWhiteSelectedPiece : setBlackSelectedPiece;
            
            playerPiecesPositionsSetter((prev: PieceIndexType[]) => {
            return prev.map((piece) => piece.idx === selectedPiece.idx ? {...piece, idx: targetIdx} : piece)});

            if(clickedCellInfo && selectedPiece.color !== clickedCellInfo)
            {
                opponentPiecesPositionsSetter(prev => prev.filter(item => item.idx !== targetIdx));
            }

            if(selectedPiece.pieceType === "pawn")
            {
            playerPawnHaveMovedSetter((prev: pawnsInitialStateType[]) => {
                return prev.map((pawn) => pawn.id === selectedPiece.id ? {...pawn, hasMovedBefore: true} : pawn);
            })
            }
            //  else
                //  if (selectedPiece.pieceType === "king" && Math.abs(targetIdx - selectedPiece.idx) === 2) {
                // Move the Rook too...
                // setMyPieces(prev => prev.map(p => {
                    // if (p.pieceType === "rook" && /* logic to find correct rook */) {
                        // return { ...p, idx: /* new rook idx */ };
                    // }
                    // return p;
                // }));
            // }

            // if(selectedPiece.pieceType === "knight")
            // {

            // }

            setPlayerTurn(prev => prev === "white" ? "black" : "white");
            selectedPieceSetter(-1);
            setSelectedPlayerAvailableCells([]);

            
        }
    return {executeMove};
}