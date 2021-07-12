import Login from "./Login";
import { loginUser } from "../../redux/authReducer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const LoginContainer = (props) => {
  if (props.isAuth) return <Redirect to="/profile" />;
  return <Login {...props} />;
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});
const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
