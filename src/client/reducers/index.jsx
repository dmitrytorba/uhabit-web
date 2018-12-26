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

const create = (store, action) => {
  if (action.type === "CREATE") {
    const name = action.value.get('name')
    return {
      habits: [
        ...store.habits,
        {
          label: name,
          key: name
        }
      ]
    }
  }
  return store || { habits: [] }
};

function data(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case 'INVALIDATE_DATA':
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case 'REQUEST_DATA':
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case 'RECEIVE_DATA':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.data
      })
    default:
      return state
  }
}

export default combineReducers({
  data,
  checkBox,
  create
});
