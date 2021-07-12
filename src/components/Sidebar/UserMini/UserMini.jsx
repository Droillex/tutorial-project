import css from "./UserMini.module.css";
import { ReactComponent as DefaultUser } from "../../../images/unknown_user.svg";

const UserMini = (props) => {
  return (
    <div className={css.user}>
      {props.src ? (
        <img src={props.src} className={css.img} alt="User" />
      ) : (
        <DefaultUser className={css.img} />
      )}
      {props.name}
    </div>
  );
};

UserMini.defaultProps = {
  src: null,
  name: "User_Sample",
};

export default UserMini;
