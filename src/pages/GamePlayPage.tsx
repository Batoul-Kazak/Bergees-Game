import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import BargeesGame from "../components/Bargees/BargeesGame";
import ChessGame from "../components/Chess/ChessGame";
import MemoryGame from "../components/MemoryGame/MemoryGame";
import CheckersGame from "../components/Checkers/CheckersGame";


export default function GamePlayPage() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const gameComponents: Record<string, React.ComponentType> = {
    bergees: BargeesGame,
    chess: ChessGame,
    checkers: CheckersGame,
    memoryGame: MemoryGame,
  };

  const GameComponent = gameComponents[gameId || ""];

  if (!GameComponent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
        <button 
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 transition-colors"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-black text-gray-900 dark:text-gray-100">
      <div className="p-4">
        <button 
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          ← Back to Menu
        </button>
      </div>
      
      <GameComponent />
    </div>
  );
}