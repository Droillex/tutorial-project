import React, { useState, useEffect } from "react";
import css from "./ProfileStatus.module.css";

const ProfileStatusWithHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  const statusText = status ? `Status: ${status}` : "Empty_Status";

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return editMode ? (
    <input
      placeholder="status_text"
      size={50}
      className={css.edit}
      autoFocus={true}
      onBlur={deactivateEditMode}
      onChange={onStatusChange}
      value={status}
    />
  ) : (
    <div className={css.status} onDoubleClick={activateEditMode}>
      {statusText}
    </div>
  );
};

export default ProfileStatusWithHooks;
