import React, { lazy } from "react";
import { reducerType } from "redux/reducers";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import Loading from "components/Loading";

const GridFullHeight = lazy(() => import("components/GridFullHeight"));
const GridFormContainer = lazy(() => import("components/GridFormContainer"));

interface CallbackPageProps {
  dispatch: Dispatch;
  query: any;
}

const mapStateToProps = (state: reducerType) => {
  return {
    query: state.router.location.query
  };
};

const CallbackPage = React.memo((props: CallbackPageProps) => {
  React.useEffect(() => {
    if (props.query.oauth_token) {
      window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${props.query.oauth_token}`;
    }
    // eslint-disable-next-line
  }, []);

  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight container>
          <Loading />
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(CallbackPage);
