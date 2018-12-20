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

const number = (store, action) => {
  if (action.type === "INC_NUMBER") {
    return {
      value: store.value + 1
    };
  } else if (action.type === "DEC_NUMBER") {
    return {
      value: store.value - 1
    };
  }

  return store || { value: 0 };
};

const username = (store, action) => {
  if (action.type === "INPUT_NAME") {
    return {
      value: action.value
    };
  }

  return store || { value: "" };
};

const textarea = (store, action) => {
  if (action.type === "INPUT_TEXT_AREA") {
    return {
      value: action.value
    };
  }

  return store || { value: "" };
};

const selectedOption = (store, action) => {
  if (action.type === "SELECT_OPTION") {
    return {
      value: action.value
    };
  }
  return store || { value: "0-13" };
};

export default combineReducers({
  checkBox,
  number,
  username,
  textarea,
  selectedOption
});
