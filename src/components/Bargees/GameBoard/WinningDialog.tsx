import React, { useContext } from 'react'
import { BargeesGameContext } from '../../../contexts/BargeesGameContext';

export default function WinningDialog() {
    const {message,
      setGameState,
      setPlayer1ActiveElements,
      setPlayer2ActiveElements,
      setPlayerTurn,
      setAvailableMoves,
      setSelectedPieceIndex,
      setPlayer1WonPieces,
      setPlayer2WonPieces,
      setIsShowCreationDialog,
      setDialogAction,
      setCowriesGrid,
      setPlayer1PiecesIndices,
      setPlayer2PiecesIndices,
      setMessage,
      setHasWon,
      playersTotalScore,
      setPlayerTotalScore,
      playerTurn
    } = useContext(BargeesGameContext);

  function handleRestartGame()
  {
    setGameState("idle");
    setPlayer1ActiveElements(0);
    setPlayer2ActiveElements(0);
    setPlayerTurn("player1");
    setAvailableMoves([]);
    setSelectedPieceIndex(-1);
    setPlayer1WonPieces(0);
    setPlayer2WonPieces(0);
    setIsShowCreationDialog(false);
    setDialogAction(null);
    setCowriesGrid([]);
    setPlayer1PiecesIndices([0,0,0,0]);
    setPlayer2PiecesIndices([0,0,0,0]);
    setMessage("");
    setHasWon(false);

    const player1TotalScore = playersTotalScore[0];
    const player2TotalScore = playersTotalScore[1];
    const newScore = (playerTurn === "player1" ? [player1TotalScore +1, player2TotalScore] : [player1TotalScore, player2TotalScore+1]);
    setPlayerTotalScore(newScore);
  }

  return (
    <div className="bg-wood-700 flex flex-col justify-between gap-8 items-center z-100 p-10 rounded-2xl absolute top-[50%] left-[50%] translate-x-[-50%]">
      <p className="text-xl">{message}</p>
      <div className="flex justify-center w-full">
        <button
          onClick={handleRestartGame}
          className="rounded-2xl bg-wood-500 px-4 py-2 text-black-500 font-bold border-2 border-mint-700"
        >
         Play Again
        </button>
      </div>
    </div>
  )
}
