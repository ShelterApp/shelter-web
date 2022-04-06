import React from "react";
import { History } from "history";
import styled, { ThemeProvider } from "styled-components";
import { ConnectedRouter } from "connected-react-router";
import Routes from "routers";
import theme from "config/theme";
import { initApi } from "@shelter/core/dist/apis";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import { Dispatch } from "redux";
import {
  SET_CURRENT_LOCATION_REQUEST,
  SET_LOADING_LOCATION
} from "redux/reducers/service/actionTypes";
import { CLEAR_MESSAGES_REDUCER } from "redux/reducers/messages/actionTypes";
import {
  CLEAR_AUTH,
  UPDATE_TOTAL_SERVICES
} from "redux/reducers/auth/actionTypes";
import { useBeforeFirstRender } from "common/componentWillMount";
import FlashMessage from "components/FlashMessage";
import { useSelector } from "react-redux";
import { reducerType } from "redux/reducers";
import { getProfile } from "api/auth/getProfile";
import { LoadScript } from "@react-google-maps/api";
import imgLoading from "asset/img/loading.gif";
import Cookie from "js-cookie";
import Loading from "components/Loading";

initApi({ shelterApiUrl: process.env.REACT_APP_WWW_MOBILE_API_URL });

type AppProps = {
  history: History;
  dispatch: Dispatch;
};

const AppContainer = styled.div`
  background-color: white;
  height: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding-top: 44px;
`;

const App = ({ history, dispatch }: AppProps) => {
  const message = useSelector((state: reducerType) => state.message);
  const loadingLocation = useSelector(
    (state: reducerType) => state.service.loadingLocation
  );
  const current_user = useSelector(
    (state: reducerType) => state.auth.current_user
  );
  React.useEffect(() => {
    if (message.hasMessage) {
      setContent(message.message);
      setTypeMessage(message.type);
      setOpenMessage(true);
    }
    // eslint-disable-next-line
  }, [message.hasMessage]);
  const [openMessage, setOpenMessage] = React.useState(false);
  const [content, setContent] = React.useState("");
  const [typeMessage, setTypeMessage] = React.useState("success");

  const getLocation = (showPosition, callback) => {
    dispatch({ type: SET_LOADING_LOCATION, loading: true });
    const cb = () => {
      if (sessionStorage.getItem("@shelter_block_location") === null) {
        sessionStorage.setItem("@shelter_block_location", JSON.stringify(true));
      }
      callback();
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, cb, {
        enableHighAccuracy: true,
        maximumAge: 10000
      });
      dispatch({ type: SET_LOADING_LOCATION, loading: false });
    } else {
      cb();
    }
  };

  const setCurrentLocation = position => {
    console.log(position);
    sessionStorage.setItem("@shelter_block_location", JSON.stringify(false));
    dispatch({
      type: SET_CURRENT_LOCATION_REQUEST,
      currentLocation: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    });
  };

  const handleClose = boolean => {
    setOpenMessage(false);
    dispatch({
      type: CLEAR_MESSAGES_REDUCER
    });
  };

  const callbackErrorGetCurrentLocation = () => {
    console.log("Geolocation is not supported by this browser.");
    if (sessionStorage.getItem("@shelter_block_location") === null) {
      sessionStorage.setItem("@shelter_block_location", JSON.stringify(true));
    }
    dispatch({
      type: SET_CURRENT_LOCATION_REQUEST,
      currentLocation: undefined
    });
    dispatch({ type: SET_LOADING_LOCATION, loading: false });
  };

  useBeforeFirstRender(() => {
    if (current_user && current_user.isLogin) {
      getProfile().then(data => {
        if (typeof data === "string" && data === "Unauthorized") {
          dispatch({
            type: CLEAR_AUTH
          });
        } else {
          if (current_user.totalServices !== data.totalServices) {
            dispatch({
              type: UPDATE_TOTAL_SERVICES,
              current_user: data
            });
          }
          console.log(data);
        }
      });
    }
    if (!sessionStorage.getItem("@shelter_current_location")) {
      getLocation(setCurrentLocation, callbackErrorGetCurrentLocation);
    }
  });

  React.useEffect(() => {
    if (!Boolean(JSON.parse(sessionStorage.getItem("@shelterGoBack")))) {
      window.scrollTo(0, 0);
    }
    if (
      Cookie.get("@shelter_alreadyaccess") === undefined ||
      !Boolean(JSON.parse(Cookie.get("@shelter_alreadyaccess")))
    ) {
      if (window.location.pathname !== "/introduce") {
        window.location.href = "/introduce";
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <LoadScript
          id="script-loader"
          googleMapsApiKey="AIzaSyC63EJ9w6OUC4QwtsNb9PyrNOQqr54xbkg"
          loadingElement={
            <img width={50} height={50} src={imgLoading} alt="loading" />
          }
        >
          <AppContainer>
            {loadingLocation ? (
              <Loading />
            ) : (
              <ConnectedRouter history={history}>
                <Routes />
                <FlashMessage
                  open={openMessage}
                  setOpen={handleClose}
                  message={content}
                  type={typeMessage}
                />
              </ConnectedRouter>
            )}
          </AppContainer>
        </LoadScript>
      </I18nextProvider>
    </ThemeProvider>
  );
};

export default App;
