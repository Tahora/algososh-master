import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "../services/reducers";
import thunk, {ThunkAction} from "redux-thunk";

import {AnyAction} from "redux";


export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;
export type AppThunkAction<R> = ThunkAction<R, RootState, unknown, AnyAction>;


