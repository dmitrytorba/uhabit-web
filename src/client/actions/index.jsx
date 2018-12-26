import firebase from "../firebase"

export const newHabit = value => {
  return {
    type: "CREATE",
    value
  };
};

export const changeCheckbox = key => {
 return {
    type: "TOGGLE_CHECK",
    key
  };
};

export const requestSave = () => {
  return {
    type: "REQUEST_SAVE"
  };
};

export const saveComplete = () => {
  return {
    type: "SAVE_COMPLETE"
  };
};

export const requestData = () => {
  return {
    type: "REQUEST_DATA"
  };
};

export const receiveData = (data) => {
  return {
    type: "RECEIVE_DATA",
    data: data || {} 
  };
};


export const loginUser = (user) => {
  return {
    type: "LOGIN_USER",
    user: user 
  };
};

export const invalidateData = () => {
  return {
    type: "INVALIDATE_DATA"
  };
};

export const fetchData = () => {
  return (dispatch, getState) => {
    dispatch(requestData())
    const state = getState()
    const ref = firebase.database().ref('users/' + state.user.uid)
    return ref.once('value')
      .then(
        response => response.val(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.log('An error occurred.', error)
      )
      .then(data =>
        dispatch(receiveData(data))
      )
  }
}

export const toggleCheck = key => {
  return (dispatch, getState) => {
    dispatch(requestSave())
    dispatch(changeCheckbox(key))
    const state = getState()
    const ref = firebase.database().ref('users/' + state.user.uid)
    return ref.child('checks').set(state.checks)
      .then(() => {
        dispatch(saveComplete())
      })
  }
};

export const createHabit = value => {
  return (dispatch, getState) => {
    dispatch(requestSave())
    dispatch(newHabit(value))
    const state = getState()
    const ref = firebase.database().ref('users/' + state.user.uid)
    return ref.child('habits').set(state.habits)
      .then(() => {
        dispatch(saveComplete())
      })
  }
};