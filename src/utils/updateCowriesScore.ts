//broken function logic
export function updateCowriesScore() {
    if (lastAvailableStoneClickedPosition === -1) return;

    const START_IDX = selectedPieceIndex;

    const UPDATED_CURRENT_PLAYER_SCORE = availableMoves;
    const UPDATED_PLAYER_COWRIES_SCORE = availableMoveNames;

    availableMoves.forEach((item, idx) => {
      //item [10, 1], [24, 1], [6, 0], [4, 0]
      const val = item[0]; //10
      const carryVal = item[1]; //1

      const availableMoveNames_item = convertCowriesType("array", item[idx]); //dust binj

      const TARGET_1 = START_IDX + val;
      const TARGET_2 = START_IDX + carryVal;
      const TARGET_3 = START_IDX + val + carryVal;
      const distance1 = TARGET - START_IDX;
      const distance2 = TARGET - START_IDX;
      const distance3 = TARGET - START_IDX;

      COWRIE_VALUES.forEach((cowrie) => {
        if (availableMoveNames_item === cowrie.cowriesName) {
          let res = [];
          if (TARGET_1 === distance1) {
            res = UPDATED_CURRENT_PLAYER_SCORE.map((item, i) =>
              i === idx ? [0, 1] : item,
            );
          } else if (TARGET_2 === distance2) {
            res = UPDATED_CURRENT_PLAYER_SCORE.map((item, i) =>
              i === idx ? [val, 0] : item,
            );
          } else if (TARGET_3 === distance3) {
            res = UPDATED_CURRENT_PLAYER_SCORE.filter((item, i) => i !== idx);
          }
        }
        return res;
      });
    });

    return [UPDATED_CURRENT_PLAYER_SCORE, UPDATED_PLAYER_COWRIES_SCORE];
}