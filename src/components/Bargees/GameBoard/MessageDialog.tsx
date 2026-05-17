import { useContext } from 'react';
import { BargeesGameContext } from '../../../contexts/BargeesGameContext';
export default function MessageDialog()
{
    const {message} = useContext(BargeesGameContext);

    return <div className="absolute bottom-0 left-0 p-10 bg-amber-300 text-2xl text-red-500">{message}</div>
}