import React, { useEffect } from "react";
import css from "./Messages.module.css";
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import TitledInput from "./TitledInput/TitledInput";
import Preloader from "../Common/Preloader/Preloader";

const Messages = ({ fetchMessages, ...props }) => {
  const userId = props.match.params.userId;

  useEffect(() => {
    if (userId) fetchMessages(userId);
  }, [userId, fetchMessages]);

  const messages = props.messages.map((item, index) => {
    return (
      <Message key={index} text={item.text} date={item.date} my={item.my} />
    );
  });

  const dialogs = props.dialogs.map((item, idx) => {
    return <Dialog key={idx} username={item.username} uid={item.uid} />;
  });

  return (
    <div className={css.wrapper}>
      <SimpleBar className={css.dialogs}>{dialogs}</SimpleBar>

      {userId && !props.isFetchingMessages && (
        <SimpleBar className={css.layout}>
          <div className={css.messages}>{messages}</div>
          <div className={css.input}>
            <TitledInput
              title="Message_Text"
              btn_text="Send"
              buttonClick={props.addMessage}
            />
          </div>
        </SimpleBar>
      )}

      {userId && props.isFetchingMessages && (
        <div className={css.empty}>
          {" "}
          <Preloader />
        </div>
      )}

      {!userId && (
        <div className={css.empty}>Select dialog to start chatting</div>
      )}
    </div>
  );
};

export default Messages;
