import React from "react";
import { useState } from "react";
import { BargeesGameContext } from "../../contexts/BargeesGameContext";
import GameOptions from "./GameOptions";
import BargeesMainBoard from "./GameBoard/BargeesMainBoard";
import CreationDialog from "./GameBoard/CreationDialog";
import MessageDialog from "./GameBoard/MessageDialog";
import WinningDialog from "./GameBoard/WinningDialog";
import { TwoK } from "@mui/icons-material";

export default function BargeesGame() {
  const GRID_SIZE = 19;
  const [boardPieces, setBoardPieces] = useState<number | null[]>(
    Array(GRID_SIZE * GRID_SIZE).fill(null),
  );

  const [gameState, setGameState] = useState("idle"); //playing | finished | waiting | idle
  const [player1ActiveElements, setPlayer1ActiveElements] = useState(0);
  const [player2ActiveElements, setPlayer2ActiveElements] = useState(0);
  const [playerTurn, setPlayerTurn] = useState("player1");

  const [availableMoves, setAvailableMoves] = useState([]); // [] array that stores two scores [the full, the rest of binj and dust]
  //the sum of dust, binj...etc
  // needed especially when you have binj and creation at home1 so the rest is 14

  const [selectedPieceIndex, setSelectedPieceIndex] = useState(-1);
  const [player1WonPieces, setPlayer1WonPieces] = useState(0);
  const [player2WonPieces, setPlayer2WonPieces] = useState(0);

  const [isShowCreationDialog, setIsShowCreationDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);
  const [cowriesGrid, setCowriesGrid] = useState([]);

  const [player1PiecesIndices, setPlayer1PiecesIndices] = useState([
    -1, -1, -1, -1,
  ]); //-1 means not activated pieces //-2 means winned piece

  //###THIS RULE IS NO LONGER NEEDED
  //and each piece created added to the end of the array (in ordered way)
  //e.g. [-1,4,102,6] and [-1,-1,-1,5] are correct but [-1,3,5,-1] and [5, -1, -1, -1] aren't allowed
  const [player2PiecesIndices, setPlayer2PiecesIndices] = useState([
    -1, -1, -1, -1,
  ]);

  const [message, setMessage] = useState("");
  const [hasWon, setHasWon] = useState(false);
  const [playersTotalScore, setPlayerTotalScore] = useState([0,0]);
  // const [globalBoard, setGlobalBoard] = useState<string | null[]>(Array(24).fill(null));

  return (
    <div
      className="rounded-3xl dark:bg-black bg-white pt-10
              flex justify-evenly w-screen h-screen items-center  relative md:flex-col lg:flex-row
            "
    >
      <BargeesGameContext.Provider
        value={{
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
          selectedPieceIndex,
          setSelectedPieceIndex,
          dialogAction,
          setDialogAction,
          setPlayer1WonPieces,
          player1WonPieces,
          setPlayer2WonPieces,
          player2WonPieces,
          boardPieces,
          setBoardPieces,
          cowriesGrid,
          setCowriesGrid,
          setIsShowCreationDialog,
          player1PiecesIndices,
          setPlayer1PiecesIndices,
          player2PiecesIndices,
          setPlayer2PiecesIndices,
          message,
          setMessage,
          hasWon, 
          setHasWon,
          playersTotalScore,
          setPlayerTotalScore
        }}
      >
        <div className="flex-shrink-0 z-0">
          <BargeesMainBoard />
        </div>
        <div className="flex-shrink-0 z-0">
          <GameOptions />
        </div>

        {isShowCreationDialog && (
          <>
            <div className="bg-black-700/70 z-70 absolute top-0 left-0 w-screen h-screen"></div>
            <CreationDialog />
          </>
        )}
        {message && !hasWon && <MessageDialog />}
        {hasWon && <WinningDialog />}
      </BargeesGameContext.Provider>
    </div>
  );
}

{
  /* <div className="h-[100px] w-[100px] bg-gray-700 absolute -top-10 left-20"></div> */
}
{
  /* <NavBar /> */
}
