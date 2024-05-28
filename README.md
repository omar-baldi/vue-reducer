## About

_**vue-reducers-hooks**_, inspired by Redux, is a package designed specifically for Vue applications. It provides two powerful composables that facilitate handling state in a Redux-like manner:

- **useReducer**: a composable that allows you to manage state using a reducer function, providing a simple and predictable way to update state based on actions.

- **useCombineReducers**: a composable that enables you to combine multiple reducers into a single state management function, making it easier to manage complex state across different parts of your application.

## Getting Started

Install with npm:
`npm i vue-reducers-hooks`

### Reducer

Define your initial state and reducer function:

```typescript
const todosState = {
  todos: [
    { id: 1, text: "Learn Vue.js", completed: false },
    { id: 2, text: "Build a to-do app", completed: false },
  ],
};

const todosReducer = (
  state = todosState,
  action:
    | { type: "ADD_TODO"; payload: { id: number; text: string } }
    | { type: "REMOVE_TODO"; payload: { id: number } }
): typeof todosState => {
  switch (action.type) {
    case "ADD_TODO": {
      const { id, text } = action.payload;
      return {
        ...state,
        todos: [...state.todos, { id, text, completed: false }],
      };
    }
    case "REMOVE_TODO": {
      const { id } = action.payload;
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== id),
      };
    }
    default:
      return state;
  }
};
```

Use the '**useReducer**' composable in your component to manage state:

```typescript
import { useReducer } from "vue-reducers-hooks";

const [state, dispatch] = useReducer(todosReducer, initialState);
```

where "_**state**_" represents the current state of your application, while "_**dispatch**_" is a function used to dispatch actions to update the state.

### Combine Reducers

Use '**useCombineReducers**' when your Vue application's state management becomes complex, requiring multiple reducers to manage different parts of your application's state. This composable offers a modular approach to state management, allowing you to combine and manage multiple reducers efficiently.

Define your reducers function:

```typescript
const todosState = {
  todos: [
    { id: 1, text: "Learn Vue.js", completed: false },
    { id: 2, text: "Build a to-do app", completed: false },
  ],
};

const counterState = {
  count: 0,
};

const todosReducer = (
  state = todosState,
  action:
    | { type: "ADD_TODO"; payload: { id: number; text: string } }
    | { type: "REMOVE_TODO"; payload: { id: number } }
): typeof todosState => {
  switch (action.type) {
    case "ADD_TODO": {
      const { id, text } = action.payload;
      return {
        ...state,
        todos: [...state.todos, { id, text, completed: false }],
      };
    }
    case "REMOVE_TODO": {
      const { id } = action.payload;
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== id),
      };
    }
    default:
      return state;
  }
};

const counterReducer = (
  state = counterState,
  action: { type: "INCREMENT" } | { type: "DECREMENT" }
): typeof counterState => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};
```

Then combine them:

```typescript
import { useCombineReducers } from "vue-reducers-hooks";

const { dispatch, stateSelector } = useCombineReducers({
  todos: todosReducer,
  counter: counterReducer,
});
```

#### Dispatch actions

Update your reducers state by dispatching actions with the "**dispatchCombineReducer**" method. Simply specify the key of the reducer you wish to target for updating.

```typescript
const todosDispatch = dispatch("todos");
const counterDispatch = dispatch("counter");

todosDispatch({ type: "ADD_TODO", payload: { id: 3, text: "new todo" } });

todosDispatch({ type: "REMOVE_TODO", payload: { id: 1 } });

counterDispatch({ type: "INCREMENT" });
```

#### Select state

Utilize the "**stateSelector**" method to access and extract specific portions of the global state.
This method keeps the selected state reactive, ensuring your UI updates automatically when the state changes.

```typescript
const updatedCounter = stateSelector((state) => state.counter?.count);
```

## Contributing

Whether you want to report a bug, request a feature or submit a pull request, your contribution is **greatly appreciated**.

Don't forget to show your support by giving the project a star!

## License

Distributed under the MIT License. See `LICENSE` for more information.
