import React from 'react'
import Stone from './Stone'
import { useState, useEffect, useContext } from "react"
import { BargeesGameContext } from "../../../contexts/BargeesGameContext"

export default function Kitchen() {
    const { gameState } = useContext(BargeesGameContext)
    const [gridContent, setGridContent] = useState([]);

    useEffect(() => {
        // const allCells = Array.from({ length: 9 }, (_, i) => i);
        const FrontSideStones = Math.floor(Math.random() * 7);
        const BackSideStones = 6 - FrontSideStones;

        const stones = [
            ...Array(FrontSideStones).fill("front"),
            ...Array(BackSideStones).fill("back"),
            null, null, null
        ]

        const shuffled = stones.sort(() => Math.random() - 0.5);
        setGridContent(shuffled);
    }, [])

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
                            }
                        </div>
                    ))}
                </div>}
            </div>
        </div>
    )
}
