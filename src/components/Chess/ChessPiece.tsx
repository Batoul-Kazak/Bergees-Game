import WhiteQueen from "../../../public/images/white-queen.png"
import BlackQueen from "../../../public/images/black-queen.png"

import WhiteKing from "../../../public/images/white-king.svg"
import BlackKing from "../../../public/images/black-king.svg"

import WhitePawn from "../../../public/images/white-pawn.png"
import BlackPawn from "../../../public/images/black-pawn.png"

import WhiteKnight from "../../../public/images/white-knight.png"
import BlackKnight from "../../../public/images/black-knight.png"

import WhiteBishop from "../../../public/images/white-bishop.png"
import BlackBishop from "../../../public/images/black-bishop.svg"

import WhiteRook from "../../../public/images/white-rook.png"
import BlackRook from "../../../public/images/black-rook.png"


export default function ChessPiece({player, type})
{
    const fullType = `${player}-${type}`;
    function getPieceImage()
    {
        switch(fullType)
        {
            case "white-queen": return WhiteQueen;
            case "black-queen": return BlackQueen;
            case "white-king": return WhiteKing;
            case "black-king": return BlackKing;
            case "white-pawn": return WhitePawn;
            case "black-pawn": return BlackPawn;
            case "white-bishop": return WhiteBishop;
            case "black-bishop": return BlackBishop;
            case "white-rook": return WhiteRook;
            case "black-rook": return BlackRook;
            case "white-knight": return WhiteKnight;
            case "black-knight": return BlackKnight;
        }

    }

    const pieceImage = getPieceImage()
    // const {setSelectedPiece} = useContext(ChessGameContext);

    return (
        <div className={` text-white p-2 h-20 w-10 absolute bottom-2 left-2`}
        
        style={{
             backgroundImage: `url(${pieceImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
        }}
        ></div>
    )
}