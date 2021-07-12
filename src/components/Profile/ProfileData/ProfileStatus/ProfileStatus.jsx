import React from "react";
import css from "./ProfileStatus.module.css";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
  }

  activateEditMode = () => {
    this.setState({ editMode: true });
  };

  deactivateEditMode = () => {
    this.setState({ editMode: false });
    this.props.updateUserStatus(this.state.status);
  };

  onUserInput = (e) => {
    this.setState({ status: e.target.value });
  };

  render() {
    const status = (
      <div className={css.status} onDoubleClick={this.activateEditMode}>
        {this.props.status ? `Status: ${this.props.status}` : "Empty_Status"}
      </div>
    );
    return this.state.editMode ? (
      <input
        placeholder="status_text"
        size={50}
        onBlur={this.deactivateEditMode}
        onChange={this.onUserInput}
        className={css.edit}
        autoFocus={true}
        value={this.state.status}
      />
    ) : (
      status
    );
  }
}

export default ProfileStatus;
