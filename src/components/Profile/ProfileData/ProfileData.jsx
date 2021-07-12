import css from "./ProfileData.module.css";
import Tag from "../Tag/Tag";
import { ReactComponent as DefaultUser } from "../../../images/unknown_user.svg";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import { useRef } from "react";

import { ReactComponent as FacebookIcon } from "../../../images/icons/045-facebook.svg";
import { ReactComponent as InstagramIcon } from "../../../images/icons/034-instagram.svg";
import { ReactComponent as GithubIcon } from "../../../images/icons/039-github.svg";
import { ReactComponent as TwitterIcon } from "../../../images/icons/013-twitter-1.svg";
import { ReactComponent as VkIcon } from "../../../images/icons/009-vk.svg";

const ProfileData = (props) => {
  debugger;
  const contacts = (
    <div className={css.contacts}>
      {props.profile.contacts.facebook && (
        <a href={`//${props.profile.contacts.facebook}`}>
          <FacebookIcon />
        </a>
      )}
      {props.profile.contacts.instagram && (
        <a href={`//${props.profile.contacts.instagram}`}>
          <InstagramIcon />
        </a>
      )}
      {props.profile.contacts.github && (
        <a href={`//${props.profile.contacts.github}`}>
          <GithubIcon />
        </a>
      )}
      {props.profile.contacts.twitter && (
        <a href={`//${props.profile.contacts.twitter}`}>
          <TwitterIcon />
        </a>
      )}
      {props.profile.contacts.vk && (
        <a href={`//${props.profile.contacts.vk}`}>
          <VkIcon />
        </a>
      )}
    </div>
  );

  const tags = (() => {
    let container = [];
    if (props.profile.lookingForAJob)
      container.push(
        <Tag
          key={1}
          text="Looking for a job"
          title={
            props.profile.lookingForAJob
              ? props.profile.lookingForAJobDescription
              : null
          }
        />
      );
    return container;
  })();

  const inputRef = useRef(null);

  const onProfilePhotoSelected = (e) => {
    const file = e.target.files[0];
    if (file) {
      props.updateProfilePhoto(file);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.uploader}>
        {props.profile.photos.large ? (
          <img
            className={css.photo}
            src={props.profile.photos.large}
            alt="user"
          />
        ) : (
          <DefaultUser className={css.photo} />
        )}
        {props.isOwner && (
          <>
            <input
              type="file"
              ref={inputRef}
              onChange={onProfilePhotoSelected}
            />
            <div
              className={css.load}
              onClick={() => {
                inputRef.current.click();
              }}
            >
              Upload
            </div>
          </>
        )}
      </div>

      <div>
        <div className={css.title}>{props.profile.fullName}</div>
        {tags ? <div className={css.tags}>{tags}</div> : null}

        {props.isOwner ? (
          <ProfileStatusWithHooks
            status={props.status}
            updateUserStatus={props.updateUserStatus}
          />
        ) : (
          <div className={css.status}>
            {props.status ? `Status: ${props.status}` : "Empty_Status"}
          </div>
        )}

        <div>
          {props.profile.aboutMe
            ? `About: ${props.profile.aboutMe}`
            : "Empty_About_Section"}
        </div>
        {contacts}
      </div>
    </div>
  );
};

export default ProfileData;
