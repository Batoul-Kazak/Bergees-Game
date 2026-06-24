import { PieceIndexType, selectedPlayerAvailableCellType } from "../../types/ChessGame/ChessGameTypes";

export function getRookMoves(
    piece: PieceIndexType,
    playerTurn: string,
    whitePiecesPositions: PieceIndexType[],
    blackPiecesPositions: PieceIndexType[]
)
{ 
    const movesPath: selectedPlayerAvailableCellType[] = [];
    const playerPiecesPositions = playerTurn === "white" ? whitePiecesPositions : blackPiecesPositions;
    const opponentPiecesPositions = playerTurn === "white" ? blackPiecesPositions : whitePiecesPositions;

    const playerPiecesPositions_pos = playerPiecesPositions.map(item => item.idx);
    const opponentPiecesPositions_pos = opponentPiecesPositions.map(item => item.idx);

    const directions = [-8, +8, -1, +1];

    directions.forEach(dir => {
        for(let i = 1; i<= 8; i++)
        {
            const newMove = piece.idx + dir * i;
            const currentCol = piece.idx % 8;
            const targetCol = newMove % 8;

            const currentRow = piece.idx / 8;
            const targetRow = newMove / 8;

            // const currentRow = piece.idx;

            if((dir === -1) && targetCol > currentCol) break;
            if((dir === 1) && targetCol < currentCol) break;

            if(dir === -8 && targetRow > currentRow) break;
            if(dir === 8 && targetRow < currentRow) break;

            if(newMove >= 64 || newMove < 0) break;
            
                if(playerPiecesPositions_pos.includes(newMove)) break;
                else if(opponentPiecesPositions_pos.includes(newMove))
                {
                    movesPath.push({idx: newMove, moveType: "capture"});
                    break;
                } else {
                        movesPath.push({idx: newMove, moveType: "normal"});
                }
        }
    })   
    console.log(movesPath)
    return movesPath; 
}

