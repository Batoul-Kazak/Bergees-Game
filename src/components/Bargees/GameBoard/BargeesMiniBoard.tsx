import { useState, useContext } from 'react'
import Player from './Player';
import { BargeesGameContext } from "./../../../contexts/BargeesGameContext"

export default function BargeesMiniBoard({ position, isTransparent = false, initialCellIndex = -1, safeCells = [], winCell = -1, home = "no" }) {
    const totalPoints = 8 * 3;
    const [boardState] = useState<(string | null)[]>(Array(totalPoints).fill(null));

    const HOME_IDX = home === "player1" ? 19 : home === "player2" ? 7 : -1;
    const { player1ActiveElements, player2ActiveElements } = useContext(BargeesGameContext);
    const inactivePieces = HOME_IDX === 19 ? Math.max(0, 4 - player1ActiveElements) : Math.max(0, 4 - player2ActiveElements);

    const getCellStyles = (index) => {
        let baseColor = "bg-[#d4a373]";
        let borderColor = "border-[#8b5e3c]";

        if (index === winCell) {
            baseColor = "bg-red-500";
            borderColor = "border-red-700";
        } else if (index === initialCellIndex) {
            baseColor = "bg-mint-500";
            borderColor = "border-mint-700";
        } else if (safeCells.includes(index)) {
            baseColor = "bg-yellow-500";
            borderColor = "border-yellow-700";
        }

        // const bgColor = index == winCell ? "bg-red-500" : index == initialCellIndex ? "bg-mint-500" :
        // safeCells.includes(index) ? "bg-yellow-500" : "bg-wood-500";
        const isVisible = index === HOME_IDX || !isTransparent;
        const opacityClass = isVisible ? "opacity-100" : "opacity-0";

        return `${baseColor} ${borderColor} ${opacityClass}`
    }

    return (
        <div
            className="grid gap-0 bg-black shadow-2xl rounded-[3px] overflow-hidden "
            style={{
                gridTemplateColumns: `repeat(${position == "right" || position == "left" ? 8 : 3}, minmax(0, 1fr))`,
                width: "min(40vw, 240px)",
                aspectRatio: "1/1",
                height: "min(40vw, 220px)",
                gap: "2px"
            }}>
            {boardState.map((_, index) => {
                const cellClasses = getCellStyles(index);
                const isHome = index === HOME_IDX;
                return (
                    <div key={index} className={`border-[0.5px] rounded-[3px] inset-0 border-wood-700 
                        flex justify-center gap-1 items-center font-bold text-red-950 ${cellClasses}
                        `}>

                        <div className="relative z-10 flex flex-wrap justify-center items-center gap-1 w-full h-full p-1">
                            {isHome && Array.from({ length: inactivePieces }, (_, i) => (
                                <Player id={i} key={i} player={home} />
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}