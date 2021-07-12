import { memo } from "react";
import css from "./Posts.module.css";
import TitledInput from "../../Messages/TitledInput/TitledInput";
import Post from "../Post/Post";

const Posts = (props) => {
  const posts = {
    count: props.posts.length,
    data: props.posts.map((item, index) => {
      return <Post key={index} text={item.text} date={item.date} />;
    }),
  };

  return (
    <>
      {props.isOwner && (
        <div className={css.input}>
          <TitledInput
            title="New_Post_Text"
            btn_text="Create_Post"
            input_value={props.post_text}
            buttonClick={props.addPost}
            updateValue={props.updatePostText}
          />
        </div>
      )}

      <section className={css.posts}>
        User_Posts ({posts.count}){posts.data}
      </section>
    </>
  );
};

export default memo(Posts);
