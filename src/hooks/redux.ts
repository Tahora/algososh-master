import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export type TAppDispatch = TypedDispatch<RootState>;

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
