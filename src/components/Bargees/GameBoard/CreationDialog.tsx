import { useContext, useEffect } from "react";
import { BargeesGameContext } from "../../../contexts/BargeesGameContext";
import { PLAYER_1_HOME_1 } from "../../../constants/boardHomes";
import { PLAYER_1_HOME_2 } from "../../../constants/boardHomes";
import { PLAYER_2_HOME_1 } from "../../../constants/boardHomes";
import { PLAYER_2_HOME_2 } from "../../../constants/boardHomes";

export default function CreationDialog({ actionType = null }) {
  const {
    setIsShowCreationDialog,
    dialogAction,
    setPlayer1ActiveElements,
    setPlayer2ActiveElements,
    playerTurn,
    player1PiecesIndices,
    player2PiecesIndices,
    setPlayer1PiecesIndices,
    setPlayer2PiecesIndices,
    playerCowriesScore,
    setPlayerCowriesScore
  } = useContext(BargeesGameContext);

  const CAN_CREATE_AT_SECONDARY_HOME = playerCowriesScore.includes("binj");

  function handleCreateElement() {
    if (playerTurn === "player1") {
      setPlayer1ActiveElements((prev) => prev + 1);
    } else if (playerTurn === "player2") {
      setPlayer2ActiveElements((prev) => prev + 1);
    }
  }

  function removeFirstItem(item, state, stateUpdater)
  {
    const index =  state.findIndex(i => i === item);

    if(index !== -1)
    {
      const UPDATED_PLAYER_COWRIES_SCORE = [...state];
      UPDATED_PLAYER_COWRIES_SCORE.splice(index, 1);
      stateUpdater(UPDATED_PLAYER_COWRIES_SCORE);
    }
  }
  
  function handleCreateAtMainHome() {
    handleCreateElement();
    if(playerTurn === "player1")
      setPlayer1PiecesIndices(prev => prev.map(index => index === -1 ? PLAYER_1_HOME_1 : index));
    else if(playerTurn === "player2")
      setPlayer2PiecesIndices(prev => prev.map(index => index === -1 ? PLAYER_2_HOME_1 : index));
    
    removeFirstItem("dust", playerCowriesScore, setPlayerCowriesScore);
    setIsShowCreationDialog(false);
  }

  function handleCreateAtSecondaryHome() {
    handleCreateElement();
    if(playerTurn === "player1")
    setPlayer1PiecesIndices(prev => prev.map(index => index === -1 ? PLAYER_1_HOME_2 : index));
  else if(playerTurn === "player2")
    setPlayer2PiecesIndices(prev => prev.map(index => index === -1 ? PLAYER_2_HOME_2 : index));
  
  removeFirstItem("binj", playerCowriesScore, setPlayerCowriesScore);
  setIsShowCreationDialog(false);
  }

  useEffect(() => {
    if (dialogAction === "creation") {
      setButton1Text("");
    }
  });

  return (
    <div className="bg-wood-700 flex flex-col justify-between gap-8 items-center z-100 p-10 rounded-2xl absolute top-[50%] left-[50%] translate-x-[-50%]">
      <p className="text-xl">Where to create Piece?</p>
      <div className="flex flex-col gap-4 w-full">
        <button
          onClick={handleCreateAtMainHome}
          className="rounded-2xl border-2 border-wood-700 bg-wood-500 px-4 py-2 text-black-500 font-bold"
        >
          Create At Main Home
        </button>
        <button
          disabled={!CAN_CREATE_AT_SECONDARY_HOME}
          onClick={handleCreateAtSecondaryHome}
          className={`rounded-2xl border-2 border-wood-700 ${CAN_CREATE_AT_SECONDARY_HOME ? "bg-wood-500" : "bg-gray-700"}  px-4 py-2 text-black-500`}
        >
          Create At Secondary Home
        </button>
        <button
          onClick={() => setIsShowCreationDialog(false)}
          className="rounded-2xl border-2 border-wood-700 bg-wood-500 px-4 py-2 text-black-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
