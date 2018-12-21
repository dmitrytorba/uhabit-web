import reducer from "../../client/reducers";

export default function initTop() {
  return {
    reducer,
    initialState: {
      checkBox: { checked: {} },
      name: { value: "" },
      create: { habits: [] }
    }
  };
}
