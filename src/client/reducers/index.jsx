import { combineReducers } from "redux";

const checkBox = (store, action) => {
  if (action.type === "TOGGLE_CHECK") {
    const isChecked = !!store.checked[action.key]
    const newMap = {...store.checked, [action.key]: !isChecked}
    return {
      checked: newMap
    };
  }

  return store || { checked: {}};
};

const name = (store, action) => {
  if (action.type === "INPUT_NAME") {
    return {
      value: action.value
    };
  }

  return store || { value: "" };
};

const create = (store, action) => {
  if (action.type === "CREATE") {
    debugger
    const name = action.value.get('name')
    return {
      habits: [
        ...store.habits,
        {
          name: name
        }
      ]
    }
  }
  return store || { habits: [] }
};

export default combineReducers({
  checkBox,
  name,
  create
});
