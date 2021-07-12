import { memo } from "react";
import css from "./UserCard.module.css";
import { ReactComponent as DefaultUser } from "../../../images/unknown_user.svg";
import { NavLink } from "react-router-dom";
import withAuthHider from "../../../hoc/withAuthHider";
import ButtonWithAction from "./ActionButton/ButtonWithAction";

const UserCard = (props) => {
  const userPic =
    props.src != null ? (
      <img src={props.src} className={css.pic} alt="User" />
    ) : (
      <DefaultUser className={css.pic} />
    );

  const onFollow = () => {
    props.onFollow(props.id);
  };

  const onUnfollow = () => {
    props.onUnfollow(props.id);
  };

  const ButtonProps = props.followed
    ? { isDisabled: props.isDisabled, onClick: onUnfollow, text: "Unfollow" }
    : { isDisabled: props.isDisabled, onClick: onFollow, text: "Follow" };
  const ButtonComponent = withAuthHider(ButtonWithAction);

  return (
    <div className={css.card}>
      <div className={css.container}>
        <NavLink to={`/profile/${props.id}`}>{userPic}</NavLink>
        <div className={css.info}>
          <div>
            <NavLink to={`/profile/${props.id}`} className={css.name}>
              {props.name}
            </NavLink>

            <div className={css.status}>
              {props.status ? `«${props.status}»` : "Empty_Status"}
            </div>
          </div>

          <div>{props.location}</div>
        </div>
      </div>
      <ButtonComponent {...ButtonProps} />
    </div>
  );
};

// UserCard.defaultProps = {
//   followed: true,
//   name: "Sample Text",
//   status: "Loooooong sample status test, and even this is not enough",
//   // location: { county: "Russia", city: "Velsk" },
// };

export default memo(UserCard);
