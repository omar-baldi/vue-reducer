/* eslint-disable */
import { readonly, Ref, ref } from "vue";

export type Reducer<S, A> = (prevState: S, action: A) => S;

export const useReducer = <S, A>(reducer: Reducer<S, A>, initialState: S) => {
  const state = ref(initialState) as Ref<S>;

  function dispatch(action: A) {
    state.value = reducer(state.value, action);
  }

  return [readonly(state), dispatch] as const;
};
