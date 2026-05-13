// import BargeesMiniBoard from './BargeesMiniBoard'
import Kitchen from './Kitchen'
import { useState } from "react"
import { HOME_CELLS } from "./../../../constants/boardHomes"
import { PLAYER_1_HOME_1 } from './../../../constants/boardHomes'
import { PLAYER_2_HOME_1 } from './../../../constants/boardHomes'
import { PLAYER_1_PATH } from '../../../constants/boardPaths'
import { PLAYER_2_PATH } from '../../../constants/boardPaths'
import { PLAYER_1_WIN_CELLS } from '../../../constants/boardWinCells'
import { PLAYER_2_WIN_CELLS } from '../../../constants/boardWinCells'

export default function BargeesMainBoard() {
    const GRID_SIZE = 19;
    const [gridBlocks] = useState<number | null[]>(Array(GRID_SIZE * GRID_SIZE).fill(null));

    function ShouldHideCell(index) {
        const row = Math.floor(index / GRID_SIZE);
        const col = index % GRID_SIZE;

        const group1 = row <= 7 && col <= 7;
        const group2 = row <= 7 && col >= 11;
        const group3 = row >= 11 && col <= 7;
        const group4 = row >= 11 && col >= 11;
        const winCells = col >= 8 && col <= 10 && row >= 8 && row <= 10;

        return winCells || group1 || group2 || group3 || group4;
    }

    // Download the tailwind function to merge classes
    function StoneColor(index) {
        if (ShouldHideCell(index))
            return "bg-black border-black";
        else if (PLAYER_1_HOME_1 === index)
            return "bg-blue-700 rounded-xl";
        else if (PLAYER_2_HOME_1 === index)
            return "bg-purple-700 rounded-xl";
        else if (HOME_CELLS.includes(index))
            return "bg-yellow-700 rounded-[4px]";
        else if (PLAYER_1_WIN_CELLS.includes(index) || PLAYER_2_WIN_CELLS.includes(index))
            return "bg-red-900 rounded-[4px]";
        else return "bg-wood-200  border-wood-700 rounded-[4px]"
    }

    return (
        <div
            className="grid bg-black shadow-2xl -rotate-45 rounded-[1px] overflow-hidden "
            style={{
                gridTemplateColumns: "repeat(19, 1fr)",
                width: "min(60vw, 760px)",
                aspectRatio: "1/1",
                height: "min(60vw, 760px)",
                // gap: "1px"
            }}>
            {gridBlocks.map((_, index) => {
                return (
                    <div key={index} className={`border-[0.5px] inset-0 
                        flex justify-center items-center ${StoneColor(index)} font-bold text-red-950 text-[12px] w-9 h-9`}
                    >
                        {(!ShouldHideCell(index)) && index}
                        {/* <div className="relative z-10 flex flex-wrap justify-center items-center gap-1 w-full h-full p-1">
                            {isHome && Array.from({ length: inactivePieces }, (_, i) => (
                                <Player id={i} key={i} player={home} />
                            ))}
                        </div> */}
                    </div>
                )
            })}
        </div>
    )
}
