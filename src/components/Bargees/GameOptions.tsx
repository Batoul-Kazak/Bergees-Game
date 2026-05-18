import { useContext, useEffect } from "react";
import { BargeesGameContext } from "../../contexts/BargeesGameContext";

import { COWRIE_VALUES } from "../../constants/CowrieValues";
// import { getCowriesNumericResult } from "../../utils/getCowriesNumericResult";
// import { getCowriesStringResult } from "../../utils/getCowriesNumericResult";

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
    availableMoveNames,
    setAvailableMoveNames,
    setAvailableMoves,
    availableMoves,
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
        ? "Shake and Throw" : gameState === "playing" ? "..." : "";

  const canCreateElement =
    (gameState !== "idle") && (availableMoveNames.includes("dust") || availableMoveNames.includes("binj"));

  const isFinalShake = (availableMoveNames[availableMoveNames.length - 1] === "two") || (availableMoveNames[availableMoveNames.length - 1] === "three") || (availableMoveNames[availableMoveNames.length - 1] === "four");

  // function switchPlayerTurn()
  // {
      
  // }

  function calculateAvailableMoves()
  {
      let totalSum1 = 0;
      let totalSum2 = 0;
      availableMoveNames.forEach(val => {
        const match = COWRIE_VALUES.find(obj => obj.cowriesName === val);
        if(match)
          {
            totalSum1 += match.actualValue[0];
            totalSum2 += match.actualValue[1];
          }
        });
      return [totalSum1, totalSum2];
  }

    function getCowriesStringResult(frontSideStones) {
      if (frontSideStones === 6) return "shakeh";
      else if (frontSideStones === 0) return "bara";
      else if (frontSideStones === 5) return "dust";
      else if (frontSideStones === 1) return "binj";
      else if (frontSideStones === 2) return "four";
      else if (frontSideStones === 3) return "three";
      else if (frontSideStones === 4) return "two";
      else return "none"
    }

     function getCowriesNumericResult(frontSideStones) {
        if (frontSideStones === 6) return [6, 0];
        else if (frontSideStones === 0) return [12,0];
        else if (frontSideStones === 5) return [10,1];
        else if (frontSideStones === 1) return [24,1];
        else if (frontSideStones === 2) return [4,0];
        else if (frontSideStones === 3) return [3,0];
        else if (frontSideStones === 4) return [2,0];
        else return [0,0];
      }
  

  // function toArray(...elements) 
  // {
  //     const arr = [];
  //     elements.forEach(el => {
  //       arr.push(el);
  //     })
  //     return arr;
  // }



  function handleShakeAndThrow() {
    if (gameState !== "shaking") return;

    if(isFinalShake) 
    {
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

      const currentCowriesStrValue_ = getCowriesStringResult(frontSideCowries); //stale state for that last item didn't get updated
      setAvailableMoveNames((curValues) => [
        ...curValues,
        currentCowriesStrValue_,
      ]);

    const currentCowriesNumericValue_ = getCowriesNumericResult(frontSideCowries); //this will be set as two numbers not array of 2 elements
    // Maybe i have to convert currentCowriesNumericValue to array before assign it
    console.log("...........")
    setAvailableMoves(prev => [...prev, currentCowriesNumericValue_]); 
  }

  function handleGameButtonClicked()
  {
    if(gameState === "idle")
       startGame(); else handleShakeAndThrow();
  }

  function handleCreateElement() {
    if (!canCreateElement) return;

    if ((playerTurn === "player1" && player1ActiveElements == 4) || (playerTurn === "player2" && player2ActiveElements == 4)) return;

    setIsShowCreationDialog(true);
  }

  function startGame()
  {
    if(gameState === "idle") 
      setGameState("shaking");
  }

  useEffect(() => {

    // if(isFinalShake)
    // {
      // setGameState("playing");
    // }

    const CAN_CREATE = availableMoveNames.includes("dust") || availableMoveNames.includes("binj");
    const PLAYER_ZERO_ACTIVE_ELEMENTS = playerTurn === "player1" ? player1ActiveElements === 0 : player2ActiveElements === 0;

    const noElements_cantCreate = isFinalShake && PLAYER_ZERO_ACTIVE_ELEMENTS && !CAN_CREATE;
    const noAvailableMoves = isFinalShake && (availableMoveNames.length === 0);

    console.log("game-state: ", noAvailableMoves);
    
    const playerActivePieces = playerTurn === "player1" ? "player2" : "player1";
    if((playerActivePieces > 0 && availableMoves.length !== 0) || canCreateElement)
    {
      setGameState("playing");
    } else if (noElements_cantCreate && (isFinalShake || availableMoveNames.length === 0)) {
      console.log("second")
      setGameState("idle");
      setPlayerTurn((prev) => (prev === "player1" ? "player2" : "player1"));
      setAvailableMoveNames([]);
      setAvailableMoves([]);
    } else if(noAvailableMoves)
      {
        setPlayerTurn((prev) => (prev === "player1" ? "player2" : "player1"));
        setGameState("idle");
        setAvailableMoveNames([]);
        setAvailableMoves([]);
      } 

    

      // process the senario when player has enough score and element but can't move it because he can't move on winCells but he needs only 1 step so he can move

      // setGameState("idle");
  }, [availableMoveNames, gameState, setPlayerTurn]);

  return (
    <div className="w-75 rounded-2xl pb-5 bg-wood-500 flex items-center flex-col justify-center">
      <h2 className="font-bold rounded-tr-2xl rounded-tl-2xl bg-wood-700 w-full py-4 text-xl text-center">
        Bergees Game
      </h2>
      <h1 className=" border-black-500 font-bold pt-2">{playerTurn} Turn</h1>
      <h2 className="pt-4 font-bold">Total Cowries Value: {availableMoves[0] + availableMoves[1] || "0"} </h2>
      <h2 className="pt-4 font-bold">Main Cowries Value: {availableMoves[0] || "0"} </h2>
      <h2 className="pt-4 font-bold">Rest Cowries Value: {availableMoves[1] || "0"} </h2>
      <div className="pt-2 font-bold place-self-start pl-4 flex gap-1">
        Current Score:
        <div className="pr-4 font-normal flex flex-wrap gap-1">
          {availableMoveNames.map((s, index) => (
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
          onClick={handleGameButtonClicked}
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
    availableMoveNames,
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
