import { PieceIndexType, selectedPlayerAvailableCellType } from "../../types/ChessGame/ChessGameTypes";

export function getKnightMoves(
    piece: PieceIndexType,
    playerTurn: string,
    whitePiecesPositions: PieceIndexType[],
    blackPiecesPositions: PieceIndexType[]
)
{
    let movesPath: selectedPlayerAvailableCellType[];
    const directions: number[] = [-10, +10, -15, +15];

    const selectedPiecePosition: PieceIndexType = piece.idx;

    const playerPiecesPositions = playerTurn === "white" ? whitePiecesPositions : blackPiecesPositions;
    const opponentPiecesPositions = playerTurn === "white" ? blackPiecesPositions : whitePiecesPositions;

    const playerPiecesPositions_Positions = playerPiecesPositions.map(item => item.idx);
    const opponentPiecesPositions_Positions = opponentPiecesPositions.map(item => item.idx);

    directions.forEach(idx => {
        const newMove = {idx: -1, moveType: "none"};
        if(!playerPiecesPositions_Positions.includes(idx) && !opponentPiecesPositions_Positions.includes(idx))
        {
            newMove.idx = idx;
            newMove.moveType = "normal";
        } else if(opponentPiecesPositions_Positions.includes(idx))
        {
            newMove.idx = idx;
            newMove.moveType = "capture";
        }
        movesPath.push(newMove);
    })

    return movesPath;
}