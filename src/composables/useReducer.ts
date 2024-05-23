import { readonly, ref, type Ref } from "vue";
import type { ReducerWithAction, ReducerWithoutAction } from "../types";

export function isReducerWithoutAction<S, A>(
  reducer: ReducerWithAction<S, A> | ReducerWithoutAction<S>
): reducer is ReducerWithoutAction<S> {
  return reducer.length === 1;
}

export const useReducer = <S, A>(
  reducer: ReducerWithAction<S, A> | ReducerWithoutAction<S>,
  initialState: S
) => {
  const state = ref(initialState) as Ref<S>;

  function createDispatchFunction() {
    if (isReducerWithoutAction(reducer)) {
      return () => {
        const updatedState = reducer(state.value);
        state.value = updatedState;
      };
    }

    return (action: A) => {
      const updatedState = reducer(state.value, action);
      state.value = updatedState;
    };
  }

  const dispatchAction = createDispatchFunction();

  return [readonly(state), dispatchAction] as const;
};
