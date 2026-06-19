import { useSettings } from './contexts/SettingContext';
import BargeesGame from './components/Bargees/BargeesGame';

export default function Games() {
    const {activeGame} = useSettings();
  return (
    <div>
        {activeGame === "bargees" && <BargeesGame />}
        {activeGame === "chess" && <div>Chess Game Coming Soon...</div>}
        {activeGame === "dama" && <div>Dama Game Coming Soon...</div>}
        {activeGame === "memoryGame" && <div>Memory Game Coming Soon...</div>}
        {activeGame === "moveTheBlock" && <div>Move The Block Game Coming Soon...</div>}
        {activeGame === "diamondRush" && <div>Diamond Rush Game Coming Soon...</div>}
    </div>
  )
}
