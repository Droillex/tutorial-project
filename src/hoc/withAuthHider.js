import React from "react";
import { connect } from "react-redux";
import { selectIsAuth } from "../redux/authSelector";

const withAuthHider = (Component) => {
  const mapStateToProps = (state) => ({
    isAuth: selectIsAuth(state),
  });

  function withAuthComponent(props) {
    return props.isAuth ? <Component {...props} /> : null;
  }

  return connect(mapStateToProps)(withAuthComponent);
};

export default withAuthHider;
