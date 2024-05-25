import { App } from "vue";
import { useCombineReducers, useReducer } from "./composables";

export default {
  install: (app: App) => {
    app.config.globalProperties.useReducer = useReducer;
    app.config.globalProperties.useCombineReducers = useCombineReducers;
  },
};
