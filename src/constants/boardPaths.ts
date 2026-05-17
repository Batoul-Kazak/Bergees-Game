import { PLAYER_1_REST_CELLS, PLAYER_2_REST_CELLS, WIN_CELLS } from "./boardWinCells";
import { PLAYER_2_HOME_1, PLAYER_1_HOME_1 } from './boardHomes';

export const PLAYER_1_PATH = [
    {start: 168, end: 163, step: -1},
    {start: 163, end: 143, step: -20}, //-1-19
    {start: 143, end: 10, step: -19},
    {start: 10, end: 8, step: -1},
    {start: 8, end: 141, step: +19},
    {start: 141, end: 159, step: +18}, //+19-1
    {start: 159, end: 152, step: -1},
    {start: 152, end: 190, step: +19},
    {start: 190, end: 197, step: +1},
    {start: 197, end: 217, step: +20}, //+1+19
    {start: 217, end: 350, step: +19}, 
    {start: 350, end: 352, step: +1},
    {start: 352, end: 219, step: -19},
    {start: 219, end: 201, step: -18}, //-19+1
    {start: 201, end: 208, step: +1},
    {start: 208, end: 189, step: -19},
    {start: 189, end: 182, step: -1},
    {start: 182, end: 181, step: -1},
];

export const PLAYER_2_PATH = [
    {start: 192, end: 197, step: +1},
    {start: 197, end: 217, step: +20}, //+1+19
    {start: 217, end: 350, step: +19}, 
    {start: 350, end: 352, step: +1}, 
    {start: 352, end: 219, step: -19}, 
    {start: 219, end: 201, step: -18},  //-19+1
    {start: 201, end: 208, step: +1},  
    {start: 208, end: 170, step: -19},  
    {start: 170, end: 163, step: -1},  
    {start: 163, end: 143, step: -20},  //-1-19
    {start: 143, end: 10, step: -19},  
    {start: 10, end: 8, step: -1},  
    {start: 8, end: 141, step: +19},  
    {start: 141, end: 159, step: +18},  //+19-1
    {start: 159, end: 152, step: -1},  
    {start: 152, end: 171, step: +19},  
    {start: 171, end: 178, step: +1},  
    {start: 178, end: 179, step: +1},  
];

const OUT_CELLS = [28, 47,66,85,104,123,142,218,237,256,275,294,313,332]
export const FORBIDDEN_CELLS = WIN_CELLS.concat(OUT_CELLS);

export const PLAYER_1_FORBIDDEN_CELLS = FORBIDDEN_CELLS.concat(PLAYER_2_REST_CELLS).concat(PLAYER_2_HOME_1).concat([PLAYER_1_HOME_1 + 1, PLAYER_1_HOME_1 + 2]);
export const PLAYER_2_FORBIDDEN_CELLS = FORBIDDEN_CELLS.concat(PLAYER_1_REST_CELLS).concat(PLAYER_1_HOME_1).concat([PLAYER_2_HOME_1 - 1, PLAYER_2_HOME_1 - 1]);