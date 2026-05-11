import React from 'react'
import NavBar from './components/NavBar'
import BargeesMainBoard from './components/Bargees/BargeesMainBoard'

export default function App() {
    return (
        <div className="bg-gray-700 w-240 relative top-[50%] left-[50%] translate-x-[-50%] rounded-3xl h-130 border-2 border-double border-gray-500
            flex justify-center items-center
        ">
            {/* <div className="h-[100px] w-[100px] bg-gray-700 absolute -top-10 left-20"></div> */}
            <NavBar />
            <BargeesMainBoard />
        </div>
    )
}
