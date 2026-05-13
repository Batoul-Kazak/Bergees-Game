// import BargeesMiniBoard from './BargeesMiniBoard'
import Kitchen from './Kitchen'
import { useState, useEffect } from "react"

import { PLAYER_1_PATH } from '../../../constants/boardPaths'
import { PLAYER_2_PATH } from '../../../constants/boardPaths'
import { PLAYER_1_REST_CELLS, WIN_CELLS } from '../../../constants/boardWinCells'
import { PLAYER_2_REST_CELLS } from '../../../constants/boardWinCells'
import { SAFE_CELLS, PLAYER_1_HOME_2, PLAYER_1_HOME_1, PLAYER_2_HOME_1, PLAYER_2_HOME_2 } from '../../../constants/boardHomes'
import Stone from './Stone'

export default function BargeesMainBoard() {
    const GRID_SIZE = 19;
    const [gridBlocks] = useState<number | null[]>(Array(GRID_SIZE * GRID_SIZE).fill(null));
    const [cowriesGrid, setCowriesGrid] = useState([]);
    // const [idx, setIdx] = useState(0);

    function ShouldHideCell(index) {
        const row = Math.floor(index / GRID_SIZE);
        const col = index % GRID_SIZE;

        const group1 = row <= 7 && col <= 7;
        const group2 = row <= 7 && col >= 11;
        const group3 = row >= 11 && col <= 7;
        const group4 = row >= 11 && col >= 11;
        const isWinCell = WIN_CELLS.includes(index);

        return isWinCell || group1 || group2 || group3 || group4;
    }

    // note: Download the tailwind function to merge classes
    function StoneColor(index) {
        if (ShouldHideCell(index))
            return "bg-black border-black";
        else if (PLAYER_1_HOME_1 === index || PLAYER_1_HOME_2 === index)
            return "bg-linear-90 from-blue-500 to-blue-700 rounded-xl shadow-2xl shadow-white";
        else if (PLAYER_2_HOME_1 === index || PLAYER_2_HOME_2 === index)
            return "bg-linear-90 from-purple-500 to-purple-700 rounded-xl shadow-2xl shadow-white";
        else if (SAFE_CELLS.includes(index))
            return "bg-linear-90 from-yellow-400 to-yellow-800 rounded-[4px]";
        else if (PLAYER_1_REST_CELLS.includes(index) || PLAYER_2_REST_CELLS.includes(index))
            return "bg-red-900 rounded-[4px]";
        else return "bg-linear-90 from-wood-200 to-wood-700 rounded-[4px]"
    }

    function handleCowriesResult(frontSideStones) {
        if (frontSideStones === 6)
            return [6, 0];
        else if (frontSideStones === 0)
            return [12, 0];
        else if (frontSideStones === 5)
            return [10, 1];
        else if (frontSideStones === 1)
            return [24, 1];
        else if (frontSideStones === 2)
            return [4, 0];
        else if (frontSideStones === 3)
            return [3, 0];
        else if (frontSideStones === 4)
            return [2, 0];
    }

    useEffect(() => {
        const frontSideCowries = Math.floor(Math.random() * 7);
        const backSideCowries = 6 - frontSideCowries;

        const cowries = [
            ...Array(frontSideCowries).fill("front"),
            ...Array(backSideCowries).fill("back"),
            null, null, null
        ];

        const shuffled = cowries.sort(() => Math.floor(Math.random() - 0.5));
        setCowriesGrid(shuffled);
    }, [])


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
                const isHidden = ShouldHideCell(index);
                const winCellIndex = WIN_CELLS.indexOf(index);
                const stoneType = winCellIndex !== -1 ? cowriesGrid[winCellIndex] : null;
                return (
                    <div key={index} className={`border-[0.5px] inset-0 
                        flex justify-center items-center ${StoneColor(index)} font-bold text-red-950 text-[12px] w-9 h-9`}
                    >
                        {!isHidden && !WIN_CELLS.includes(index) && index}
                        {/* <div className="relative z-10 flex flex-wrap justify-center items-center gap-1 w-full h-full p-1">
                            {isHome && Array.from({ length: inactivePieces }, (_, i) => (
                                <Player id={i} key={i} player={home} />
                            ))}
                        </div> */}
                        {stoneType && <Stone type={stoneType} />}
                    </div>
                )
            })}
        </div>
    )
}
