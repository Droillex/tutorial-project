import css from "./ButtonWithAction.module.css";

const ButtonWithAction = (props) => {
  return (
    <button
      disabled={props.isDisabled}
      className={css.follow}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default ButtonWithAction;
