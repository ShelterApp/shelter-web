import React, { lazy } from "react";

import {
  GET_CRISISLINES_REQUEST,
  LOADMORE_CRISISLINES_REQUEST
} from "redux/reducers/service/actionTypes";
import { push } from "connected-react-router";

import { reducerType } from "redux/reducers";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { CrisisLine } from "@shelter/core";

import HeaderBarSub from "components/HeaderBarSub";
import Loading from "components/Loading";

import CrisisLinesContainer from "containers/CrisisLinesContainer";

const GridFullHeight = lazy(() => import("components/GridFullHeight"));
const GridFormContainer = lazy(() => import("components/GridFormContainer"));

interface CrisisLinesProps {
  dispatch: Dispatch;
  crisis_lines: CrisisLine[];
  loading: boolean;
  loadingMore: boolean;
  canLoadmore: boolean;
}

const mapStateToProps = (state: reducerType) => {
  return {
    loading: state.service.loading,
    crisis_lines: state.service.crisis_lines,
    loadingMore: state.service.loadingMore,
    canLoadmore: state.service.canLoadmore
  };
};

const CrisisLines = React.memo((props: CrisisLinesProps) => {
  const { dispatch, loading, crisis_lines, loadingMore, canLoadmore } = props;

  React.useEffect(() => {
    dispatch({
      type: GET_CRISISLINES_REQUEST,
      params: {}
    });
    // eslint-disable-next-line
  }, []);

  const loadmoreFunction = () => {
    dispatch({
      type: LOADMORE_CRISISLINES_REQUEST,
      params: {}
    });
  };

  const openUrl = url => {
    dispatch(push(url));
  };

  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight container>
          <HeaderBarSub openUrl={openUrl} isSearch name="Crisis Lines" />
          {loading ? (
            <Loading />
          ) : (
            <>
              <CrisisLinesContainer
                openUrl={openUrl}
                crisis_lines={crisis_lines}
                loadmoreFunction={loadmoreFunction}
                loadingMore={loadingMore}
                canLoadmore={canLoadmore}
              />
            </>
          )}
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(CrisisLines);
