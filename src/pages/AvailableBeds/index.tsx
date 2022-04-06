import React, { useEffect } from "react";

import { push } from "connected-react-router";

import { reducerType } from "redux/reducers";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Service } from "@shelter/core";
import {
  GET_BEDS_REDUCER,
  UPDATE_BEDS_REDUCER
} from "redux/reducers/service/actionTypes";
import HeaderBarSub from "components/HeaderBarSub";
import Loading from "components/Loading";
import GridFullHeight from "components/GridFullHeight";
import GridFormContainer from "components/GridFormContainer";
import InputBeds from "./components/InputBeds";
import styles from "./styles";
import { SET_MESSAGES_REDUCER } from "redux/reducers/messages/actionTypes";

interface UpdateShelterProps {
  dispatch: Dispatch;
  shelters: Service[];
  loading: Boolean;
}

const mapStateToProps = (state: reducerType) => {
  return {
    shelters: state.service.data,
    loading: state.service.loading
  };
};

const UpdateShelter = React.memo((props: UpdateShelterProps) => {
  const { dispatch, shelters, loading } = props;
  const classes = styles();

  useEffect(() => {
    fetchShelters();
    // eslint-disable-next-line
  }, []);

  const fetchShelters = async () => {
    dispatch({
      type: GET_BEDS_REDUCER
    });
  };

  const alertErrors = () => {
    dispatch({
      type: SET_MESSAGES_REDUCER,
      message: {
        type: "error",
        key: "ERROR_UPDATE_BEDS",
        message: "Available beds shoulds be less than or equal to Total Beds"
      }
    });
  };

  const openUrl = url => {
    dispatch(push(url));
  };

  const renderBeds = () => {
    return shelters.map(s => (
      <InputBeds
        data={s}
        key={s.id}
        updateBeds={updateBeds}
        alertErrors={alertErrors}
      />
    ));
  };

  const updateBeds = params => {
    dispatch({
      type: UPDATE_BEDS_REDUCER,
      params: params
    });
  };

  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight container>
          <HeaderBarSub
            openUrl={openUrl}
            backUrl={"/"}
            isSearch
            name="Available Beds"
          />
          {loading ? (
            <Loading />
          ) : (
            <GridFullHeight container>
              <GridFormContainer item xs={12} sm={12} md={12}>
                {shelters.length ? (
                  renderBeds()
                ) : (
                  <p className={classes.noText}>
                    No shelter services are available to update bed information.
                  </p>
                )}
              </GridFormContainer>
            </GridFullHeight>
          )}
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(UpdateShelter);
