import { useReducer } from "@/composables/useReducer";

describe("useReducer", () => {
  it("should update relevant state by dispatching action", () => {
    const initialState = { numbers: [1, 2, 3], comments: ["First comment"] };
    const reducer = (
      state: typeof initialState,
      action:
        | { type: "ADD_NUMBER"; payload: number }
        | { type: "ADD_COMMENT"; payload: string }
    ): typeof initialState => {
      switch (action.type) {
        case "ADD_NUMBER": {
          const { payload: numberToAdd } = action;
          return {
            ...state,
            numbers: [...state.numbers, numberToAdd],
          };
        }
        case "ADD_COMMENT": {
          const { payload: commentToAdd } = action;
          return {
            ...state,
            comments: [...state.comments, commentToAdd],
          };
        }
        default: {
          return state;
        }
      }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    expect(state.value.comments).toEqual(["First comment"]);
    expect(state.value.numbers).toEqual([1, 2, 3]);
    dispatch({ type: "ADD_NUMBER", payload: 12 });
    expect(state.value.comments).toEqual(["First comment"]);
    expect(state.value.numbers).toEqual([1, 2, 3, 12]);
  });
});
