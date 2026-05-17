import { useContext, useEffect } from "react";
import { BargeesGameContext } from "../../contexts/BargeesGameContext";

import { COWRIE_VALUES } from "../../constants/CowrieValues";

export default function GameOptions() {
  const {
    player1ActiveElements,
    setPlayer1ActiveElements,
    player2ActiveElements,
    setPlayer2ActiveElements,
    playerTurn,
    setPlayerTurn,
    gameState,
    setGameState,
    playerCowriesScore,
    setPlayerCowriesScore,
     setCurrentPlayerScore,
currentPlayerScore,
    player1WonPieces,
    player2WonPieces,
    setCowriesGrid,
    setIsShowCreationDialog,
    isShowCreationDialog,
  } = useContext(BargeesGameContext);
  const optionButtonText =
    gameState === "idle"
      ? `${playerTurn} Start`
      : gameState === "shaking"
        ? "Shake and Throw"
        : gameState === "playing"
          ? "Move or Create"
          : ""; //or just play rather than Move or Create
  const canCreateElement =
    (gameState === "shaking" || gameState === "playing") &&
    (playerCowriesScore.includes("dust") ||
      playerCowriesScore.includes("binj"));

  function calculateCurrentPlayerScore()
  {
      let totalSum1 = 0;
      let totalSum2 = 0;
      playerCowriesScore.forEach(val => {
        const match = COWRIE_VALUES.find(obj => obj.cowriesName === val);
        if(match)
          {
            totalSum1 += match.actualValue[0];
            totalSum2 += match.actualValue[1];
          }
        });
      return [totalSum1, totalSum2];
  }

  function handleCowriesStringResult(frontSideStones) {
    if (frontSideStones === 6) return "shakeh";
    else if (frontSideStones === 0) return "bara";
    else if (frontSideStones === 5) return "dust";
    else if (frontSideStones === 1) return "binj";
    else if (frontSideStones === 2) return "four";
    else if (frontSideStones === 3) return "three";
    else if (frontSideStones === 4) return "two";
    else return "none"
  }

   function handleCowriesNumericResult(frontSideStones) {
    if (frontSideStones === 6) return [6, 0];
    else if (frontSideStones === 0) return [12,0];
    else if (frontSideStones === 5) return [10,1];
    else if (frontSideStones === 1) return [24,1];
    else if (frontSideStones === 2) return [4,0];
    else if (frontSideStones === 3) return [3,0];
    else if (frontSideStones === 4) return [2,0];
    else return [0,0];
  }

  function toArray(...elements) 
  {
      const arr = [];
      elements.forEach(el => {
        arr.push(el);
      })
      return arr;
  }

  function handleShakeAndThrow() {
    if (gameState === "playing") return;

    if (gameState === "idle") {
      setGameState("shaking");
      return;
    }

      const frontSideCowries = Math.floor(Math.random() * 7);
      const backSideCowries = 6 - frontSideCowries;

      const cowries = [
        ...Array(frontSideCowries).fill("front"),
        ...Array(backSideCowries).fill("back"),
        null,
        null,
        null,
      ];

      const shuffled = cowries.sort(() => Math.floor(Math.random() - 0.5));
      setCowriesGrid(shuffled);

      const currentCowriesStrValue_ = handleCowriesStringResult(frontSideCowries); //stale state for that last item didn't get updated
      setPlayerCowriesScore((curValues) => [
        ...curValues,
        currentCowriesStrValue_,
      ]);

    const currentCowriesNumericValue_ = handleCowriesNumericResult(frontSideCowries); //this will be set as two numbers not array of 2 elements
    // Maybe i have to convert currentCowriesNumericValue to array before assign it
    console.log("...........")
    setCurrentPlayerScore(prev => [...prev, currentCowriesNumericValue_]); 
  }

  function handleCreateElement() {
    if (
      !playerCowriesScore.includes("dust") &&
      !playerCowriesScore.includes("binj")
    )
      return;

      if (playerTurn === "player1" && player1ActiveElements == 4) return;
      else if (playerTurn === "player2" && player2ActiveElements == 4) return;

    setIsShowCreationDialog(true);
  }

  useEffect(() => {
    if (isShowCreationDialog) console.log("shown");
  }, [isShowCreationDialog]);

  useEffect(() => {
    if (playerCowriesScore.length === 0) return;
    const lastResult = playerCowriesScore[playerCowriesScore.length - 1];

    if (
      lastResult === "two" ||
      lastResult === "three" ||
      lastResult === "four"
    ) {
      setGameState("playing");
      return;
    }

    // const UPDATED_CURRENT_PLAYER_SCORE = calculateCurrentPlayerScore();
    // setCurrentPlayerScore(UPDATED_CURRENT_PLAYER_SCORE);
  }, [playerCowriesScore, gameState, calculateCurrentPlayerScore, setCurrentPlayerScore, setGameState]);

  useEffect(() => {
    const CANT_CREATE =
      !playerCowriesScore.includes("dust") &&
      !playerCowriesScore.includes("binj");
    const PLAYER_ZERO_ACTIVE_ELEMENTS =
      playerTurn === "player1"
        ? player1ActiveElements === 0
        : player2ActiveElements === 0;
    if (
      gameState === "playing" &&
      ((CANT_CREATE && PLAYER_ZERO_ACTIVE_ELEMENTS) ||
        playerCowriesScore.length === 0)
    )
      setPlayerTurn((prev) => (prev === "player1" ? "player2" : "player1"));
  }, [playerCowriesScore, gameState, setPlayerTurn]);

  return (
    <div className="w-75 rounded-2xl pb-5 bg-wood-500 flex items-center flex-col justify-center">
      <h2 className="font-bold rounded-tr-2xl rounded-tl-2xl bg-wood-700 w-full py-4 text-xl text-center">
        Bergees Game
      </h2>
      <h1 className=" border-black-500 font-bold pt-2">{playerTurn} Turn</h1>
      <h2 className="pt-4 font-bold">Total Cowries Value: {currentPlayerScore[0]+currentPlayerScore[1] || "0"} </h2>
      <h2 className="pt-4 font-bold">Main Cowries Value: {currentPlayerScore[0] || "0"} </h2>
      <h2 className="pt-4 font-bold">Rest Cowries Value: {currentPlayerScore[1] || "0"} </h2>
      <div className="pt-2 font-bold place-self-start pl-4 flex gap-1">
        Current Score:
        <div className="pr-4 font-normal flex flex-wrap gap-1">
          {playerCowriesScore.map((s, index) => (
            <span key={index} className="bg-red-700 px-2 rounded-2xl">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 flex justify-around w-full">
        <PlayerInfo
          player="player1"
          playerActiveElements={player1ActiveElements}
          setPlayerActiveElements={setPlayer1ActiveElements}
          playerWonPieces={player1WonPieces}
        />
        <div className="h-30 w-px place-self-center bg-wood-700"></div>
        <PlayerInfo
          player="player2"
          playerActiveElements={player2ActiveElements}
          setPlayerActiveElements={setPlayer2ActiveElements}
          playerWonPieces={player2WonPieces}
        />
      </div>
      <div className="flex flex-col gap-2 font-bold">
        <button
          onClick={handleCreateElement}
          disabled={!canCreateElement}
          className={`${canCreateElement ? "bg-yellow-700" : "bg-gray-700"} border-black-500 p-2 border-2 rounded-xl mt-2`}
        >
          Create Element
        </button>
        <button
          onClick={handleShakeAndThrow}
          disabled={gameState === "playing"}
          className={`${gameState !== "playing" ? "bg-mint-700" : "bg-gray-700"} border-2 font-bold border-black-500 py-2 px-6 rounded-2xl`}
        >
          {optionButtonText}
        </button>
      </div>
    </div>
  );
}

function PlayerInfo({ player, playerActiveElements, playerWonPieces }) {
  const {
    playerTurn,
    setPlayerTurn,
    playerCowriesScore,
    gameState,
    setIsShowCreationDialog,
  } = useContext(BargeesGameContext);

  return (
    <section className="font-semibold flex flex-col">
      <div className="flex gap-5 items-center pb-2 font-bold underline text-center">
        {player}
      </div>
      <div className="border-b-2 border-black-500 pt-2">
        Won Pieces:{" "}
        <span className="text-blue-700">{playerWonPieces}</span>{" "}
      </div>
      <div className="border-b-2 border-black-500 pt-2">
        Alive Pieces:{" "}
        <span className="font-normal">{playerActiveElements}</span>
      </div>
      <div className="border-b-2 border-black-500 pt-2">
        Inactive Pieces:{" "}
        <span className="font-normal">{4 - playerActiveElements}</span>
      </div>
    </section>
  );
}
