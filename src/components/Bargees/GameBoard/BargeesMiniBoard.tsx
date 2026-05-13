import { useState, useContext } from 'react'
import Player from './Player';
import { BargeesGameContext } from "./../../../contexts/BargeesGameContext"

const getCellCount = (position: string) => {
    return position === "right" || position === "left" ? 8 : 3;
}

export default function BargeesMiniBoard({ position, startIndex = 0, isTransparent = false, initialCellIndex = -1, safeCells = [], winCell = -1, home = "no" }) {
    const { player1ActiveElements,
        setPlayer1ActiveElements,
        player2ActiveElements,
        setPlayer2ActiveElements,
        globalBoard,
        setGlobalBoard,
        selectedPieceIndex,
        setSelectedPieceIndex,
        playerTurn,
        gameState
    } = useContext(BargeesGameContext);

    const cellCount = getCellCount(position);
    const localHomeIdx = home != "no" ? cellCount - 1 : -1;
    const globalHomeIdx = home != "no" ? startIndex + localHomeIdx : -1;

    const totalPoints = 8 * 3;
    const [boardState] = useState<(string | null)[]>(Array(totalPoints).fill(null));

    const HOME_IDX = home === "player1" ? 19 : home === "player2" ? 7 : -1;
    const inactivePieces = home === "player1" ? Math.max(0, 4 - player1ActiveElements) : Math.max(0, 4 - player2ActiveElements);

    function getCellStyles(index: number) {
        const globalIndex = startIndex + localIndex;
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

    // function handleCellClick(localIndex: number) {
    //     if (gameState !== "playing") return;

    //     const globalIndex = startIndex + localIndex;
    //     const currentContent = globalBoard[globalIndex];

    //     if (selectedPieceIndex !== -1) {
    //         if (currentContent === selectedPieceIndex) return;

    //         const currentPlayer = selectedPieceIndex.split('-')[0];
    //         if (currentPlayer != playerTurn) return;

    //         const newBoard = [...globalBoard];

    //         const oldGlobalIndex = newBoard.indexOf(selectedPieceIndex);
    //         if (oldGlobalIndex !== -1) {
    //             newBoard[oldGlobalIndex] = null;
    //         }

    //         newBoard[globalIndex] = selectedPieceIndex;

    //         setGlobalBoard(newBoard);
    //         setSelectedPieceIndex(-1);

    //         if (oldGlobalIndex === -1)
    //     }
    // }

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
                        {index}
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