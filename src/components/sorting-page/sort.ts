import {Direction} from "../../types/direction";
import {ColumnProps} from "../ui/column/column";
import {CircleProps} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {arrayToColummnArray} from "../../utils/common";

export interface IBubbleParams {
    arrayNums: number[];
    direction?: Direction;
}

function isSwapDesc(i1: ColumnProps, i2: ColumnProps) {
    return i1.index < i2.index
}

function isSwapAsc(i1: ColumnProps, i2: ColumnProps) {
    return i1.index > i2.index
}

function getSwapChecker(direction: Direction) {
    switch (direction) {
        case Direction.Ascending:
            return isSwapAsc;
        case Direction.Descending:
            return isSwapDesc
    }
}

function swap(array: Array<any>, index1: number, index2: number) {
    const tempItem = array[index1];
    array[index1] = array[index2]
    array[index2] = tempItem
}

export async function bubbleSortBase({arrayNums, direction = Direction.Ascending} :IBubbleParams,
                    storeCallback?:  (array: CircleProps[],
                                      changes:{changingIndx?: number[],
                                          modifiedIndx?: number[],
                                          defaultIndx?: number[],
                                          head?: number,
                                          tail?: number
                                      },
                                      pause?: number)=>{}|null) {
    const array=arrayToColummnArray(arrayNums)
    const isSwap = getSwapChecker(direction)

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (isSwap(array[j], array[j + 1])) {
                swap(array, j, j + 1)
            }
            if(storeCallback) {
                await storeCallback(array, {changingIndx: [j, j + 1], defaultIndx: j - 1 >= 0 ? [j - 1] : []})
            }
        }
        if(storeCallback) {
            await storeCallback(array, {
                modifiedIndx: i == array.length - 2 ? [array.length - i - 1, 0] : [array.length - i - 1],
                defaultIndx: i < array.length - 2 ? [array.length - i - 2] : []
            })
        }

    }
    return array.map((i)=>{return i.index})
}



export async function selectionSortBase({arrayNums, direction = Direction.Ascending} :IBubbleParams,
                             storeCallback?:  (array: CircleProps[],
                                               changes:{changingIndx?: number[],
                                                   modifiedIndx?: number[],
                                                   defaultIndx?: number[],
                                                   head?: number,
                                                   tail?: number
                                               },
                                               pause?: number)=>{}|null) {
    const array=arrayToColummnArray(arrayNums)
    const isSwap = getSwapChecker(direction)

    for (let i = 0; i < array.length - 1; i++) {
        let minIndx = i;
        array[i].state = ElementStates.Changing
        for (let j = i + 1; j < array.length; j++) {
            if (isSwap(array[minIndx], array[j])) {
                minIndx = j
            }
            if(storeCallback) {
                await storeCallback(array, {changingIndx: [j]})
                array[j].state = ElementStates.Default
            }
        }
        swap(array, i, minIndx)
        if(storeCallback) {
            array[i].state = ElementStates.Default
            array[minIndx].state = ElementStates.Default
            await storeCallback(array, {
                modifiedIndx: i < array.length - 2 ? [i] : [i, i + 1],
                defaultIndx: i < array.length - 2 ? [array.length - 1] : []
            })
        }
    }
    return array.map((i)=>{return i.index})
}
