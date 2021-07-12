import { ReactComponent as DefaultUser } from "../../../images/unknown_user.svg";
import css from "./Dialog.module.css";
import { NavLink } from "react-router-dom";

const Dialog = (props) => {
  let path = `/messages/${props.uid}`;
  return (
    <NavLink activeClassName={css.active} to={path} className={css.dialog}>
      {props.src ? (
        <img className={css.img} src={props.src} alt="user" />
      ) : (
        <DefaultUser className={css.img} />
      )}
      {props.username}
    </NavLink>
  );
};

Dialog.defaultProps = {
  src: null,
  username: "Sample_User",
  uid: "Sample",
};

export default Dialog;
