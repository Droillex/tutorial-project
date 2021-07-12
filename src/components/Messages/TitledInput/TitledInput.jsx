import React, { useState } from "react";
import css from "./TitledInput.module.css";

const TitledInput = (props) => {
  let [inputText, setInputText] = useState("");

  const onButtonClick = () => {
    props.buttonClick(inputText);
    setInputText("");
  };

  const onUpdateValue = (e) => {
    setInputText(e.target.value);
  };

  const handleEnter = (e) => {
    switch (e.keyCode) {
      case 13:
        onButtonClick();
        e.preventDefault();
        break;
      default:
        break;
    }
  };

  return (
    <div className={css.input}>
      <div className={css.title}>{props.title}</div>
      <textarea
        onChange={onUpdateValue}
        value={inputText}
        onKeyDown={handleEnter}
      />
      <button onClick={onButtonClick}>{props.btn_text}</button>
    </div>
  );
};

TitledInput.defaultProps = {
  title: "Message_Text",
  btn_text: "Send",
  input_value: "",
  buttonClick: () => {
    alert("Button Clicked!");
  },
  updateValue: (text) => {
    alert(`Text updated, value: ${text}`);
  },
};

export default TitledInput;
