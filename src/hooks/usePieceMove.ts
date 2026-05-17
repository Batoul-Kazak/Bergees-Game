import { calculatePathCost } from './calculatePathCost';
import { useContext } from 'react';
import { PATH_1_INDICES, PATH_2_INDICES } from '../utils/pathUtils';
import { BargeesGameContext } from '../contexts/BargeesGameContext';
import { useSelectedPiece } from './useSelectedPiece';


// later i'll make when click on dust, binj,...etc user has so the selected piece moves forward according to value clicked

export function usePieceMove()
{
     function getAvailableSquaresWithCost()
    {
    const {availableMoves, playerTurn, selectedPieceIndex} = useContext(BargeesGameContext);
    const {getSelectedPieceIndex} = useSelectedPiece();
    
    const SELECTED_PIECE_POSITION = getSelectedPieceIndex();
    const START_INDEX = playerTurn === "player1" ? PATH_1_INDICES.indexOf(SELECTED_PIECE_POSITION): PATH_2_INDICES.indexOf(SELECTED_PIECE_POSITION);
    
    const availableSquares = []; // e.g.[{squareNumber: 234, cost: "10"}] //10 means dust without carry
    
    availableMoves.forEach(score => {
        if(!selectedPieceIndex || selectedPieceIndex === -1) return;

        const value = score[0]; //dust [10]
        const carryValue = score[0]; // dust [1]
        
        const TARGET_CELL_IDX_1 = START_INDEX + value;
        const TARGET_CELL_IDX_2 = START_INDEX + carryValue;
        const END_INDEX_1 = playerTurn === "player1" ? PATH_1_INDICES.indexOf(TARGET_CELL_IDX_1) : PATH_2_INDICES.indexOf(TARGET_CELL_IDX_1);
        const END_INDEX_2 = playerTurn === "player1" ? PATH_1_INDICES.indexOf(TARGET_CELL_IDX_2) : PATH_2_INDICES.indexOf(TARGET_CELL_IDX_2);
        
        const newValue1 = {};
        const newValue2 = {};

        if(END_INDEX_1 === END_INDEX_2) {newValue1 = {squareIdx: END_INDEX_1, cost: value}; availableSquares.push(newValue1) }
        else {
            newValue1 = {squareIdx: END_INDEX_1, cost: value};
            newValue2 = {squareIdx: END_INDEX_2, cost: carryValue};

            availableSquares.push(newValue1);
            availableSquares.push(newValue2);
        }
    });
    return availableSquares;
}
return {getAvailableSquaresWithCost};
}