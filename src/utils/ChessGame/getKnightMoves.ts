import { PieceIndexType, selectedPlayerAvailableCellType } from "../../types/ChessGame/ChessGameTypes";

export function getKnightMoves(
    piece: PieceIndexType,
    playerTurn: string,
    whitePiecesPositions: PieceIndexType[],
    blackPiecesPositions: PieceIndexType[]
)
{
    const movesPath: selectedPlayerAvailableCellType[] = [];
    const directions: number[] = [-10, +10, -15, +15, +6, -6, +17, -17];

    const playerPiecesPositions = playerTurn === "white" ? whitePiecesPositions : blackPiecesPositions;
    const opponentPiecesPositions = playerTurn === "white" ? blackPiecesPositions : whitePiecesPositions;

    const playerPiecesPositions_Positions = playerPiecesPositions.map(item => item.idx);
    const opponentPiecesPositions_Positions = opponentPiecesPositions.map(item => item.idx);

    directions.forEach(dir_ => {
        const newMove = piece.idx + dir_;
        if(!playerPiecesPositions_Positions.includes(newMove) && !opponentPiecesPositions_Positions.includes(newMove))
        {
            movesPath.push({idx: newMove, moveType: "normal"})
        } else if(opponentPiecesPositions_Positions.includes(newMove))
        {
            movesPath.push({idx: newMove, moveType: "capture"});
        }
    })

    return movesPath;
}