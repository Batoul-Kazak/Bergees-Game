import React from 'react'
import BargeesMiniBoard from './BargeesMiniBoard'

export default function BargeesMainBoard() {
    return (
        <div className="grid grid-cols-3 ">
            <BargeesMiniBoard position="top" isTransparent={true} />
            <BargeesMiniBoard position="top" />
            <BargeesMiniBoard position="top" isTransparent={true} />
            {/* <div className="flex flex-col"> */}
            <BargeesMiniBoard position="right" />
            <BargeesMiniBoard position="none" isTransparent={true} />
            <BargeesMiniBoard position="left" />
            {/* </div> */}
            <BargeesMiniBoard position="bottom" isTransparent={true} />
            <BargeesMiniBoard position="bottom" />
            <BargeesMiniBoard position="bottom" isTransparent={true} />
        </div>
    )
}
