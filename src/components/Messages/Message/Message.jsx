import css from "./Message.module.css";

const Message = (props) => {
  return (
    <div className={`${css.wrapper} ${props.my ? css.right : null}`}>
      <div className={css.message}>
        {props.text}
        <div className={css.date}>{props.date}</div>
      </div>
    </div>
  );
};

Message.defaultProps = {
  text:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta\n" +
    "        ducimus eum ex expedita facere facilis, illum ipsa iure molestias natus\n" +
    "        non odit officia perferendis quo rem, soluta sunt velit.",
  date: "01/01/21",
  time: "00:00",
};

export default Message;
