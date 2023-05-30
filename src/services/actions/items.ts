import {CircleProps} from "../../components/ui/circle/circle";
import {AppThunkAction} from "../../store";
import {bubbleSort, fibonacci, selectionSort, stringExpand} from "../../utils/algorithms";
import {ThunkDispatch} from "redux-thunk";
import {TAppDispatch} from "../../hooks/redux";
import {Direction} from "../../types/direction";
import {ColumnProps} from "../../components/ui/column/column";

export const SET_ITEMS: "SET_ITEMS" = "SET_ITEMS";
export const CLEAN_ITEMS: "CLEAN_ITEMS" = "CLEAN_ITEMS";
export const BREAK_CALCULATION: "BREAK_CALCULATION" = "BREAK_CALCULATION";
export const START_COMPUTATION: "START_COMPUTATION" = "START_COMPUTATION";
export const STOP_COMPUTATION: "STOP_COMPUTATION" = "STOP_COMPUTATION";
export const CREATE_COLUMN_ITEMS: "CREATE_COLUMN_ITEMS" = "CREATE_COLUMN_ITEMS";

export interface IStartComputationAction {
    readonly type: typeof START_COMPUTATION;
}

export interface IStopComputationAction {
    readonly type: typeof STOP_COMPUTATION;
}

export interface ISetItemsAction {
    readonly type: typeof SET_ITEMS;
    readonly data: CircleProps[];
}

export interface ICleanItemsAction {
    readonly type: typeof CLEAN_ITEMS;
}

export interface IBreakCalculationAction {
    readonly type: typeof BREAK_CALCULATION;
}

export type TItemsActions = ISetItemsAction|ICleanItemsAction|IBreakCalculationAction|IStartComputationAction|IStopComputationAction
    ;



const setItemsArray = (circles:CircleProps[]): ISetItemsAction => ({
    type: SET_ITEMS,
    data: circles
});

export const cleanItems = (): ICleanItemsAction => ({
    type: CLEAN_ITEMS});

export const breakCalculation = (): IBreakCalculationAction => ({
    type: BREAK_CALCULATION});

export function setItems(circles:CircleProps[]): AppThunkAction<boolean> {
    return function (dispatch,store) {
        const breakCalc=store().items.breakCalculation;
        if( breakCalc) {
            return true
        }
        dispatch(setItemsArray(circles));
        return false;
    };
}

const stopComputation = (): IStopComputationAction => ({
    type: STOP_COMPUTATION,
});

function calculationsFinally(dispatch:TAppDispatch )
{
        //установим флаг окончания расчёта для разблокировки кнопки "Рассчитать"
        dispatch(stopComputation());
        //очистим хранилище элементов сортировки и флаг прерывания расчёта
        dispatch(cleanItems());
}

export function startStringComputation(text:string): AppThunkAction<void> {
    return function (dispatch) {
        dispatch({type: START_COMPUTATION});

        const newPromise = new Promise(async function(resolve) {
            await stringExpand(text,dispatch)
            resolve(undefined);
        });
        newPromise
            .finally(()=>calculationsFinally(dispatch));
    };
}

export function startFibonacciComputation(text:number): AppThunkAction<void> {
    return function (dispatch) {
        dispatch({type: START_COMPUTATION});

        const newPromise = new Promise(async function(resolve) {
            await fibonacci(text,dispatch)
            resolve(undefined);
        });
        newPromise
            .finally(()=>calculationsFinally(dispatch));
    };
}

export function startBubbleComputation(arr:ColumnProps[],direction:Direction): AppThunkAction<void> {
    return function (dispatch) {
        dispatch({type: START_COMPUTATION});
        const newPromise = new Promise(async function(resolve) {
            await bubbleSort(arr,direction,dispatch)
            resolve(undefined);
        });
        newPromise
            .finally(()=>calculationsFinally(dispatch));
    };
}

export function startSelectionComputation(arr:ColumnProps[],direction:Direction): AppThunkAction<void> {
    return function (dispatch) {
        dispatch({type: START_COMPUTATION});
        const newPromise = new Promise(async function(resolve) {
            await selectionSort(arr,direction,dispatch)
            resolve(undefined);
        });
        newPromise
            .finally(()=>calculationsFinally(dispatch));
    };
}

export function stopComputationAction(): AppThunkAction<void> {
    return function (dispatch,store) {
        // установим флаг прерывания расчёта
        dispatch(breakCalculation())
        if(!store().items.isComputationRun)
        {
            dispatch(cleanItems());
        }
    };
}
