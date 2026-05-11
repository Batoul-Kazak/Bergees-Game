import { useState } from 'react'

export default function BargeesMiniBoard({ position, isTransparent = false }) {
    const totalPoints = 8 * 3;
    const [boardState, setBoardState] = useState<(string | null)[]>(Array(totalPoints).fill(null));

    return (
        // <div className="flex flex-col items-center justify-center min-h-screen">
        <div
            className="grid gap-0 bg-[#dcb35c] rounded shadow-2xl border-4 border-[#8b5a2b]"
            style={{
                gridTemplateColumns: `repeat(${position == "right" || position == "left" ? 8 : 3}, minmax(0, 1fr))`,
                width: "min(40vw, 200px)",
                aspectRatio: "1/1",
                opacity: `${isTransparent ? "0" : "100%"}`,
                height: "min(40vw, 200px)"
            }}
        >{boardState.map((stone, index) =>
            <div className="border-[0.5px] inset-0 border-wood-700 bg-wood-500" key={index}></div>
        )}</div>
        // </div>
    )
}
