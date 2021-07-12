import css from "./UserCardMockup.module.css";
import { ReactComponent as DefaultUser } from "../../../images/unknown_user.svg";
import { memo } from "react";

const UserCardMockup = () => {
  return (
    <div className={css.card}>
      <div className={css.container}>
        <DefaultUser className={css.pic} />
        <div className={css.info}>
          <div>
            <div className={css.empty} />
            <div className={css.empty} />
          </div>
          <div className={css.empty} />
        </div>
      </div>
      <div className={css.follow} />
    </div>
  );
};

export default memo(UserCardMockup);
