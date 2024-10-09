import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RooState } from "../store";

export const useAppSelector: TypedUseSelectorHook<RooState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;