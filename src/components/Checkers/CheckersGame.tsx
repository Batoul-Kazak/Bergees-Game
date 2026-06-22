import React, { useState } from 'react'
import CheckersBoard from './CheckersBoard';
import { initialDarkPiecesIndices, initialLightPiecesIndices } from '../../constants/CheckersGame/PiecesInitialIndicies';
import { CheckersGameContext } from '../../contexts/CheckersGameContext';

export default function CheckersGame() {
  const [darkPiecesIndices, setDarkPiecesIndices] = useState(initialDarkPiecesIndices);
  const [lightPiecesIndices, setLightPiecesIndices] = useState(initialLightPiecesIndices);
  const [selectedPiece, setSelectedPiece] = useState(-1);

  return (
    <CheckersGameContext.Provider value={{
      darkPiecesIndices, 
      setDarkPiecesIndices,
      lightPiecesIndices,
      setLightPiecesIndices,
      selectedPiece,
      setSelectedPiece
    }}>
    <div className="flex place-items-center place-content-center">
      <CheckersBoard />
    </div>
    </CheckersGameContext.Provider>
  );
}
