import css from "./Post.module.css";
import { ReactComponent as DefaultUser } from "../../../images/unknown_user.svg";

const Post = (props) => {
  const userPic = props.src ? (
    <img src={props.src} className={css.img} alt="" />
  ) : (
    <DefaultUser className={css.img} />
  );
  return (
    <div className={css.post}>
      {userPic}
      <div className={css.info}>
        <div className={css.comment}>{props.text}</div>
        <div className={css.date}>at {props.date}</div>
      </div>
    </div>
  );
};

Post.defaultProps = {
  text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  date: "01/01/01",
  src: null,
};

export default Post;
