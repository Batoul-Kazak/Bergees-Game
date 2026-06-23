import { pawnsInitialStateType, PieceIndexType, selectedPlayerAvailableCellType } from "../../types/ChessGame/ChessGameTypes";

export function getPawnMoves(
    selectedPlayer: PieceIndexType,
    playerTurn: string,
    whitePiecesPositions: PieceIndexType[],
    blackPiecesPositions: PieceIndexType[],
    playerPawnHasMoved: pawnsInitialStateType[],
    setBlackPiecesPositions,
    setWhitePiecesPositions
)

{
     let movePath: selectedPlayerAvailableCellType[] = [];
    const pawnStatus = playerPawnHasMoved.find((pawn: pawnsInitialStateType) => pawn.id === selectedPlayer.id);
        // const pawnMaxSteps = selectedPlayer.id === playerPawnsHaveMoved.id ? (playerPawnsHaveMoved.hasMovedBefore ? 1 : 2) : -1;
        const hasMoved = pawnStatus?.hasMovedBefore;

        if(playerTurn === "white")
        {
            movePath.push({idx: selectedPlayer.idx - 8, moveType: "normal"});

            if(!hasMoved && selectedPlayer.idx >=48 && selectedPlayer.idx <= 58)
                movePath.push({idx: selectedPlayer.idx - 16, moveType: "normal"});
        } else {
            movePath.push({idx: selectedPlayer.idx + 8, moveType: "normal"});

            if(!hasMoved && selectedPlayer.idx >= 8 && selectedPlayer.idx <= 15)
                movePath.push({idx: selectedPlayer.idx + 16, moveType: "normal"});
        }

        const opponentPiecesPositions = playerTurn === "white" ? blackPiecesPositions : whitePiecesPositions;
        const setOpponentPiecesPositions = playerTurn === "white" ? setBlackPiecesPositions : setWhitePiecesPositions;
        const sign = playerTurn === "white" ? -1 : +1;
        const isOpponent_Threatened_1 = opponentPiecesPositions.find((item: selectedPlayerAvailableCellType) => (item.idx === selectedPlayer.idx + 7 * sign))
        const isOpponent_Threatened_2 = opponentPiecesPositions.find((item: selectedPlayerAvailableCellType) => (item.idx === selectedPlayer.idx + 9 * sign))


        if(isOpponent_Threatened_1) {
            movePath.push({idx: isOpponent_Threatened_1.idx, moveType: "capture"})
            
            setOpponentPiecesPositions(prev => {
                if(prev.idx === selectedPlayer.idx + 7 * sign) {
                const killedPiece = {id: prev.id, idx: -1, color: !playerTurn, pieceType: "pawn"}
                return killedPiece;
            } else
                 return prev;
            });
        };
        
        if(isOpponent_Threatened_2) {
            movePath.push({idx: isOpponent_Threatened_2.idx, moveType: "capture"})

             setOpponentPiecesPositions((prev: PieceIndexType) => {
                if(prev.idx === selectedPlayer.idx + 9 * sign) {
                const killedPiece = {id: prev.id, idx: -1, color: !playerTurn, pieceType: "pawn"}
                return killedPiece;
            } else
                 return prev;
            });

        };
        
    // return movePath.filter(item => item.idx > 0 && item.idx < 64);
    return movePath;
}