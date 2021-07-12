import css from "./Header.module.css";
import { ReactComponent as DefaultUser } from "../../images/unknown_user.svg";
import BaseButton from "../Common/Buttons/BaseButton";

const Header = (props) => {
  return (
    <header>
      <section>{props.header.titleText}</section>
      <section className={css.group}>
        <div className={css.icons} />
        {props.auth.isAuth ? (
          <div className={css.user}>
            {props.auth.photo ? (
              <img src={props.auth.photo} className={css.pic} alt="user" />
            ) : (
              <DefaultUser className={css.pic} />
            )}
            <button className={css.logout} onClick={props.logout}>
              Logout
            </button>
          </div>
        ) : (
          <div className={css.login} onClick={props.loginModal}>
            Login
          </div>
        )}
      </section>
    </header>
  );
};

export default Header;
