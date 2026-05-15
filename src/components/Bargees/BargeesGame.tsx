import React from 'react'
import { useState } from 'react'
import { BargeesGameContext } from '../../contexts/BargeesGameContext';
import GameOptions from './GameOptions';
import BargeesMainBoard from './GameBoard/BargeesMainBoard';
import CreationDialog from './GameBoard/CreationDialog';

export default function BargeesGame() {
    const GRID_SIZE = 19;
    const [boardPieces, setBoardPieces] = useState<number | null[]>(Array(GRID_SIZE * GRID_SIZE).fill(null));

    const [gameState, setGameState] = useState("idle"); //playing | finished | waiting | idle
    const [player1ActiveElements, setPlayer1ActiveElements] = useState(0);
    const [player2ActiveElements, setPlayer2ActiveElements] = useState(0);
    const [playerTurn, setPlayerTurn] = useState("player1");
    const [currentCowriesValue, setCurrentCowriesValue] = useState(); //dust, binj, shakeh, barah, two, three, four 

    const [playerCowriesScore, setPlayerCowriesScore] = useState([]); ////dust, binj, shakeh, barah, two, three, four 

    //REMOVE THIS NO LONGER NEEDED
    const [playerCowriesCarryScore, setPlayerCowriesCarryScore] = useState(0);

    const [selectedPieceIndex, setSelectedPieceIndex] = useState(-1);
    const [Player1WonPieces, setPlayer1WonPieces] = useState(0);
    const [Player2WonPieces, setPlayer2WonPieces] = useState(0);

    const [isShowCreationDialog, setIsShowCreationDialog] = useState(false);
    const [dialogAction, setDialogAction] = useState(null);
    const [cowriesGrid, setCowriesGrid] = useState([]);
    
    // const [globalBoard, setGlobalBoard] = useState<string | null[]>(Array(24).fill(null));

    return (
        <div className="rounded-3xl border-2 border-double 
                flex justify-evenly w-screen h-screen items-center  relative md:flex-col lg:flex-row
            ">
            <BargeesGameContext.Provider value={{
                player1ActiveElements,
                setPlayer1ActiveElements,
                player2ActiveElements,
                setPlayer2ActiveElements,
                playerTurn,
                setPlayerTurn,
                currentCowriesValue,
                setCurrentCowriesValue,
                gameState,
                setGameState,
                playerCowriesScore,
                setPlayerCowriesScore,
                playerCowriesCarryScore,
                setPlayerCowriesCarryScore,
                selectedPieceIndex,
                setSelectedPieceIndex,
                dialogAction,
                setDialogAction,
                setPlayer1WonPieces,
                Player1WonPieces,
                setPlayer2WonPieces,
                Player2WonPieces,
                boardPieces,
                setBoardPieces,
                cowriesGrid,
                setCowriesGrid,
                setIsShowCreationDialog
            }}
            >

                <div className="flex-shrink-0 z-0">
                    <BargeesMainBoard />
                </div>
                <div className="flex-shrink-0 z-0">
                    <GameOptions />
                </div>

                {isShowCreationDialog &&
                    <>
                        <div className="bg-black-700/70 z-70 absolute top-0 left-0 w-screen h-screen"></div>
                        <CreationDialog />
                    </>
                }
            </BargeesGameContext.Provider>
        </div>
    )
}

{/* <div className="h-[100px] w-[100px] bg-gray-700 absolute -top-10 left-20"></div> */ }
{/* <NavBar /> */ }