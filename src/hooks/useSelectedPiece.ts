import { useContext } from 'react';
import { BargeesGameContext } from '../contexts/BargeesGameContext';
export function useSelectedPiece()
{
    const {selectedPieceIndex, playerTurn, player1PieceIndices, player2PieceIndices} = useContext(BargeesGameContext);

    const getSelectedPieceCellId = () => {

        if(getSelectedPieceIndex === -1 || getSelectedPieceIndex === null)return -1;
        
        const [player, pieceIdStr] = selectedPieceIndex.split('-');
        const pieceId = parseInt(pieceIdStr);
        
        const indiesArray = playerTurn === "player1" ? player1PieceIndices : player2PieceIndices;
        
        return indiesArray[pieceId];
    };

    return {getSelectedPieceCellId};
}