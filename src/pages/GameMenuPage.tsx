import React from "react";
import { Link } from "react-router-dom";
import { useSettings } from "../contexts/SettingContext";

interface Game {
  id: string;
  name: string;
  description: string;
  image: string;
  unlocked: boolean;
}

const gamesData: Game[] = [
  { id: "bergees", name: "Bergees", description: "Classic strategy board game.", image: "https://placehold.co/600x400/10b981/ffffff?text=Bargees", unlocked: true },
  { id: "chess", name: "Chess", description: "The ultimate game of kings.", image: "https://placehold.co/600x400/3b82f6/ffffff?text=Chess", unlocked: true },
  { id: "checkers", name: "checkers", description: "Traditional checkers variant.", image: "https://placehold.co/600x400/8b5cf6/ffffff?text=checkers", unlocked: true },
  { id: "memoryGame", name: "Memory Game", description: "Test your memory skills.", image: "https://placehold.co/600x400/f59e0b/ffffff?text=Memory+Game", unlocked: true },
  { id: "diamondRush", name: "Diamond Rush", description: "Match gems to win big.", image: "https://placehold.co/600x400/6b7280/ffffff?text=Diamond+Rush", unlocked: false },
  { id: "freeCell", name: "FreeCell", description: "Solitaire card game.", image: "https://placehold.co/600x400/6b7280/ffffff?text=FreeCell", unlocked: false },
  { id: "moveTheBlock", name: "Move the Block Puzzle", description: "Slide blocks to solve.", image: "https://placehold.co/600x400/6b7280/ffffff?text=Block+Puzzle", unlocked: false },
];

export default function GamesMenuPage() {
  const { setActiveGame } = useSettings();

  return (
    <div className="h-screen flex flex-col items-center content-center w-screen p-6 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      <h1 className="text-5xl py-10 font-bold mb-8">Games</h1>
      
      <div className="grid w-[80%] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gamesData.map((game) => (
          <GameCard 
            key={game.id} 
            game={game} 
            onPlay={() => setActiveGame(game.id)}
          />
        ))}
      </div>
    </div>
  );
}

function GameCard({ game, onPlay }: { game: Game; onPlay: () => void }) {
  return (
    <div
      className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 flex flex-col
        bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700
        ${!game.unlocked ? "opacity-60 grayscale" : "hover:scale-[1.02] hover:shadow-xl"}
      `}
    >
      <div className="relative w-full h-40 overflow-hidden">
        <img 
          src={game.image} 
          alt={game.name} 
          className="w-full h-full object-cover"
        />
        {!game.unlocked && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white text-3xl">🔒</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-1">{game.name}</h3>
        <p className="text-sm mb-4 flex-grow text-gray-600 dark:text-gray-400">
          {game.description}
        </p>
        
        {game.unlocked ? (
          <Link to={`/games/${game.id}`} onClick={onPlay} className="w-full">
            <button className="w-full py-2.5 rounded-lg font-semibold text-sm bg-mint-500 text-white hover:bg-mint-600 shadow-md transition-colors">
              Play
            </button>
          </Link>
        ) : (
          <button disabled className="w-full py-2.5 rounded-lg font-semibold text-sm bg-gray-400 text-gray-200 cursor-not-allowed">
            Locked
          </button>
        )}
      </div>
    </div>
  );
}