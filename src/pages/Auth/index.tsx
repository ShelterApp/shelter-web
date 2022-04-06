import React, { lazy } from "react";

import { LOGIN_REQUEST } from "redux/reducers/auth/actionTypes";
import { push } from "connected-react-router";

import { reducerType } from "redux/reducers";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import HeaderBarSub from "components/HeaderBarSub";
// import Loading from "components/Loading";
import AuthContainer from "containers/AuthContainer";

const GridFullHeight = lazy(() => import("components/GridFullHeight"));
const GridFormContainer = lazy(() => import("components/GridFormContainer"));

interface AuthPageProps {
  dispatch: Dispatch;
}

const mapStateToProps = (state: reducerType) => {
  return {};
};

const AuthPage = React.memo((props: AuthPageProps) => {
  const { dispatch } = props;

  const login = form => {
    dispatch({
      type: LOGIN_REQUEST,
      current_user: form
    });
  };

  const openUrl = url => {
    dispatch(push(url));
  };

  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight container>
          <HeaderBarSub openUrl={openUrl} name="Service Provider Login" />
          <AuthContainer openUrl={openUrl} login={login} />
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(AuthPage);
