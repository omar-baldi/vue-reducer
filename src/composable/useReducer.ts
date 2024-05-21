/* eslint-disable */
import { readonly, type Ref, ref } from "vue";

export type ReducerWithAction<S, A> = (prevState: S, action: A) => S;
export type ReducerWithoutAction<S> = (prevState: S) => S;

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
