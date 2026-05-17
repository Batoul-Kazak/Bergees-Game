import { useContext } from 'react';
import { BargeesGameContext } from '../contexts/BargeesGameContext';


export function calculatePathCost(distance)
{
    const {playerTurn,
        availableMoveNames,
        setAvailableMoveNames,
        availableMoves,
        setAvailableMoves
     } = useContext(BargeesGameContext);

     const TOTAL_CURRENT_SCORE = 0;
     const TOTAL_CURRENT_CARRY_SCORE = 0;
     availableMoves.forEach(el => {
        TOTAL_CURRENT_SCORE += el[0];
        TOTAL_CURRENT_SCORE += el[1];
     });

     let result = TOTAL_CURRENT_SCORE - distance;
     if(result <0) {result = result + TOTAL_CURRENT_CARRY_SCORE; TOTAL_CURRENT_CARRY_SCORE = 0; } //totalCarryScore must edit here because it is wrong }

     const  UPDATED_CURRENT_PLAYER_SCORE = [result, TOTAL_CURRENT_CARRY_SCORE]
     setAvailableMoves(UPDATED_CURRENT_PLAYER_SCORE);
}

