import { addMessage } from "../../redux/messageReducer";
import Messages from "./Messages";
import { connect } from "react-redux";
import { compose } from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {
  selectDialogs,
  selectMessages,
  selectFetchingMessages,
} from "../../redux/messageSelector";
import { withRouter } from "react-router-dom";
import { fetchMessages } from "../../redux/messageReducer";

const mapStateToProps = (state) => {
  return {
    dialogs: selectDialogs(state),
    messages: selectMessages(state),
    isFetchingMessages: selectFetchingMessages(state),
  };
};

const mapDispatchToProps = {
  addMessage,
  fetchMessages,
};

export default compose(
  withRouter,
  withAuthRedirect,
  connect(mapStateToProps, mapDispatchToProps)
)(Messages);
