export type PieceIndexType = {id: string, idx: number, color: string, pieceType: string};

export type pawnsInitialStateType = {id: string, hasMovedBefore: boolean};

type moveTypeType = "capture" | "promotion" | "normal" | "castling"; 

export type selectedPlayerAvailableCellType = {
    idx: number,
    moveType: moveTypeType
};