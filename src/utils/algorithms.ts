import {CircleProps} from "../components/ui/circle/circle";
import {ElementStates} from "../types/element-states";
import {setItems} from "../services/actions/items";
import {TAppDispatch} from "../hooks/redux";
import {ColumnProps} from "../components/ui/column/column";
import {Direction} from "../types/direction";
import {setTimeoutAsync} from "./common";
import {DELAY_IN_MS} from "../constants/delays";


//изменяет массив отображаемых элементов, и
//записывает его в хранилище.
//возвращает true при необходимости прервать расчет
export async function changeArr(array: CircleProps[],
                                dispatch: TAppDispatch,
                                changes:
                                    {
                                        changingIndx?: number[],
                                        modifiedIndx?: number[],
                                        defaultIndx?: number[],
                                        head?: number,
                                        tail?: number
                                    },
                                pause: number = DELAY_IN_MS) {
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

    if (dispatch(setItems(array))) {
        return true
    }
    await setTimeoutAsync(pause)
    return false;
}

export async function stringExpand(text: string, dispatch: TAppDispatch) {
    const countSteps = text.length / 2;
    const textArray = Array.from(text).map((i) => {
        const x: CircleProps = {letter: `${i}`};
        return x;
    });

    for (let i = 0; i < countSteps; i++) {
        const ind2 = text.length - 1 - i;
        if (await changeArr(textArray, dispatch, {changingIndx: [i, ind2]})) {
            return
        }

        textArray[i].letter = text[ind2];
        textArray[ind2].letter = text[i];
        if (await changeArr(textArray, dispatch, {modifiedIndx: [i, ind2]})) {
            return
        }
    }
}

export async function fibonacci(countSteps: number, dispatch: TAppDispatch) {
    const array: CircleProps[] = [];
    for (let i = 0; i <= countSteps; i++) {
        const prevVal = (array.length <= 0) ? 1 : Number(array[array.length - 1].letter);
        const prevVal2 = (array.length <= 1) ? 0 : Number(array[array.length - 2].letter);
        array.push({letter: `${prevVal + prevVal2}`, index: i})
        if (await changeArr(array, dispatch, {})) {
            return
        }
    }
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

export async function bubbleSort(arr: ColumnProps[], direction: Direction = Direction.Ascending, dispatch: TAppDispatch) {
    const isSwap = getSwapChecker(direction)

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (isSwap(arr[j], arr[j + 1])) {
                swap(arr, j, j + 1)
            }
            if (await changeArr(arr, dispatch, {changingIndx: [j, j + 1], defaultIndx: j - 1 >= 0 ? [j - 1] : []})) {
                return
            }
        }
        if (await changeArr(arr, dispatch, {
            modifiedIndx: i == arr.length - 2 ? [arr.length - i - 1, 0] : [arr.length - i - 1],
            defaultIndx: i < arr.length - 2 ? [arr.length - i - 2] : []
        })) {
            return
        }
    }
}

export async function selectionSort(arr: ColumnProps[], direction: Direction = Direction.Ascending, dispatch: TAppDispatch) {

    const isSwap = getSwapChecker(direction)

    for (let i = 0; i < arr.length - 1; i++) {
        let minIndx = i;
        arr[i].state = ElementStates.Changing
        // if(await changeArr(arr,dispatch,{changingIndx:[i]}))
        // {return}
        for (let j = i + 1; j < arr.length; j++) {
            if (isSwap(arr[minIndx], arr[j])) {
                minIndx = j
            }
            if (await changeArr(arr, dispatch, {changingIndx: [j]})) //, defaultIndx:j>i+1?[j-1]:[]
            {
                return
            }
            arr[j].state = ElementStates.Default
        }
        swap(arr, i, minIndx)
        arr[i].state = ElementStates.Default
        arr[minIndx].state = ElementStates.Default
        if (await changeArr(arr, dispatch, {
            modifiedIndx: i < arr.length - 2 ? [i] : [i, i + 1],
            defaultIndx: i < arr.length - 2 ? [arr.length - 1] : []
        })) //
        {
            return
        }

    }
}



