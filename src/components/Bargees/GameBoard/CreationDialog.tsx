import { useContext, useEffect } from "react";
import { BargeesGameContext } from "../../../contexts/BargeesGameContext";
import { PLAYER_1_HOME_1 } from "../../../constants/boardHomes";
import { PLAYER_1_HOME_2 } from "../../../constants/boardHomes";
import { PLAYER_2_HOME_1 } from "../../../constants/boardHomes";
import { PLAYER_2_HOME_2 } from "../../../constants/boardHomes";
import { getAvailableMoveNames } from "../../../utils/getAvailableMoveNames";

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
    availableMoves,
    setAvailableMoves
  } = useContext(BargeesGameContext);

  const CAN_CREATE_AT_SECONDARY_HOME = getAvailableMoveNames(availableMoves).includes("binj");
  const CAN_CREATE_AT_MAIN_HOME = getAvailableMoveNames(availableMoves).includes("dust");

  function handleCreateElement() {
    if (playerTurn === "player1") {
      setPlayer1ActiveElements((prev) => prev + 1);
    } else if (playerTurn === "player2") {
      setPlayer2ActiveElements((prev) => prev + 1);
    }
  }

  // function removeFirstItem(item, state, stateUpdater)
  // {
    // 
    // const index =  state.findIndex(i => i === item);
// 
    // if(index !== -1)
    // {
      // const UPDATED_PLAYER_COWRIES_SCORE = [...state];
      // UPDATED_PLAYER_COWRIES_SCORE.splice(index, 1);
      // stateUpdater(UPDATED_PLAYER_COWRIES_SCORE);
    // } else
      // return -1;
  // }

  function removeScore(item, state, stateUpdater)
  {
    let index = -1;
    if(item === "dust")
    {
      index = state.findIndex(item_ => item_[0] == 10);
    } else {
      index = state.findIndex(item_ => item_[0] == 24);
    }

    if(index !== -1)
    {
      const UPDATED_PLAYER_COWRIES_SCORE = [...state];
      UPDATED_PLAYER_COWRIES_SCORE.splice(index, 1);
      stateUpdater(UPDATED_PLAYER_COWRIES_SCORE);
    } else return -1;
  }

  function updateSpecificIdx(val, state, stateUpdater)
  {
    const indexToUpdate = state.findIndex(el => el === -1);

    if(indexToUpdate !== -1)
    {
      const NEW_ARR = [...state];
      NEW_ARR.splice(indexToUpdate, 1, val);
      stateUpdater(NEW_ARR);
    } else console.log("Couldn't update idx");
  }
  

  function handleCreateAtMainHome() {

    handleCreateElement();

    if(playerTurn === "player1")
      updateSpecificIdx(PLAYER_1_HOME_1, player1PiecesIndices, setPlayer1PiecesIndices);
    else if(playerTurn === "player2")
      updateSpecificIdx(PLAYER_2_HOME_1, player2PiecesIndices, setPlayer2PiecesIndices );
    
    removeScore("dust", availableMoves, setAvailableMoves);
    setIsShowCreationDialog(false);
  }

  function handleCreateAtSecondaryHome() {
    handleCreateElement();
    if(playerTurn === "player1")
       updateSpecificIdx(PLAYER_1_HOME_2, player1PiecesIndices, setPlayer1PiecesIndices);
  else if(playerTurn === "player2")
     updateSpecificIdx(PLAYER_2_HOME_2, player2PiecesIndices, setPlayer2PiecesIndices);
  
  removeScore("binj", availableMoves, setAvailableMoves);
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
          disabled={!CAN_CREATE_AT_MAIN_HOME}
          onClick={handleCreateAtMainHome}
          className={`rounded-2xl border-2 border-wood-700 ${CAN_CREATE_AT_MAIN_HOME ? "bg-wood-500" : "bg-gray-700"} px-4 py-2 text-black-500 font-bold`}
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
