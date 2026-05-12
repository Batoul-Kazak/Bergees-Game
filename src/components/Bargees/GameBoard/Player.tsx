import React from 'react'

export default function Player({ player }) {
    return (
        <div className={`w-4 h-4 rounded-xl ${player == "player1" ? "bg-purple-800" : "bg-blue-800"} border-2 border-white`}></div>
    )
}
