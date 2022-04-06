import React, { useState } from "react";
import ServiceItem from "components/ServiceItem";
import { ICoords } from "redux/reducers/service";
import { ServiceProps } from "common/";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import Alert from "components/Alert";
import Swipeout from "rc-swipeout";
import "rc-swipeout/assets/index.css";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_SERVICE_REQUEST } from "redux/reducers/service/actionTypes";
import { reducerType } from "redux/reducers";

interface HomeContainerProps {
  services: ServiceProps[];
  onClickKudo: Function;
  onRefresh: Function;
  onClickFlag: Function;
  currentLocation: ICoords;
  loadingMore: boolean;
  loadmoreServices: Function;
  canLoadmore: boolean;
  openUrl: Function;
  tabName: string;
  isOpenSearch: boolean;
  hasHeader: boolean;
}

const HomePageContainer = React.memo((props: HomeContainerProps) => {
  const classes = styles();
  const translate = useTranslation().t;
  const current_user = useSelector(
    (state: reducerType) => state.auth.current_user
  );

  const {
    services,
    onClickKudo,
    onClickFlag,
    currentLocation,
    loadingMore,
    loadmoreServices,
    canLoadmore,
    openUrl,
    tabName,
    isOpenSearch,
    hasHeader
  } = props;

  const handleWindowScroll = () => {
    const bottomOfWindow =
      window.scrollY + window.innerHeight >= document.body.scrollHeight - 500;
    if (bottomOfWindow && !loadingMore && canLoadmore) {
      loadmoreServices();
    }

    return;
  };

  const messageEmpty = isOpenSearch
    ? "No Services Found Matching your Search."
    : translate("NO_SERVICES_CLIENT", { value: tabName });

  React.useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  });
  // eslint-disable-next-line
  const [isSwipe, setIsSwipe] = useState(false);
  const dispatch = useDispatch();
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedService, setSelectedService] = useState();

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setSelectedService(null);
  };

  const handleOpenAlert = id => {
    setOpenAlert(true);
    setSelectedService(id);
  };

  const handleClickYes = () => {
    selectedService && handleDelete(selectedService);
    handleCloseAlert();
  };

  const handleDelete = id => {
    dispatch({
      type: DELETE_SERVICE_REQUEST,
      id: id
    });
  };

  const _setIsSwipe = e => {
    if (!current_user.isAdmin) return;
    setIsSwipe(e);
  };

  return (
    <div className={clsx({ [classes.pt50]: hasHeader }, classes.root)}>
      {services.length > 0 ? (
        services.map((service, index) => (
          <div key={index}>
            <Swipeout
              right={[
                {
                  text: "EDIT",
                  onPress: () => openUrl(`/services/${service.id}/edit`),
                  style: {
                    backgroundColor: "#BBB",
                    color: "white",
                    width: 85
                  },
                  className: "custom-class-2"
                },
                {
                  text: "DELETE",
                  onPress: () => handleOpenAlert(service.id),
                  style: {
                    backgroundColor: "#E55A5A",
                    color: "white",
                    width: 85
                  },
                  className: "custom-class-2"
                }
              ]}
              onOpen={() => _setIsSwipe(true)}
              onClose={() => _setIsSwipe(false)}
            >
              <ServiceItem
                currentLocation={currentLocation}
                service={service}
                onClickKudo={onClickKudo}
                onClickFlag={onClickFlag}
                openUrl={openUrl}
              />
            </Swipeout>
          </div>
        ))
      ) : (
        <p className={classes.noText}>
          <i>{messageEmpty}</i>
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
    </div>
  );
});

export default HomePageContainer;
// <PullToRefresh topOffset={1} maxDrag={400} onRefresh={onRefresh}>
// </PullToRefresh>
