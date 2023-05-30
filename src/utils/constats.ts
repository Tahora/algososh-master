import {setTimeoutAsync} from "./common";

export const timeout:number=1000;
export const smallTimeout:number=500;
export const timer=(pause:number=timeout)=>setTimeoutAsync(pause);
