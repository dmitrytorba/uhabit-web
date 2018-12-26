export const toggleCheck = key => {
  return {
    type: "TOGGLE_CHECK",
    key
  };
};

export const createHabit = value => {
  return {
    type: "CREATE",
    value
  };
};

export const requestData = () => {
  return {
    type: "REQUEST_DATA"
  };
};

export const receiveData = (json) => {
  debugger
  return {
    type: "RECEIVE_DATA",
    data: json
  };
};

export const invalidateData = () => {
  return {
    type: "INVALIDATE_DATA"
  };
};

export function fetchData(ref) {

  return function(dispatch) {
    dispatch(requestData())
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