import css from "./Modal.module.css";
import LoginForm from "../../Login/LoginForm";
import { connect } from "react-redux";
import { closeModal } from "../../../redux/modalReducer";
import { loginUser } from "../../../redux/authReducer";

const Modal = (props) => {
  return (
    props.modal && (
      <div className={css.container}>
        <div className={css.modal}>
          <LoginForm loginUser={props.loginUser} captcha={props.captcha} />
        </div>
        <div className={css.dark} onClick={props.closeModal} />
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  modal: state.modal,
  captcha: state.auth.captcha,
});

const mapDispatchToProps = {
  closeModal,
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
