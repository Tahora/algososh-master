import { combineReducers } from "redux";
import {initStateItems, itemsReducer} from "./items";


export const rootReducer = combineReducers({
  items: itemsReducer

});

export const initState = {
  items:initStateItems
};
