import { useState } from 'react';

export default function Nineteen_NinteenGrid() {
    const boardSize = 19;
    const totalPoints = boardSize * boardSize;
    const [boardState, setBoardState] = useState<(string | null)[]>(Array(totalPoints).fill(null));

    const handlePointClick = (index: number) => {
        setBoardState((prev) => {
            const newState = [...prev];
            if (newState[index] === null) newState[index] = 'black';
            else if (newState[index] === 'black') newState[index] = 'white';
            else newState[index] = null;
            return newState;
        });
    };

    const isStarPoint = (index: number, size: number) => {
        const row = Math.floor(index / size);
        const col = index % size;
        const stars = [3, 9, 15];
        return stars.includes(row) && stars.includes(col);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-4">
            <h1 className="text-white text-2xl mb-4 font-bold">Bargees Board</h1>

            <div
                className="grid gap-0 bg-[#dcb35c] p-2 rounded shadow-2xl border-4 border-[#8b5a2b]"
                style={{
                    gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
                    width: "min(90vw, 600px)",
                    aspectRatio: "1/1"
                }}
            >
                {boardState.map((stone, index) => {
                    const isStar = isStarPoint(index, boardSize);
                    return (
                        <div
                            key={index}
                            onClick={() => handlePointClick(index)}
                            className="relative w-full h-full flex items-center justify-center cursor-pointer group"
                        >
                            <div className="absolute inset-0 border-[0.5px] border-black/20 pointer-events-none">{index}</div>

                            {/* {isStar && (
                                <div className="absolute w-1.5 h-1.5 bg-black rounded-full z-0 opacity-60"></div>
                            )} */}

                            {stone && (
                                <div
                                    className={`w-[85%] h-[85%] rounded-full shadow-lg z-10 transition-transform duration-200 hover:scale-110
                  ${stone === 'black'
                                            ? 'bg-black radial-gradient(circle at 30% 30%, #555, #000)'
                                            : 'bg-white radial-gradient(circle at 30% 30%, #fff, #ccc)'
                                        }`}
                                ></div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}