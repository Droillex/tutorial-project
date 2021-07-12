import css from "./BaseButton.module.css";

const BaseButton = ({ text, ...props }) => {
  return (
    <button className={css} {...props}>
      {text}
    </button>
  );
};

export default BaseButton;
