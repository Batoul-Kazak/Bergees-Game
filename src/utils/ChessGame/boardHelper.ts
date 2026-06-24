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
