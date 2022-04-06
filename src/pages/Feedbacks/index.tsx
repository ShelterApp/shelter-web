import React, { useEffect, useState } from "react";

import {
  GET_FEEDBACKS_REQUEST,
  LOADMORE_FEEDBACKS_REQUEST
} from "redux/reducers/service/actionTypes";
import { SET_MESSAGES_REDUCER } from "redux/reducers/messages/actionTypes";
import { push } from "connected-react-router";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useSelector } from "react-redux";
import { reducerType } from "redux/reducers";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import HeaderBarSub from "components/HeaderBarSub";
import Loading from "components/Loading";
import FeedbacksContainer from "containers/FeedbacksContainer";
import { Feedback } from "@shelter/core/dist/models";
import { useTranslation } from "react-i18next";
import GridFullHeight from "components/GridFullHeight";
import GridFormContainer from "components/GridFormContainer";
import clsx from "clsx";
import styles from "./styles";
import Container from "@material-ui/core/Container";
import Alert from "components/Alert";
import { archiveFeedback, deleteFeedback } from "api/feedbacks/create";

interface FeedbacksProps {
  dispatch: Dispatch;
  feedbacks: Feedback[];
  loading: boolean;
  loadingMore: boolean;
  canLoadmore: boolean;
}

const mapStateToProps = (state: reducerType) => {
  return {
    loading: state.service.loading,
    feedbacks: state.service.feedbacks,
    loadingMore: state.service.loadingMore,
    canLoadmore: state.service.canLoadmore
  };
};

const Feedbacks = React.memo((props: FeedbacksProps) => {
  const { dispatch, loading, loadingMore, canLoadmore } = props;
  const [feedbacks, setFeedbacks] = useState(props.feedbacks);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const classes = styles();
  const current_user = useSelector(
    (state: reducerType) => state.auth.current_user
  );
  const translate = useTranslation().t;
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState();
  const [typeHandler, setTypeHandler] = useState();

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setSelectedFeedback(null);
  };

  const handleArchive = id => {
    setOpenAlert(true);
    setSelectedFeedback(id);
    setTypeHandler("archive");
  };

  const handleDelete = id => {
    setOpenAlert(true);
    setSelectedFeedback(id);
    setTypeHandler("delete");
  };

  const handleClickYes = () => {
    selectedFeedback && onHandlerFeedback(selectedFeedback);
    handleCloseAlert();
    setTypeHandler("");
  };

  const tabs = current_user.isAdmin
    ? ["APP_FEEDBACK", "SERVICE_FEEDBACK", "ARCHIVE"]
    : ["SERVICE_FEEDBACK", "ARCHIVE"];

  useEffect(() => {
    dispatch({
      type: GET_FEEDBACKS_REQUEST,
      params: {}
    });
    // eslint-disable-next-line
  }, []);

  const loadmoreFunction = () => {
    dispatch({
      type: LOADMORE_FEEDBACKS_REQUEST,
      params: {}
    });
  };

  const openUrl = url => {
    dispatch(push(url));
  };

  const tranformFeedbacks = () => {
    switch (selectedIndex) {
      case 0:
        if (current_user.isAdmin)
          return feedbacks.filter(f => !f.isArchive && f.type === "APP");
        return feedbacks.filter(f => !f.isArchive && f.type === "SERVICE");
      case 1:
        if (current_user.isAdmin)
          return feedbacks.filter(f => !f.isArchive && f.type === "SERVICE");
        return feedbacks.filter(f => f.isArchive === true);
      case 2:
        return feedbacks.filter(f => f.isArchive === true);
    }
  };

  const onHandlerFeedback = async (id: string) => {
    try {
      let res;
      if (typeHandler === "archive") {
        res = (await archiveFeedback(id)) as any[];
      } else if (typeHandler === "delete") {
        res = (await deleteFeedback(id)) as any[];
      }
      if (res) {
        dispatch({
          type: SET_MESSAGES_REDUCER,
          message: {
            type: "success",
            key: "",
            message: `This feedback was ${typeHandler}d successful!`
          }
        });
        dispatch({
          type: GET_FEEDBACKS_REQUEST,
          params: {}
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setFeedbacks(props.feedbacks);
  }, [props.feedbacks]);

  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight container>
          <HeaderBarSub openUrl={openUrl} isSearch name="My Feedbacks" />
          <Container className={classes.root}>
            <ButtonGroup
              className={classes.groupBtns}
              variant="contained"
              color="primary"
              aria-label="contained primary button group"
            >
              {tabs.map((tab, idx) => (
                <Button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={clsx(
                    { [classes.btnActive]: idx === selectedIndex },
                    classes.btnFilter
                  )}
                >
                  {translate(tab)}
                </Button>
              ))}
            </ButtonGroup>
          </Container>
          {loading ? (
            <Loading />
          ) : (
            <>
              <FeedbacksContainer
                selectedIndex={selectedIndex}
                openUrl={openUrl}
                feedbacks={tranformFeedbacks()}
                loadmoreFunction={loadmoreFunction}
                loadingMore={loadingMore}
                canLoadmore={canLoadmore}
                handleArchive={handleArchive}
                handleDelete={handleDelete}
              />
              <Alert
                title={`Do you want to ${typeHandler} this Feedback?`}
                open={openAlert}
                handleClose={handleCloseAlert}
                handleClickYes={handleClickYes}
              />
            </>
          )}
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(Feedbacks);
