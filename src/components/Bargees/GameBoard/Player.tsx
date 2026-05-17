import React from 'react'

import { useContext } from "react";
import { BargeesGameContext } from '../../../contexts/BargeesGameContext';

// import player1Img from "./../../../../public/images/solider.png";
// import player2Img from "./../../../../public/images/horse.png";

export default function Player({ player, id }) {
    const { selectedPieceIndex,
        setSelectedPieceIndex,
        playerTurn,
    } = useContext(BargeesGameContext);

    const pieceId = `${player}-${id}`;
    const isSelected = selectedPieceIndex === pieceId;

    function handleClick(e) {
        e.stopPropagation();

        if (player !== playerTurn) return;

        if (isSelected) {
            setSelectedPieceIndex(-1);
        } else {
            setSelectedPieceIndex(pieceId);
        }
    }

    const isActiveStyle = isSelected ? "ring-4 ring-yellow-500 scale-122 opacity-100 shadow-lg z-20 border-0" : "opacity-90 hover:scale-110 border-3";

    return (
        <div className={`w-5 h-5 rounded-full absolute cursor-pointer transition-all duration-200  border-white
             ${isActiveStyle}
             `}
            style={{
                // backgroundImage: `url(${player == "player1" ? player1Img : player2Img})`,
                // backgroundSize: 'cover',
                // backgroundPosition: 'center',
                backgroundColor: player === "player1" ? "#334499" : "#992277", 
            }}
            onClick={(e) => handleClick(e)}
        ></div>
    )
}
