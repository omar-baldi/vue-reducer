const commentsState = {
  commentsAdded: ["comment #1", "comment #2", "comment #3"],
  commentsRemoved: ["comment #4"],
};

const tasksState = {
  todo: [1, 3, 5],
  completed: [2, 4],
};

export const commentsReducer = (
  state = commentsState,
  action: { type: "ADD_COMMENT"; payload: string } | { type: "RESET_COMMENTS" }
): typeof commentsState => {
  switch (action.type) {
    case "ADD_COMMENT": {
      const { payload: newCommentToAdd } = action;
      return {
        ...state,
        commentsAdded: [...state.commentsAdded, newCommentToAdd],
      };
    }
    case "RESET_COMMENTS":
      return { ...state, commentsAdded: [] };
    default:
      return state;
  }
};

export const tasksReducer = (
  state = tasksState,
  action:
    | { type: "ADD_TODO_TASK_ID"; payload: number }
    | { type: "MOVE_TODO_TASK_ID_TO_PROGRESS"; payload: number }
): typeof tasksState => {
  switch (action.type) {
    case "ADD_TODO_TASK_ID": {
      const { payload: todoTaskIdToAdd } = action;
      return {
        ...state,
        todo: [...state.todo, todoTaskIdToAdd],
      };
    }
    case "MOVE_TODO_TASK_ID_TO_PROGRESS":
      const { payload: todoTaskIdToRemove } = action;

      if (!state.todo.includes(todoTaskIdToRemove)) {
        return state;
      }

      const newTodo = state.todo.filter((t) => t !== todoTaskIdToRemove);
      const newCompleted = [...state.completed, todoTaskIdToRemove];

      return {
        todo: newTodo,
        completed: newCompleted,
      };

    default:
      return state;
  }
};
