import { COWRIE_VALUES } from '../constants/CowrieValues';


export function convertCowriesType(curType, value)
{
    if(!value || (curType !== "string" || curType != "number" || curType !== "array")) return;

    const cowrie = curType === "string" ? COWRIE_VALUES.find(item => item.cowriesName === value) : 
    COWRIE_VALUES.find(item => item.actualValue === value);
    const result = curType === "string" ? cowrie?.actualValue : cowrie?.cowriesName;

    return result;
}