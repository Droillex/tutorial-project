import messageReducer from "./messageReducer";

let store = {
  _callObserver() {
    console.log("no observer");
  },
  _state: {
    profilePage: {
      posts: [
        { text: "Hello there!", date: "24/04/21" },
        { text: "Started learning react", date: "24/04/21" },
        { text: "Fun thing btw, trying to progress fast", date: "24/04/21" },
        { text: "writing all data to store.js", date: "25/04/21" },
        {
          text: "road to redux: flux architecture, finished adding reducers",
          date: "26/04/21",
        },
      ],
    },
    messagesPage: {
      dialogs: [
        { username: "antiykho", uid: "antiykho" },
        { username: "Alfren_d", uid: "Alfren_d" },
        { username: "Nervos", uid: "Nervos" },
        { username: "neseran", uid: "neseran" },
        { username: "hellawes", uid: "hellawes" },
        { username: "b3p", uid: "b3p" },
      ],
      messages: [
        { text: "sample message", date: "02/02/21", my: false },
        { text: "yes, indeed", date: "02/02/21", my: true },
        {
          text: "testing index.js props right now",
          date: "02/02/21",
          my: true,
        },
        { text: "feels like it's working!", date: "02/02/21", my: false },
        {
          text: "extra messages for testing purposes, i guess",
          date: "25/04/21",
          my: false,
        },
        { text: "yeah, throw some text", date: "25/04/21", my: true },
        {
          text:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto at cumque, deserunt earum eveniet " +
            "ipsum iusto labore maiores, molestiae porro provident repudiandae soluta ut. Consectetur enim " +
            "itaque magnam natus repellat.  ",
          date: "25/04/21",
          my: false,
        },
        { text: "nice one!", date: "25/04/21", my: true },
        { text: "one more to go!", date: "25/04/21", my: true },
      ],
      message_text: "",
    },
    sidebar: {},
  },

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._callObserver = observer;
  },

  dispatch(action) {
    messageReducer(this._state.messagesPage, action);
    this._callObserver(this);
  },
};

export default store;
window.store = store;
