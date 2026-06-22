import React, { useContext, useEffect } from 'react'
import { CheckersGameContext } from '../../contexts/CheckersGameContext';
import { useSettings } from '../../contexts/SettingContext';

export default function CheckersBoard() {
  const rows = Array.from({length: 8}, (_, idx) => idx);
  const cols = Array.from({length: 8}, (_, idx) => idx);

  return (
    <div className="bg-wood-500 relative grid grid-cols-8 grid-rows-8 p-4  w-[90vh] h-[90vh]">
        {rows.map((row) => (
            cols.map((col)  => {
                const isDarkStone = (col + row) % 2 == 1;
                const stoneIdx = 8 * row + col;
                // console.log("row: ", row, " i: ", col, " j: ", j, " = ",stoneIdx)
                return (
                    <CheckersStone key={`${row}-${col}`} color={isDarkStone ? "dark" : "light"} stoneIdx={stoneIdx} />
                )
            })
        ))}
           </div>
  )
}

function CheckersStone({ color, stoneIdx }: { color: "light" | "dark", stoneIdx: number }) {
  const { darkPiecesIndices,lightPiecesIndices } = useContext(CheckersGameContext);
  const {colorTheme, setColorTheme} = useSettings();

  function color_() {
    switch(colorTheme)
    {
      case "wooden": return color === "light" ? "dark:bg-gray-500 bg-gray-100" : "dark:bg-black bg-gray-800"; 
      case "blackAndWhite": return color === "light" ? "dark:bg-gray-500 bg-gray-100" : "dark:bg-black bg-gray-800";
      case "glass": return color === "light" ? "dark:bg-gray-500 bg-gray-100" : "dark:bg-black bg-gray-800"
    }
  }

  return (
    <div className={`w-full relative h-full cursor-pointer
     ${color === "light" ? "dark:bg-gray-500 bg-gray-100" : "dark:bg-black bg-gray-800"}`}>
      {darkPiecesIndices.includes(stoneIdx) && <CheckerPiece color="dark" stoneIdx={stoneIdx} />}
      {lightPiecesIndices.includes(stoneIdx)  && <CheckerPiece color="light" stoneIdx={stoneIdx} />}
    </div>
  )
}

function CheckerPiece({ color, stoneIdx }: { color: "light" | "dark", stoneIdx: number }) {
  const {setSelectedPiece, selectedPiece} = useContext(CheckersGameContext);
  const {colorTheme, setColorTheme} = useSettings();

  // function color_() {
    // switch(colorTheme)
    // {
      // case "wooden": return color === "dark" ? "dark:bg-mint-500 bg-mint-200 border-mint-700" : " bg-wood-500 border-wood-700";
      // case "blackAndWhite": return color === "dark" ? "dark:bg-mint-500 bg-mint-200 border-mint-700" : " bg-wood-500 border-wood-700";
      // case "glass": return color === "dark" ? "dark:bg-mint-500 bg-mint-200 border-mint-700" : " bg-wood-500 border-wood-700";
    // }
  // }

  return (
    <div className={`w-[80%] h-[80%] rounded-full cursor-pointer
      ${color === "dark" ? "dark:bg-mint-500 bg-mint-200 border-mint-700" : " bg-wood-500 border-wood-700"}
      absolute z-2 translate-[-50%, -50%] top-[7px] left-[7px]
      border-10 ${selectedPiece === stoneIdx ? "border-solid border-red-600" : "border-double"}
    `}
    onClick={() => setSelectedPiece((prev: number) => prev === stoneIdx ? -1 : stoneIdx)}
    ></div>
  )
}