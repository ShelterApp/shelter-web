import React, { useState, useEffect } from "react";
import { push } from "connected-react-router";
import {
  GET_SERVICES_REDUCER,
  LIKE_SERVICE_REQUEST,
  REFRESH_SERVICES_REQUEST,
  LOADMORE_SERVICES_REQUEST,
  GET_CRITICAL_HEADER
} from "redux/reducers/service/actionTypes";
import { useSelector } from "react-redux";
import { reducerType } from "redux/reducers";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ServiceProps, tranformSelected, convertSelected } from "common/";
import ScrollableTabs from "components/TabPanel";
import HeaderBar from "components/Header";
import Loading from "components/Loading";
import SideBar from "components/SideBar";
import ModalFlag from "components/ModalFlag";
import clsx from "clsx";
import styles from "./styles";
import { ICoords } from "redux/reducers/service";
import Mapview from "./common/Mapview";
import { CREATE_FEEDBACK_SERVICE_REQUEST } from "redux/reducers/feedback/actionTypes";
import { useTranslation } from "react-i18next";
import { getReportNotifcations } from "api/auth/getProfile";
import BreakingNews from "./common/BreakingNews";
import HomePageContainer from "containers/HomePageContainer";
import GridFullHeight from "components/GridFullHeight";
import GridFormContainer from "components/GridFormContainer";
import { addFilter, removeFilter } from "common/";

interface HomeProps {
  dispatch: Dispatch;
  services: ServiceProps[];
  router: {
    pathname: string;
    search: string;
    hash: string;
  };
  loading: boolean;
  currentLocation: ICoords;
  loadingMore: boolean;
  loadingLocation: boolean;
  canLoadmore: boolean;
  critical_header_services: ServiceProps[];
}

const mapStateToProps = (state: reducerType) => {
  return {
    services: state.service.data,
    router: state.router.location,
    loading: state.service.loading,
    currentLocation: state.service.currentLocation,
    loadingMore: state.service.loadingMore,
    loadingLocation: state.service.loadingLocation,
    canLoadmore: state.service.canLoadmore,
    critical_header_services: state.service.critical_header_services
  };
};

