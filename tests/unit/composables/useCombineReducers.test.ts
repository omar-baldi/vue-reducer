import { useCombineReducers } from "@/composables/useCombineReducers";
import { commentsReducer, tasksReducer } from "@tests/_mocks";

describe("useCombineReducers", () => {
  it("should return updated state when using stateSelector method", () => {
    const { stateSelector, dispatch } = useCombineReducers({
      comments: commentsReducer,
      tasks: tasksReducer,
    });

    const dispatchComments = dispatch("comments");
    const commentsAdded = stateSelector((state) => state.comments?.commentsAdded);

    expect(commentsAdded.value).toEqual(["comment #1", "comment #2", "comment #3"]);
    dispatchComments({ type: "ADD_COMMENT", payload: "new comment added" });
    expect(commentsAdded.value).toEqual([
      "comment #1",
      "comment #2",
      "comment #3",
      "new comment added",
    ]);
  });

  it("should throw an error if action is dispatched with reducer key not found", () => {
    const { dispatch } = useCombineReducers({
      comments: commentsReducer,
      tasks: tasksReducer,
    });

    const expectedError = new Error("Reducer with key test not found");

    expect(() => {
      dispatch("test" as any);
    }).toThrow(expectedError);
  });
});
