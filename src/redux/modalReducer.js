const CREATE_MODAL = "modalReducer/create-modal";
const CLOSE_MODAL = "modalReducer/close-modal";

export const closeModal = () => ({
  type: CLOSE_MODAL,
  data: null,
});

export const loginModal = () => ({
  type: CREATE_MODAL,
  modal: {
    type: "login",
  },
});

const modalReducer = (state = null, action) => {
  switch (action.type) {
    case CREATE_MODAL:
      return action.modal;
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
};

export default modalReducer;
