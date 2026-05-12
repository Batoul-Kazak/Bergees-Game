import BargeesMiniBoard from './BargeesMiniBoard'
import Kitchen from './Kitchen'


export default function BargeesMainBoard() {


    return (
        <div className="grid grid-cols-3 -rotate-45 justify-center items-center ">
            <BargeesMiniBoard position="top" isTransparent={true} />
            <BargeesMiniBoard position="top" safeCells={[6, 8]} />
            <BargeesMiniBoard position="top" isTransparent={true} home="player1" />
            {/* <div className="flex flex-col"> */}
            <BargeesMiniBoard position="left" initialCellIndex={18} winCell={15} safeCells={[18, 2]} />
            {/* <BargeesMiniBoard position="none" isTransparent={true} /> */}
            <Kitchen />
            <BargeesMiniBoard position="right" initialCellIndex={5} winCell={8} safeCells={[5, 21]} />
            {/* </div> */}
            <BargeesMiniBoard position="bottom" isTransparent={true} home="player2" />
            <BargeesMiniBoard position="bottom" safeCells={[15, 17]} />
            <BargeesMiniBoard position="bottom" isTransparent={true} />
        </div>
    )
}
