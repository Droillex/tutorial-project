import { MessagesAPI } from "../api/api";

const ADD_MESSAGE = "messageReducer/add-message";
const TOGGLE_MESSAGES_FETCHING = "messageReducer/toggle-messages-fetching";
const SET_MESSAGES = "messageReducer/set-messages";

const initState = {
  dialogs: [
    { username: "antiykho", uid: "12456" },
    { username: "Alfren_d", uid: "7535" },
    { username: "Nervos", uid: "3263" },
    { username: "neseran", uid: "9867" },
    { username: "hellawes", uid: "6845" },
    { username: "b3p", uid: "29465" },
  ],
  messages: [
    { text: "sample message", date: "02/02/2021", my: false },
    { text: "yes, indeed", date: "02/02/2021", my: true },
    {
      text: "testing index.js props right now",
      date: "02/02/2021",
      my: true,
    },
    { text: "feels like it's working!", date: "02/02/2021", my: false },
    {
      text: "extra messages for testing purposes, i guess",
      date: "25/04/2021",
      my: false,
    },
    { text: "yeah, throw some text", date: "25/04/2021", my: true },
    {
      text:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto at cumque, deserunt earum eveniet " +
        "ipsum iusto labore maiores, molestiae porro provident repudiandae soluta ut. Consectetur enim " +
        "itaque magnam natus repellat.  ",
      date: "25/04/2021",
      my: false,
    },
    { text: "nice one!", date: "25/04/2021", my: true },
    { text: "one more to go!", date: "25/04/2021", my: true },
  ],
  isFetchingMessages: true,
};

// ------------ ACTION CREATORS ------------
export const addMessage = (messageText) => ({
  type: ADD_MESSAGE,
  messageText,
});

const toggleMessagesFetching = (value) => ({
  type: TOGGLE_MESSAGES_FETCHING,
  value,
});

const setMessages = (messages) => ({
  type: SET_MESSAGES,
  messages,
});

// ------------- THUNK CREATORS -------------
export const fetchMessages = (userId) => async (dispatch) => {
  dispatch(toggleMessagesFetching(true));
  const messagesData = await MessagesAPI.getMessages(userId);
  if (messagesData.data.statusCode === 0) {
    dispatch(setMessages(messagesData.data.messages));
    dispatch(toggleMessagesFetching(false));
  }
};

const dateFormat = (date) => {
  return [date.getDate(), date.getMonth() + 1, date.getFullYear()]
    .map(
      (elem) => `${"0".repeat(Math.max(0, 2 - elem.toString().length))}${elem}`
    )
    .join("/");
};

const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      if (action.messageText === "") return state;

      return {
        ...state,
        messages: [
          ...state.messages,
          {
            text: action.messageText,
            date: dateFormat(new Date()),
            my: true,
          },
        ],
      };
    }

    case TOGGLE_MESSAGES_FETCHING:
      return { ...state, isFetchingMessages: action.value };

    case SET_MESSAGES:
      return { ...state, messages: action.messages };

    default:
      return state;
  }
};

export default messageReducer;
