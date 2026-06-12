import React, { useContext } from 'react'
import { BargeesGameContext } from '../../../contexts/BargeesGameContext';

export default function WinningDialog() {
    const {message} = useContext(BargeesGameContext);
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center z-100">
        <div className="bg-white p-10 text-black bold" >{message}</div>
    </div>
  )
}
