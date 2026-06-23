import { pawnsInitialStateType, PieceIndexType, selectedPlayerAvailableCellType } from "../../types/ChessGame/ChessGameTypes";

export function getSelectedPlayerInfo(selectedPlayerPosition, whitePiecesPositions, blackPiecesPositions)
{
    const allPieces = whitePiecesPositions.concat(blackPiecesPositions);
    const playerInfo = allPieces.find((piece: PieceIndexType) => piece.idx === selectedPlayerPosition);
    console.log(playerInfo);
    return playerInfo;
}

export function getPieceType(stoneIdx: number, playerPiecesPositions: PieceIndexType[])
{
    let a = "none";
    playerPiecesPositions.forEach(item => {
        if(item.idx === stoneIdx) a = item.pieceType;
    });

    return a;
}

type PositionsProps = {
    whitePiecesPositions: PieceIndexType[],
    blackPiecesPositions: PieceIndexType[],
    stoneIdx: number
}

type MoveProps = Omit<PositionsProps, "stoneIdx"> & {
    playerTurn : string,
    selectedPlayer: PieceIndexType,
    playerPawnsHaveMoved: pawnsInitialStateType[]
}

export function getPlayerTypeAndPieceType(whitePiecesPositions, blackPiecesPositions, stoneIdx): PositionsType
{
    const allPieces = whitePiecesPositions.concat(blackPiecesPositions);
    const playerColor = allPieces.find(item => item.idx === stoneIdx)?.color ?? null;
    const pieceType = allPieces.find(item => item.idx === stoneIdx)?.pieceType ?? null;

    return [playerColor, pieceType];
}

export const getPlayerSettingOnCell = (stoneIdx, whitePiecesPositions, blackPiecesPositions):  PositionsProps => //returns -1 if no player
{
    const allPieces = whitePiecesPositions.concat(blackPiecesPositions);
    const player = allPieces.find(item => item.idx === stoneIdx);
    return player;
}

// export function getMovePath(selectedPlayer, playerTurn, whitePiecesPositions, blackPiecesPositions, playerKingHasCastled, playerPawnsHaveMoved, setBlackPiecesPositions,setWhitePiecesPositions)
// {
//     if(!selectedPlayer || !selectedPlayer.color) return [];

//     if(playerTurn !== selectedPlayer.color) return [];

//     let movePath: selectedPlayerAvailableCellType[] = [];
//     if(selectedPlayer.pieceType === "pawn")
//     {
//         movePath = getPawnPath(selectedPlayer, playerTurn, whitePiecesPositions, blackPiecesPositions, playerPawnsHaveMoved,setBlackPiecesPositions,setWhitePiecesPositions);
//     }
//     console.log(movePath);
//     return movePath.filter(item => item.idx > 0 && item.idx < 64);
// }

// function getPawnPath(
//     selectedPlayer,
//     playerTurn,
//     whitePiecesPositions,
//     blackPiecesPositions,
//     playerPawnsHaveMoved,
//     setBlackPiecesPositions,
//     setWhitePiecesPositions)
// {
//     let movePath: selectedPlayerAvailableCellType[] = [];
//     const pawnStatus = playerPawnsHaveMoved.find((pawn: pawnsInitialStateType) => pawn.id === selectedPlayer.id);
//         // const pawnMaxSteps = selectedPlayer.id === playerPawnsHaveMoved.id ? (playerPawnsHaveMoved.hasMovedBefore ? 1 : 2) : -1;
//         const hasMoved = pawnStatus?.hasMovedBefore;

//         if(playerTurn === "white")
//         {
//             movePath.push({idx: selectedPlayer.idx - 8, moveType: "normal"});

//             if(!hasMoved && selectedPlayer.idx >=48 && selectedPlayer.idx <= 58)
//                 movePath.push({idx: selectedPlayer.idx - 16, moveType: "normal"});
//         } else {
//             movePath.push({idx: selectedPlayer.idx + 8, moveType: "normal"});

//             if(!hasMoved && selectedPlayer.idx >= 8 && selectedPlayer.idx <= 15)
//                 movePath.push({idx: selectedPlayer.idx + 16, moveType: "normal"});
//         }

//         const opponentPiecesPositions = playerTurn === "white" ? blackPiecesPositions : whitePiecesPositions;
//         const setOpponentPiecesPositions = playerTurn === "white" ? setBlackPiecesPositions : setWhitePiecesPositions;
//         const sign = playerTurn === "white" ? -1 : +1;
//         const isOpponent_Threatened_1 = opponentPiecesPositions.find((item: selectedPlayerAvailableCellType) => (item.idx === selectedPlayer.idx + 7 * sign))
//         const isOpponent_Threatened_2 = opponentPiecesPositions.find((item: selectedPlayerAvailableCellType) => (item.idx === selectedPlayer.idx + 9 * sign))


//         if(isOpponent_Threatened_1) {
//             movePath.push({idx: isOpponent_Threatened_1.idx, moveType: "capture"})
            
//             setOpponentPiecesPositions(prev => {
//                 if(prev.idx === selectedPlayer.idx + 7 * sign) {
//                 const killedPiece = {id: prev.id, idx: -1, color: !playerTurn, pieceType: "pawn"}
//                 return killedPiece;
//             } else
//                  return prev;
//             });
//         };
        
//         if(isOpponent_Threatened_2) {
//             movePath.push({idx: isOpponent_Threatened_2.idx, moveType: "capture"})

//              setOpponentPiecesPositions(prev => {
//                 if(prev.idx === selectedPlayer.idx + 9 * sign) {
//                 const killedPiece = {id: prev.id, idx: -1, color: !playerTurn, pieceType: "pawn"}
//                 return killedPiece;
//             } else
//                  return prev;
//             });

//         };
        
//         return movePath.filter(item => item.idx > 0 && item.idx < 64);
// }