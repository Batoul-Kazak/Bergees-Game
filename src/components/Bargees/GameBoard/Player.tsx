import React from 'react'

import { useContext } from "react";
import { BargeesGameContext } from '../../../contexts/BargeesGameContext';

import player1Img from "./../../../../public/images/solider.png";
import player2Img from "./../../../../public/images/hourse.png";

export default function Player({ player, id }) {
    const { selectedPieceIndex,
        setSelectedPieceIndex,
        playerTurn,
        gameState,
        playerCurrentScore
    } = useContext(BargeesGameContext);

    const pieceId = `${player}-${id}`;
    const isSelected = selectedPieceIndex === pieceId;
    const isPlayerTurn = player == playerTurn && gameState === "playing";
    // const canMove = isPlayerTurn && isSelected && (playerCurrentScore > 0);

    function handleClick() {
        if (!isPlayerTurn) return;

        if (isSelected) {
            setSelectedPieceIndex(-1);
        } else {
            setSelectedPieceIndex(pieceId);
        }
    }

    const isActiveStyle = isSelected ? "ring-4 ring-yellow-500 scale-125 opacity-100 shadow-lg z-20" : "opacity-90 hover:scale-110";

    return (
        <div className={`w-6 h-6 rounded-full cursor-pointer transition-all duration-200 border-2 border-white
             ${isActiveStyle}
             `}
            style={{
                // backgroundImage: `url(${player == "player1" ? player1Img : player2Img})`,
                // backgroundSize: 'cover',
                // backgroundPosition: 'center',
                backgroundColor: player === "player1" ? "#6b21a8" : "#1e40af", // Fallback color
            }}
            onClick={handleClick}
        ></div>
    )
}
