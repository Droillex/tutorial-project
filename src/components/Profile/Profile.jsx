import css from "./Profile.module.css";
// eslint-disable-next-line no-unused-vars
import SampleImage from "../../images/profile_pic.jpg";
import SimpleBar from "simplebar-react";
import Preloader from "../Common/Preloader/Preloader";
import Posts from "./Posts/Posts";
import ProfileData from "./ProfileData/ProfileData";

const Profile = (props) => {
  if (!props.profile) {
    return (
      <div className={css.empty}>
        <Preloader />
      </div>
    );
  }

  return (
    <SimpleBar className={css.content}>
      {/*<img className={css.pic} src={SampleImage} alt="Profile" />*/}
      <div className={css.container}>
        <ProfileData
          profile={props.profile}
          status={props.status}
          updateUserStatus={props.updateUserStatus}
          updateProfilePhoto={props.updateProfilePhoto}
          isOwner={props.isOwner}
        />
        <Posts
          posts={props.posts}
          post_text={props.post_text}
          addPost={props.addPost}
          updatePostText={props.updatePostText}
          isOwner={props.isOwner}
        />
      </div>
    </SimpleBar>
  );
};

export default Profile;
