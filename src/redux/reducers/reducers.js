const mainState = {
  language: "IT",
  difficulty: 1,
  globalLanguage: "IT",
};

const mainReducer = (state = mainState, action) => {
  switch (action.type) {
    case "SET_LANGUAGE":
      return {
        ...state,
        language: action.payload,
      };
    case "SET_DIFFICULTY":
      return {
        ...state,
        difficulty: action.payload,
      };
    case "SET_GLOBAL_LANGUAGE":
      return {
        ...state,
        globalLanguage: action.payload,
      };

    default:
      return state;
  }
};

export default mainReducer;
