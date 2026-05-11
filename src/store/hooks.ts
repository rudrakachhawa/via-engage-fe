import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "@/store/index";
import type { UserState } from "@/store/slices/userSlice";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useUserState(): UserState;
export function useUserState<K extends keyof UserState>(key: K): UserState[K];
export function useUserState<K extends keyof UserState>(key?: K) {
  if (key) {
    return useAppSelector((state: RootState) => state.user[key]);
  }
  return useAppSelector((state: RootState) => state.user);
}
