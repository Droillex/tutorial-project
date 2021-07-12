export const selectDialogs = (state) => state.messagesPage.dialogs;
export const selectMessages = (state) => state.messagesPage.messages;
export const selectFetchingMessages = (state) =>
  state.messagesPage.isFetchingMessages;
