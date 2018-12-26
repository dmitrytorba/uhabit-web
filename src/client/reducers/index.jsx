import { combineReducers } from "redux";

const initialState = {
  habits: [],
  checks: {},
  isFetching: false,
  isSaved: true,
  didInvalidate: false,
  user: null
}

const main = (
  store = initialState,
  action
) => {
  switch (action.type) {
    case 'CREATE':
      const name = action.value.get('name')
      return Object.assign({}, store, {
        habits: [
          ...store.habits,
          {
            label: name,
            key: name
          }
        ]
      })
    case 'TOGGLE_CHECK':
      const isChecked = !!store.checks[action.key]
      const newMap = {...store.checks, [action.key]: !isChecked}
      return Object.assign({}, store, {
        checks: newMap
      })
    case 'LOGIN_USER':
      return Object.assign({}, store, {
        user: action.user
      })
    case 'INVALIDATE_DATA':
      return Object.assign({}, store, {
        didInvalidate: true
      })
    case 'REQUEST_DATA':
      return Object.assign({}, store, {
        isFetching: true,
        didInvalidate: false
      })
    case 'REQUEST_SAVE':
      return Object.assign({}, store, {
        isSaved: false 
      })
    case 'SAVE_COMPLETE':
      return Object.assign({}, store, {
        isSaved: true 
      })
    case 'RECEIVE_DATA':
      return Object.assign({}, store, {
        isFetching: false,
        didInvalidate: false,
        checks: action.data.checks || {},
        habits: action.data.habits || []
      })
    default:
      return store 
  }
}

export default main