const HomePage = React.memo((props: HomeProps) => {
  const queryData = useSelector(
    (state: reducerType) => state.service.queryData
  );
  const current_user = useSelector(
    (state: reducerType) => state.auth.current_user
  );
  const translate = useTranslation().t;
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const classes = styles();
  const {
    dispatch,
    services,
    loading,
    currentLocation,
    loadingMore,
    loadingLocation,
    canLoadmore,
    critical_header_services
  } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceNameFlag, setServiceNameFlag] = useState("");
  const [openFlag, setOpenFlag] = useState(false);
  const [isMapView, setIsMapView] = useState(
    Boolean(JSON.parse(sessionStorage.getItem("@shelter_isMapView")))
  );
  const [isOpenService, setIsOpenService] = useState(
    Boolean(JSON.parse(sessionStorage.getItem("@shelter_isOpen")))
  );
  const [category, setCategory] = useState(
    convertSelected(JSON.parse(sessionStorage.getItem("@shelter_category")))
  );

  const [tabName, setTabName] = useState("Shelter");

  const queryServices = cate => {
    sessionStorage.setItem("@shelter_category", JSON.stringify(cate));
    window.scrollTo(0, 0);
    setCategory(cate);
    var query = queryData;
    if (tranformSelected(cate) === "ALL") {
      query = removeFilter(query, "category");
    } else {
      query = addFilter(query, "category", tranformSelected(cate));
    }
    dispatch({
      type: GET_SERVICES_REDUCER,
      params: {
        ...query,
        skip: 0
      }
    });
    dispatch({
      type: GET_CRITICAL_HEADER
    });
  };

  const queryServicesByLocation = nearCoordinate => {
    if (nearCoordinate === undefined) {
      return;
    }
    let query = queryData;

    const currentCoordinate =
      currentLocation && currentLocation.latitude && currentLocation.longitude
        ? `${currentLocation.longitude}|${currentLocation.latitude}`
        : undefined;

    if (currentCoordinate) {
      query = addFilter(query, "currentCoordinate", currentCoordinate);
    } else {
      query = removeFilter(query, "currentCoordinate");
    }

    query = addFilter(query, "nearCoordinate", nearCoordinate);

    dispatch({
      type: GET_SERVICES_REDUCER,
      params: {
        ...query,
        skip: 0
      },
      noLoading: true
    });
    dispatch({
      type: GET_CRITICAL_HEADER
    });
  };

  const setOpenServices = open => {
    sessionStorage.setItem("@shelter_isOpen", JSON.stringify(open));
    window.scrollTo(0, 0);
    var query = queryData;

    if (open) {
      query = addFilter(query, "isOpen", open);
    } else {
      query = removeFilter(query, "isOpen");
    }

    let params = {
      ...query,
      skip: 0,
      userTimezone: new Date().getTimezoneOffset()
    };
    !open && delete params.userTimezone;

    setIsOpenService(open);
    dispatch({
      type: GET_SERVICES_REDUCER,
      params: params
    });
    dispatch({
      type: GET_CRITICAL_HEADER
    });
  };

  const openMapView = open => {
    sessionStorage.setItem("@shelter_isMapView", JSON.stringify(open));
    setIsMapView(open);
  };

  const openUrl = url => {
    dispatch(push(url));
  };

  const clickOpenMenu = (open: boolean) => {
    setMenuOpen(open);
  };

  const getFilter = params => {
    var name = params.type;
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    setTabName(name);

    var query = queryData;
    console.log("-=-=- ", params);
    if (params.q === "All") {
      delete query.q;
    } else {
      query = {
        ...query,
        q: params.q
      };
    }

    query = addFilter(query, "type", params.type);

    !loadingLocation &&
      dispatch({
        type: GET_SERVICES_REDUCER,
        params: {
          ...query,
          skip: 0
        }
      });
    dispatch({
      type: GET_CRITICAL_HEADER
    });
  };

  const onClickKudo = id => {
    dispatch({
      type: LIKE_SERVICE_REQUEST,
      id: id
    });
  };
  const onRefresh = () => {
    dispatch({
      type: REFRESH_SERVICES_REQUEST
    });
  };

  const [formFLag, setFormFLag] = useState({});

  const onClickFlag = service => {
    setFormFLag({
      type: "SERVICE",
      service: service.id,
      subject: service.name || "Shelter Service"
    });
    setServiceNameFlag(service.name);
    setOpenFlag(true);
  };

  const loadmoreServices = () => {
    dispatch({
      type: LOADMORE_SERVICES_REQUEST,
      searchService: isOpenSearch
    });
  };

  const submitForm = data => {
    dispatch({
      type: CREATE_FEEDBACK_SERVICE_REQUEST,
      form: {
        ...data,
        ...formFLag
      },
      message: translate("SENT_FEEDBACK_SUCCESSFULLY")
    });
    setOpenFlag(false);
  };

  useEffect(() => {
    if (current_user && current_user.isLogin) {
      init();
    }
  }, [current_user]);

  useEffect(() => {
    if (isMapView) {
      const currentCoordinate =
        currentLocation && currentLocation.latitude && currentLocation.longitude
          ? `${currentLocation.longitude}|${currentLocation.latitude}`
          : undefined;
      queryServicesByLocation(currentCoordinate);
    }
    // eslint-disable-next-line
  }, []);

  const [badges, setBadges] = useState(null);

  const init = async () => {
    try {
      const badgeCount = await getReportNotifcations();
      if (badgeCount) {
        setBadges({ ...badgeCount });
      }
    } catch (error) {
      console.log("Can not get report notification", error);
    }
  };

  return (
    <GridFullHeight className={classes.root} container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight
          container
          className={clsx({ [classes.menuOpen]: menuOpen })}
        >
          <HeaderBar
            isOpenSearch={isOpenSearch}
            setIsOpenSearch={setIsOpenSearch}
            menuIsOpen={menuOpen}
            clickOpenMenu={clickOpenMenu}
          />
          {loading || loadingLocation ? (
            <Loading />
          ) : (
            <>
              <SideBar
                isMapView={isMapView}
                setIsMapView={openMapView}
                openUrl={openUrl}
                menuIsOpen={menuOpen}
                clickOpenMenu={clickOpenMenu}
                setOpenServices={setOpenServices}
                isOpenService={isOpenService}
                category={category}
                setCategory={queryServices}
                badges={badges}
              />
              <BreakingNews
                critical_header_services={critical_header_services}
                openUrl={openUrl}
              />
              {isMapView ? (
                <Mapview
                  currentLocation={currentLocation}
                  services={services}
                  openUrl={openUrl}
                  queryServicesByLocation={queryServicesByLocation}
                />
              ) : (
                <>
                  <HomePageContainer
                    tabName={tabName}
                    currentLocation={currentLocation}
                    onClickFlag={onClickFlag}
                    onClickKudo={onClickKudo}
                    services={services}
                    onRefresh={onRefresh}
                    loadingMore={loadingMore}
                    loadmoreServices={loadmoreServices}
                    canLoadmore={canLoadmore}
                    openUrl={openUrl}
                    isOpenSearch={isOpenSearch}
                    hasHeader={critical_header_services.length !== 0}
                  />
                </>
              )}
            </>
          )}
          {!loadingLocation && !isOpenSearch && (
            <ScrollableTabs getFilter={getFilter} {...props} />
          )}
          <ModalFlag
            currentLocation={currentLocation}
            submitForm={submitForm}
            open={openFlag}
            setOpen={setOpenFlag}
            serviceNameFlag={serviceNameFlag}
          />
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(HomePage);
