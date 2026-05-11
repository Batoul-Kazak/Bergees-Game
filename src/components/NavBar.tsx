import React from 'react'


export default function NavBar() {
    return (
        <div className="
        absolute -top-12 right-10
        bg-linear-to-b from-mint-500 to-[#00552277] rounded-tr-4xl border-2 
        border-double border-blue-500
        rounded-tl-4xl
         text-white font-bold">
            <ul className="flex place-content-end px-10 pr-25 [&_button]:py-2 [&_button:hover]:bg-mint-500 
            [&_button:hover]:text-white
            [&_button]:cursor-pointer [&_button]:px-6 [&_button:hover]:border-x-2 [&_button:hover]:border-mint-500">
                <li className="border-x-2 border-mint-7 bg-radial from-mint-500 to-mint-700">
                    <button>Home</button>
                </li>
                <li>
                    <button>About Us</button>
                </li>
                <li>
                    <button>Services</button>
                </li>
                <li>
                    <button>Game</button>
                </li>
                <li>
                    <button>Contact</button>
                </li>
            </ul>
        </div>
    )
}
