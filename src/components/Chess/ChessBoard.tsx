
import { ChessStone } from "./ChessStone";

export default function ChessBoard() {
  const rows = Array.from({length: 8}, (_, idx) => idx);
  const cols = Array.from({length: 8}, (_, idx) => idx);

  return (
    <main className="flex place-content-center place-items-center dark:bg-black bg-black">
    <div className="bg-gray-800 border-double border-2 border-gray-700 relative grid grid-cols-8 grid-rows-8 p-4  w-[90vh] h-[90vh] rounded-2xl">
        {rows.map((row) => (
            cols.map((col)  => {
                const isDarkStone = (col + row) % 2 == 1;
                const stoneIdx = 8 * row + col;
                // console.log("row: ", row, " i: ", col, " j: ", j, " = ",stoneIdx)
                return (
                    <ChessStone key={`${row}-${col}`} color={isDarkStone ? "black" : "white"} stoneIdx={stoneIdx} />
                )
            })
        ))}
           </div>
   </main>
  )
}

