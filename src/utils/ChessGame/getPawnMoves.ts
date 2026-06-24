import {
  pawnsInitialStateType,
  PieceIndexType,
  selectedPlayerAvailableCellType,
} from "../../types/ChessGame/ChessGameTypes";

export function getPawnMoves(
  selectedPlayer: PieceIndexType,
  playerTurn: string,
  whitePiecesPositions: PieceIndexType[],
  blackPiecesPositions: PieceIndexType[],
  playerPawnHasMoved: pawnsInitialStateType[],
) {
  let movePath: selectedPlayerAvailableCellType[] = [];
  const pawnStatus = playerPawnHasMoved.find(
    (pawn) => pawn.id === selectedPlayer.id,
  );
  const hasMoved = pawnStatus?.hasMovedBefore;
  const isWhite = playerTurn === "white";
  const direction = isWhite ? -8 : 8;

  const oneStepIdx = selectedPlayer.idx + direction;
  if (oneStepIdx >= 0 && oneStepIdx < 64) {
    const isBlocked_1 = [...whitePiecesPositions, ...blackPiecesPositions].some(
      (item) => item.idx === oneStepIdx,
    );
    if (!isBlocked_1) {
      movePath.push({ idx: oneStepIdx, moveType: "normal" });
      if (!hasMoved) {
        const twoStepsIdx = selectedPlayer.idx + direction * 2;
        const isBlocked_2 = [
          ...whitePiecesPositions,
          ...blackPiecesPositions,
        ].some((item) => item.idx === twoStepsIdx);
        if (twoStepsIdx >= 0 && twoStepsIdx < 64 && !isBlocked_2)
          movePath.push({ idx: twoStepsIdx, moveType: "normal" });
      }
    }
  }

  const captureOffset = isWhite ? [-9, -7] : [7, 9];
  captureOffset.forEach((item) => {
    const targetIdx = selectedPlayer.idx + item;
    if (targetIdx >= 0 && targetIdx < 64) {
      const opponents = isWhite ? blackPiecesPositions : whitePiecesPositions;
      const opponentPiece = opponents.find((item) => item.idx === targetIdx);
      if (opponentPiece) {
        movePath.push({ idx: targetIdx, moveType: "capture" });
      }
    }
  });
  return movePath;
}
