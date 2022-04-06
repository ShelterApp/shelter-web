import React, { useState, useEffect } from "react";
import { push } from "connected-react-router";
import { reducerType } from "redux/reducers";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import HeaderBarSub from "components/HeaderBarSub";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./styles";
import GridFullHeight from "components/GridFullHeight";
import GridFormContainer from "components/GridFormContainer";
import {
  GET_SERVICES_REDUCER,
  LOADMORE_SERVICES_REQUEST,
  DELETE_SERVICE_REQUEST
} from "redux/reducers/service/actionTypes";
import { SORT, DIRECTION, LIMIT, SKIP } from "common/utils";
import { useSelector } from "react-redux";
import Loading from "components/Loading";
import MSService from "containers/MSServiceContainer";
import { ServiceProps } from "common/";
import Alert from "components/Alert";

const commonQuery = {
  sort: SORT,
  direction: DIRECTION,
  limit: LIMIT,
  skip: SKIP,
  isShowAll: false
  // filter: 'isApproved',
  // isApproved: 'true | false',
};

interface ManageServicesProps {
  dispatch: Dispatch;
  loading: boolean;
  services: ServiceProps[];
  loadingMore: boolean;
  canLoadmore: boolean;
}

const mapStateToProps = (state: reducerType) => {
  return {
    loading: state.service.loading,
    services: state.service.data,
    loadingMore: state.service.loadingMore,
    canLoadmore: state.service.canLoadmore
  };
};

const ManageServices = React.memo((props: ManageServicesProps) => {
  const { dispatch, loading, services, loadingMore, canLoadmore } = props;
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedService, setSelectedService] = useState();
  const classes = styles();
  const openUrl = url => {
    dispatch(push(url));
  };
  const current_user = useSelector(
    (state: reducerType) => state.auth.current_user
  );

  const handleWindowScroll = () => {
    const bottomOfWindow =
      window.scrollY + window.innerHeight >= document.body.scrollHeight - 500;
    if (bottomOfWindow && !loadingMore && canLoadmore) {
      loadmoreServices();
    }
    return;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  });

  useEffect(() => {
    const obj = commonQuery as any;
    if (!current_user.isAdmin) {
      obj.filter = "user,isShowAll";
      obj.user = current_user.id;
      obj.isShowAll = true;
    } else {
      delete obj.filter;
      obj.filter = "isShowAll";
      obj.isShowAll = true;
    }

    dispatch({
      type: GET_SERVICES_REDUCER,
      params: obj,
      pageSize: LIMIT,
      defaultQuery: true
    });
    // eslint-disable-next-line
  }, []);

  const onDelete = id => {
    dispatch({
      type: DELETE_SERVICE_REQUEST,
      id: id
    });
  };

  const loadmoreServices = () => {
    dispatch({
      type: LOADMORE_SERVICES_REQUEST,
      defaultQuery: true,
      pageSize: LIMIT
    });
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setSelectedService(null);
  };

  const handleOpenAlert = id => {
    setOpenAlert(true);
    setSelectedService(id);
  };

  const handleClickYes = () => {
    selectedService && onDelete(selectedService);
    handleCloseAlert();
  };

  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight container>
          <HeaderBarSub
            backUrl={"/"}
            openUrl={openUrl}
            name="Manage Services"
            isSearch
          />
          <Container className={classes.root}>
            {loading ? (
              <Loading />
            ) : (
              <>
                {services && services.length > 0 ? (
                  services.map((data, index) => (
                    <MSService
                      handleOpenAlert={handleOpenAlert}
                      data={data}
                      key={index}
                      onDelete={onDelete}
                      openUrl={openUrl}
                    />
                  ))
                ) : (
                  <p className={classes.noText}>
                    No services added. Please click on{" "}
                    <a href="/add_service">Add Services</a> in Side Menu.
                  </p>
                )}
                {canLoadmore && (
                  <Container className={classes.textCenter}>
                    <CircularProgress
                      style={{ width: 25, height: 25 }}
                      className={classes.loadmore}
                    />
                  </Container>
                )}
                <Alert
                  title={"Do you want to delete this service?"}
                  open={openAlert}
                  handleClose={handleCloseAlert}
                  handleClickYes={handleClickYes}
                />
              </>
            )}
          </Container>
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(ManageServices);
