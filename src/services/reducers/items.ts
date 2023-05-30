import {CircleProps} from "../../components/ui/circle/circle"
import {
    CLEAN_ITEMS,
    SET_ITEMS,
    BREAK_CALCULATION,
    START_COMPUTATION,
    STOP_COMPUTATION,
    TItemsActions
} from "../actions/items";
import {ColumnProps} from "../../components/ui/column/column";


export interface IItemsState {
    breakCalculation: boolean;
    isComputationRun: boolean;
    items: CircleProps[] | ColumnProps[];
}

export const initStateItems: IItemsState = {
    breakCalculation: false,
    isComputationRun: false,
    items: new Array<CircleProps>(0)
};

export const itemsReducer = (state = initStateItems, action: TItemsActions) => {
    switch (action.type) {
        case CLEAN_ITEMS: {
            //если страницу ещё не покидали
            if (!state.breakCalculation) return {
                ...state
            }
            return {
                ...state,
                items: initStateItems.items,
                breakCalculation: initStateItems.breakCalculation
            };
        }
        case BREAK_CALCULATION: {
            return {
                ...state,
                breakCalculation: true,
            };
        }
        case START_COMPUTATION: {
            return {
                ...state,
                isComputationRun: true,
            };
        }
        case STOP_COMPUTATION: {
            return {
                ...state,
                isComputationRun: false,
            };
        }
        case SET_ITEMS: {
            return {
                ...state,
                items: [...action.data],
            }
        }
        default: {
            return state;
        }
    }
};
