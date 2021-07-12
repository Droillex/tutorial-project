import Preloader from "../Preloader/Preloader";
import css from "./SplashScreen.module.css";

const SplashScreen = (props) => {
  return (
    <div className={css.container}>
      <div className={css.loader}>
        <Preloader />
        <div>{props.text}</div>
      </div>
    </div>
  );
};

export default SplashScreen;
