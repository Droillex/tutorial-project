const CHANGE_TITLE = "headerReducer/change-title";

export const setHeaderTitle = (titleText) => ({
  type: CHANGE_TITLE,
  text: titleText,
});

const initState = {
  titleText: "Sample_Text",
};

const headerReducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_TITLE:
      return { ...state, titleText: action.text };
    default:
      return state;
  }
};

export default headerReducer;
