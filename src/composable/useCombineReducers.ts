import { readonly, shallowRef } from "vue";
import { ReducerWithAction, ReducersState } from "../types";

export const useCombineReducers = <T extends Record<string, ReducerWithAction<any, any>>>(
  reducers: T
) => {
  const globalState = shallowRef(
    (() => {
      return Object.fromEntries(
        Object.entries(reducers).map(([key, reducer]) => {
          const reducerState = reducer(undefined, {});
          return [key, reducerState];
        })
      ) as ReducersState<T>;
    })()
  );

  function dispatch<K extends keyof T>(key: K) {
    const reducer = reducers[key];

    if (!reducer) {
      throw new Error(`Reducer with key ${String(key)} not found`);
    }

    return (action: Parameters<typeof reducer>[1]) => {
      if (Object.prototype.hasOwnProperty.call(globalState.value, key)) {
        const prevState = globalState.value[key];

        globalState.value = {
          ...globalState.value,
          [key]: reducer(prevState, action),
        };
      }
    };
  }

  return {
    globalState: readonly(globalState),
    dispatch,
  };
};
