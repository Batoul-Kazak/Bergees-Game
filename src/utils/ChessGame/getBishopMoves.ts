import { PieceIndexType, selectedPlayerAvailableCellType } from "../../types/ChessGame/ChessGameTypes";

export function getBishopMoves(
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

    const directions = [-9, -7, 7, 9];

    directions.forEach(dir => {
        for(let i = 1; i<= 8; i++)
        {
            const newMove = piece.idx + dir * i; 
            const currentCol = piece.idx % 8;
            const targetCol = newMove % 8;

            if((dir === -9 || dir === 7) && targetCol > currentCol) 
                break;
            
            if((dir === 9 || dir === -7) && targetCol < currentCol)
                 break;
            

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

