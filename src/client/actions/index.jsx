export const toggleCheck = key => {
  return {
    type: "TOGGLE_CHECK",
    key
  };
};

export const inputName = value => {
  return {
    type: "INPUT_NAME",
    value
  };
};

export const createHabit = value => {
  return {
    type: "CREATE",
    value
  };
};

