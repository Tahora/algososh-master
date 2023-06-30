import {CircleProps} from "../components/ui/circle/circle";
import {useState} from "react";
import {DELAY_IN_MS} from "../constants/delays";
import {ElementStates} from "../types/element-states";
import {setTimeoutAsync} from "../utils/common";

export function useStore() {
    const [isComputationRun, setIsComputationRun] = useState(false)
    const [items, setItems] = useState(new Array<CircleProps>(0))

    const startCalculation=<T>(callback:(p:T)=>Promise<void>, param:T)=>{
        setIsComputationRun(true)
        callback(param).then((res)=>setIsComputationRun(false))
    }


    const changeArr= async (array: CircleProps[],
                                    changes:
                                        {
                                            changingIndx?: number[],
                                            modifiedIndx?: number[],
                                            defaultIndx?: number[],
                                            head?: number,
                                            tail?: number
                                        },
                                    pause: number = DELAY_IN_MS) =>{
        changes.changingIndx?.forEach((i) => {
            array[i].state = ElementStates.Changing
        })
        changes.modifiedIndx?.forEach((i) => {
            array[i].state = ElementStates.Modified
        })
        changes.defaultIndx?.forEach((i) => {
            array[i].state = ElementStates.Default
        })
        changes.head != undefined && array.length > 0 && changes.head >= 0 && (array[changes.head].head = "head")
        changes.tail != undefined && array.length > 0 && changes.tail >= 0 && (array[changes.tail].tail = "tail")

        setItems([...array])
        await setTimeoutAsync(pause)
    }

    return { items, changeArr,isComputationRun,startCalculation };
}
