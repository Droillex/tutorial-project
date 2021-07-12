import css from "./Tag.module.css";

const Tag = (props) => {
  return (
    <span
      title={props.title}
      className={css.tag}
      style={{ background: props.background, color: props.color }}
    >
      {props.text}
    </span>
  );
};
Tag.defaultProps = {
  color: "whitesmoke",
  background: "var(--active-color)",
  text: "Sample_Text",
};

export default Tag;
