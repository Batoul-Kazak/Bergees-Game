import { useState, useContext } from 'react'
import { BargeesGameContext } from '../../contexts/BargeesGameContext';

export default function GameOptions() {
    const {
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
        setPlayerCurrentCarryScore
    } = useContext(BargeesGameContext);
    const optionButtonText = gameState === "idle" ? "Start" : gameState === "waiting" ? "Shake and Throw" : gameState == "playing" ? "..." : "Play Again";
    const instructionText = gameState === "idle" ? "Press the button and start playing" :
        gameState === "waiting" ? (`${playerTurn} play`) : gameState == "playing" ? (`${playerTurn} is playing...`) : "Player 1 has Won!";

    function handleMove() {
        if (gameState == "idle") { setGameState("waiting"); return; }
        if (gameState == "waiting") {
            setGameState("playing");
        }
    }

    return (
        <div className="w-75 rounded-2xl pb-5 bg-wood-500 flex items-center flex-col justify-center">
            <h1 className="font-bold rounded-tr-2xl rounded-tl-2xl bg-wood-700 w-full py-4 text-xl text-center">Bergees Game</h1>
            <h2 className="py-4 font-bold">Stones Value: {stonesValue || "none"}</h2>
            <h3 className="py-2 font-bold">Game State: {gameState}</h3>
            <div className="p-4 flex justify-around  w-full">
                <PlayerInfo player="player1" playerActiveElements={player1ActiveElements}
                    setPlayerActiveElements={setPlayer1ActiveElements} playerCurrentScore={playerCurrentScore} />
                <div className="h-50 w-1 bg-wood-700"></div>
                <PlayerInfo player="player2" playerActiveElements={player2ActiveElements}
                    setPlayerActiveElements={setPlayer2ActiveElements} playerCurrentScore={playerCurrentScore} />
            </div>
            <button
                onClick={handleMove}
                className="bg-mint-500 border-2 font-bold border-mint-700 py-2 px-6 rounded-2xl">{optionButtonText}</button>
        </div>
    )
}

function PlayerInfo({
    player,
    playerActiveElements,
    // setPlayerActiveElements,
    playerCurrentScore,
    playerCurrentCarryScore
}) {
    const {
        playerTurn,
        setPlayerTurn
    } = useContext(BargeesGameContext);

    return <section className="font-semibold">
        <div className="flex gap-5  items-center pb-5 font-bold underline text-center">{player}
            {/* <div className="w-5 rounded-full border-2 border-green-700 h-5 bg-green-500"></div> */}
        </div>
        <div className="border-b-2 border-black-500 pt-2">Current Score: <span className="text-blue-700">{playerCurrentScore}</span> </div>
        <div className="border-b-2 border-black-500 pt-2">Current Carry Score: <span className="text-red-700">{playerCurrentCarryScore}</span></div>
        <div className="border-b-2 border-black-500 pt-2"> Turn:<span className={`${playerTurn == player ? "text-green-800" : "text-black-500"}`}> {playerTurn == player ? "yes" : "no"}</span></div>
        <div className="border-b-2 border-black-500 pt-2">Alive Pieces: <span className="font-normal">{playerActiveElements}</span></div>
        <div className="border-b-2 border-black-500 pt-2">Inactive Pieces: <span className="font-normal">{4 - playerActiveElements}</span></div>

    </section>
}