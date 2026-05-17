import React from 'react'
import Stone from './Stone'
import { useState, useEffect, useContext } from "react"
import { BargeesGameContext } from "../../../contexts/BargeesGameContext"

export default function Kitchen() {
    const { gameState,
        availableMoveNames,
        setAvailableMoveNames,
        playerCowriesCarryScore,
        setPlayerCowriesCarryScore
    } = useContext(BargeesGameContext)
    const [gridContent, setGridContent] = useState([]);

    function handleStonesResultName(frontSideStones) {
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
        // const allCells = Array.from({ length: 9 }, (_, i) => i);
        const FrontSideStones = Math.floor(Math.random() * 7);
        const BackSideStones = 6 - FrontSideStones;

        const stones = [
            ...Array(FrontSideStones).fill("front"),
            ...Array(BackSideStones).fill("back"),
            null, null, null
        ];

        const currentCowriesValue_ = handleStonesResultName(FrontSideStones)[0];
        setAvailableMoveNames(currentCowriesValue_);

        const stonesCarryValue_ = handleStonesResultName(FrontSideStones)[0];
        setAvailableMoveNames(availableMoveNames => availableMoveNames + currentCowriesValue_);
        setPlayerCowriesCarryScore(playerCowriesCarryScore => playerCowriesCarryScore + stonesCarryValue_);

        const shuffled = stones.sort(() => Math.random() - 0.5);
        setGridContent(shuffled);
    }, []);

    return (
        <div className="w-60 h-30 bg-black-500 flex overflow-hidden justify-center items-center"
            style={{
                width: "min(40vw, 240px)",
                aspectRatio: "1/1",
                height: "min(40vw, 220px)",
            }}
        >
            <div className="bg-black-700 rotate-45 flex justify-center items-center "
                style={{
                    width: "min(40vw, 220px)",
                    aspectRatio: "1/1",
                    height: "min(40vw, 220px)",
                }}
            >
                {(gameState === "playing") && <div className="w-[40%] h-[60%] grid grid-cols-3 grid-rows-3">
                    {gridContent.map((type, index) => (
                        <div key={index}>
                            {type && <Stone type={type} />}
                            {
                                type == null && <div className="w-2 h-2 bg-transparent"></div>
                                // <p className="text-white">{currentCowrieValues}</p>
                            }
                        </div>
                    ))}
                </div>}
            </div>
        </div>
    )
}
