import "./App.css";
import React, { useEffect } from "react";
import css from "./App.module.css";
import Sidebar from "./components/Sidebar/Sidebar";

import MessagesContainer from "./components/Messages/MessagesContainer";

import { Route, Switch } from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import { connect } from "react-redux";
import SplashScreen from "./components/Common/SplashScreen/SplashScreen";
import { initializeApp } from "./redux/appReducer";
import { closeModal } from "./redux/modalReducer";
import ProfileContainerWithHooks from "./components/Profile/ProfileContainerWithHooks";
import UsersContainerWithHooks from "./components/Users/UsersContainerWithHooks";

import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Empty from "./components/Common/Empty/Empty";
import Modal from "./components/Common/Modal/Modal";

const App = ({ initializeApp, initialized, ...props }) => {
  useEffect(() => {
    initializeApp();
  }, [initializeApp]);
  if (!initialized) return <SplashScreen />;
  return (
    <>
      <div className={css.wrapper}>
        <Sidebar />
        <div className={css.right}>
          <HeaderContainer />
          <div className={css.content}>
            <Switch>
              <Route
                path="/profile/:userId?"
                render={() => <ProfileContainerWithHooks />}
              />
              <Route
                path="/messages/:userId?"
                render={() => <MessagesContainer />}
              />
              <Route path="/users" render={() => <UsersContainerWithHooks />} />
              <Route path="*" render={() => <Empty />} />
            </Switch>
          </div>
        </div>
      </div>
      <Modal modal={props.modal} closeModal={props.closeModal} />
      <ToastContainer
        autoClose={5000}
        pauseOnFocusLoss={false}
        draggable={true}
        position="bottom-right"
        transition={Flip}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  modal: state.modal,
});

export default connect(mapStateToProps, { initializeApp, closeModal })(App);
