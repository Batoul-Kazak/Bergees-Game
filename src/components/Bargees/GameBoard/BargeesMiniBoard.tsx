import { useState, useContext } from 'react'
import Player from './Player';
import { BargeesGameContext } from "./../../../contexts/BargeesGameContext"

export default function BargeesMiniBoard({ position, isTransparent = false, initialCellIndex = -1, safeCells = [], winCell = -1, home = "no" }) {
    const totalPoints = 8 * 3;
    const [boardState, setBoardState] = useState<(string | null)[]>(Array(totalPoints).fill(null));

    // const cellColor = (winCell != -1 ? "bg-red-500" : (initialCellIndex != -1 ? "bg-mint-500" : "bg-wood-500 "));
    const HOME_IDX = home == "player1" ? 19 : home == "player2" ? 7 : -1;
    const { player1ActiveElements, player2ActiveElements } = useContext(BargeesGameContext);
    const inactivePieces = HOME_IDX === 19 ? 4 - player1ActiveElements : 4 - player2ActiveElements;

    return (
        // <div className="flex flex-col items-center justify-center min-h-screen">
        <div
            className="grid gap-0 bg-black shadow-2xl rounded-[3px] overflow-hidden "
            style={{
                gridTemplateColumns: `repeat(${position == "right" || position == "left" ? 8 : 3}, minmax(0, 1fr))`,
                width: "min(40vw, 240px)",
                aspectRatio: "1/1",
                height: "min(40vw, 220px)",
                gap: "2px"
            }}
        >{boardState.map((stone, index) =>
            <div className={`border-[0.5px] rounded-[3px] inset-0 border-wood-700 
                    flex justify-center flex gap-1 items-center font-bold text-red-950
                    ${(index == HOME_IDX) || !isTransparent ? "opacity-100" : "opacity-0"}
            ${(index == winCell) ? "bg-red-500" : (index == initialCellIndex) ?
                    "bg-mint-500" : (safeCells.some(i => i == index)) ? "bg-yellow-500" :
                        "bg-wood-500"} `} key={index}>{(index == HOME_IDX) ?
                            Array.from({ length: inactivePieces }, (_, i) => (
                                <Player key={i} player={home} />
                            )) : ""
                }</div>
        )
            }</div >
        // </div>
    )
}

