export type ReducerWithAction<S, A> = (prevState: S, action: A) => S;

export type ReducerWithoutAction<S> = (prevState: S) => S;

export type ReducersState<T extends Record<string, ReducerWithAction<any, any>>> = {
  [P in keyof T]: Parameters<T[P]>[0];
};

export type Selector<S extends ReducersState<any>, V> = (state: S) => V;
