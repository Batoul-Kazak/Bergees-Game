import React from 'react'
import CowrieFrontSide from "./../../../../public/images/CowrieShellFrontSide.png"
import CowrieBackSide from "./../../../../public/images/CowrieShellBackSide.png"



export default function Cowrie({ type = "front" }) {
    return (
        <div>
            {type == "front" ? <img src={CowrieFrontSide} alt="stone1" className="w-10 h-10 object-contain rounded-full" />
                :
                <img src={CowrieBackSide} alt="stone1" className="w-10 h-10 object-contain rounded-full" />
            }
        </div>
    )
}
