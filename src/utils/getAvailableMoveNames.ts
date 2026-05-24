import { COWRIE_VALUES } from '../constants/CowrieValues';

export function getAvailableMoveNames(availableMoves)
{
    const result = Array.isArray(availableMoves) ? 
    availableMoves.map(move => {
      const match = COWRIE_VALUES.find(c => c.actualValue[0] === move[0] && c.actualValue[1] === move[1]);
      return match ? match.cowriesName : "unknown";
    }) : [];

    return result;
}
