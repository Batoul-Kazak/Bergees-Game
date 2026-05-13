import React from 'react'
import { useState } from 'react'
import { BargeesGameContext } from '../../contexts/BargeesGameContext';
import GameOptions from './GameOptions';
import BargeesMainBoard from './GameBoard/BargeesMainBoard';

export default function BargeesGame() {
    const [gameState, setGameState] = useState("idle"); //playing | finished | waiting | idle
    const [player1ActiveElements, setPlayer1ActiveElements] = useState(0);
    const [player2ActiveElements, setPlayer2ActiveElements] = useState(0);
    const [playerTurn, setPlayerTurn] = useState("player1");
    const [stonesValue, setStonesValue] = useState([]); //[12,0] [6,0] [24,0] [10,1] [4,0] [3,0] [2,0] 
    const [playerCurrentScore, setPlayerCurrentScore] = useState(0);
    const [playerCurrentCarryScore, setPlayerCurrentCarryScore] = useState(0);
    const [selectedPieceIndex, setSelectedPieceIndex] = useState(-1);

    const [globalBoard, setGlobalBoard] = useState<string | null[]>(Array(24).fill(null));

    return (
        <div className="w-screen rounded-3xl h-130 border-2 border-double 
                flex justify-evenly items-center 
            ">
            <BargeesGameContext.Provider value={{
                player1ActiveElements,
                setPlayer1ActiveElements,
                player2ActiveElements,
                setPlayer2ActiveElements,
                playerTurn,
                setPlayerTurn,
                stonesValue,
                setStonesValue,
                gameState,
                setGameState,
                playerCurrentScore,
                setPlayerCurrentScore,
                playerCurrentCarryScore,
                setPlayerCurrentCarryScore,
                selectedPieceIndex,
                setSelectedPieceIndex,
                globalBoard,
                setGlobalBoard
            }}
            >
                <GameOptions />
                <BargeesMainBoard />
            </BargeesGameContext.Provider>
        </div>
    )
}

{/* <div className="h-[100px] w-[100px] bg-gray-700 absolute -top-10 left-20"></div> */ }
{/* <NavBar /> */ }