import { useContext, useEffect } from "react";
import { BargeesGameContext } from "../../../contexts/BargeesGameContext";

export default function CreationDialog({ actionType = null }) {
  const {
    setIsShowCreationDialog,
    dialogAction,
    playerCowriesScore,
    setPlayer1ActiveElements,
    setPlayer2ActiveElements,
    player1ActiveElements,
    player2ActiveElements,
    playerTurn,
  } = useContext(BargeesGameContext);

  function handleCreateElement() {
    if (playerTurn === "player1") {
      setPlayer1ActiveElements((prev) => prev + 1);
    } else if (playerTurn === "player2") {
      setPlayer2ActiveElements((prev) => prev + 1);
    }
  }

  function handleCreateAtMainHome() {
    handleCreateElement();
    setIsShowCreationDialog(false);
  }

  function handleCreateAtSecondaryHome() {
    handleCreateElement();
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
          onClick={handleCreateAtSecondaryHome}
          className="rounded-2xl border-2 border-wood-700 bg-wood-500 px-4 py-2 text-black-500"
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
