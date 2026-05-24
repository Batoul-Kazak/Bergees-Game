import { useContext, useEffect } from "react";
import { BargeesGameContext } from "../../contexts/BargeesGameContext";
// import { getCowriesNumericResult } from "../../utils/getCowriesNumericResult";
// import { getCowriesStringResult } from "../../utils/getCowriesNumericResult";
import { getAvailableMoveNames } from "../../utils/getAvailableMoveNames";

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
      ? `${playerTurn} play`
      : gameState === "shaking"
        ? "Shake and Throw"
        : gameState === "turnEnds" //the turn of shaking for the current player
          ? "..."
          : "unknown";

  const TOTAL_COWRIES_VALUE =
    availableMoves.length > 0
      ? availableMoves.reduce((acc, move) => acc + move[0] + move[1], 0)
      : 0;
  const MAIN_COWRIES_VALUE =
    availableMoves.length > 0
      ? availableMoves.reduce((acc, move) => acc + move[0], 0)
      : 0;
  const REST_COWRIES_VALUE =
    availableMoves.length > 0
      ? availableMoves.reduce((acc, move) => acc + move[1], 0)
      : 0;
  const CAN_CREATE_ELEMENT =
    getAvailableMoveNames(availableMoves).includes("dust") ||
    getAvailableMoveNames(availableMoves).includes("binj");

  function handleStartGame() {
    if (gameState !== "idle") {
      return;
    }

    setGameState("shaking");
  }

  function getCowriesResult(frontSideCowriesCount) {
    switch (frontSideCowriesCount) {
      case 0:
        return [12, 0];
      case 1:
        return [24, 1];
      case 2:
        return [4, 0];
      case 3:
        return [3, 0];
      case 4:
        return [2, 0];
      case 5:
        return [10, 1];
      case 6:
        return [6, 0];
    }
  }
  function handleShakingAndThrow() {
    const frontSideCowriesCount = Math.floor(Math.random() * 7);

    const cowries = [
      ...Array(frontSideCowriesCount).fill("front"),
      ...Array(6 - frontSideCowriesCount).fill("back"),
      null,
      null,
      null,
    ];

    const shuffledCowries = cowries.sort(() => Math.random() - 0.5);
    setCowriesGrid(shuffledCowries);

    const newValue = getCowriesResult(frontSideCowriesCount);
    setAvailableMoves((prev) => [...prev, newValue]);

    const isLastShake = frontSideCowriesCount >= 2 && frontSideCowriesCount <= 4;
    if (isLastShake) {
      setGameState("turnEnds");
    }

    const PLAYER_ACTIVE_ELEMENTS = playerTurn === "player1" ? player1ActiveElements : player2ActiveElements;
    if(isLastShake && !CAN_CREATE_ELEMENT && PLAYER_ACTIVE_ELEMENTS === 0)
    {
        setGameState("idle");
        setPlayerTurn((prev) => (prev === "player1" ? "player2" : "player1"));
        setAvailableMoves([]);
        console.log("gameState: ", gameState, " playerTurn: ", playerTurn)
    }
  }

  function handleGameButtonClicked() {
    if (gameState === "idle") {
      handleStartGame();
      return;
    }

    handleShakingAndThrow();
  }

  function handleCreateElement() {
    if (!CAN_CREATE_ELEMENT) return;
    if (
      (playerTurn === "player1" && player1ActiveElements === 4) ||
      (playerTurn === "player2" && player2ActiveElements === 4)
    )
      return;

    setIsShowCreationDialog(true);
  }

  return (
    <div className="w-75 rounded-2xl pb-5 bg-wood-500 flex items-center flex-col justify-center">
      <h2 className="font-bold rounded-tr-2xl rounded-tl-2xl bg-wood-700 w-full py-4 text-xl text-center">
        Bergees Game
      </h2>
      <h1 className=" border-black-500 font-bold pt-2">{playerTurn} Turn</h1>
      <h2 className="pt-4 font-bold">
        Total Cowries Value: {TOTAL_COWRIES_VALUE}{" "}
      </h2>
      <h2 className="pt-4 font-bold">
        Main Cowries Value: {MAIN_COWRIES_VALUE}{" "}
      </h2>
      <h2 className="pt-4 font-bold">
        Rest Cowries Value: {REST_COWRIES_VALUE}{" "}
      </h2>
      <div className="pt-2 font-bold place-self-start pl-4 flex gap-1">
        Current Score:
        <div className="pr-4 font-normal flex flex-wrap gap-1">
          {getAvailableMoveNames(availableMoves).map((value, index) => (
            <span key={index} className="bg-red-700 px-2 rounded-2xl">
              {value}
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
          disabled={!CAN_CREATE_ELEMENT}
          className={`${CAN_CREATE_ELEMENT ? "bg-yellow-700" : "bg-gray-700"} border-black-500 p-2 border-2 rounded-xl mt-2`}
        >
          Create Element
        </button>
        <button
          onClick={handleGameButtonClicked}
          disabled={gameState === "turnEnds"}
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
    availableMoves,
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
