import React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import LoginForm from "./components/FormLogin";
import SignUpForm from "./components/FormSignUp";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
// import TwitterLogin from "react-twitter-login";
import { verifyAccessToken } from "api/auth/login";
import ButtonShadow from "components/ButtonShadow";
import Grid from "@material-ui/core/Grid";
import { SET_MESSAGES_REDUCER } from "redux/reducers/messages/actionTypes";
import { useDispatch } from "react-redux";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles";
import clsx from "clsx";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

interface FormProps {
  login: Function;
  openUrl: Function;
}

const FormAuth = React.memo((props: FormProps) => {
  const { login, openUrl } = props;
  const classes = styles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const responseFacebook = response => {
    const { accessToken, userID, email, phone, name } = response;
    const data = {
      type: "FACEBOOK",
      accessToken,
      email: email || `${userID || "shelter_user"}@facebook.com`,
      displayName: name || "Shelter User",
      phone: phone || undefined
    };
    callAPIVerifyAccessToken(data);
  };

  const responseGoogle = response => {
    if (response && response.accessToken) {
      const { accessToken, profileObj } = response;
      const { email, name } = profileObj;
      const obj = {
        type: "GOOGLE",
        accessToken: accessToken,
        email: email,
        displayName: name || "Shelter User"
      };
      callAPIVerifyAccessToken(obj);
    }
  };

  const callAPIVerifyAccessToken = data => {
    console.log(data);
    if (!data || !data.accessToken) return;
    try {
      verifyAccessToken(data).then(user => {
        if (user && user.email) {
          login(user);
          return;
        }
        if (user.code && user.message) {
          dispatch({
            type: SET_MESSAGES_REDUCER,
            message: {
              type: "error",
              key: "ERROR_LOGIN",
              message: user.message
            }
          });
        }
      });
    } catch (error) {
      console.log("can not save token", error);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          className={classes.tabContainer}
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab className={classes.tab} label="LOGIN" {...a11yProps(0)} />
          <Tab className={classes.tab} label="SIGNUP" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <LoginForm openUrl={openUrl} login={login} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <SignUpForm openUrl={openUrl} login={login} />
        </TabPanel>
      </SwipeableViews>
      <div className={classes.socialLogin}>
        <p className={classes.loginWith}>Login with</p>
        <Grid
          style={{ paddingTop: "20px", justifyContent: "center" }}
          container
          spacing={1}
          direction="row"
        >
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <FacebookLogin
              appId="1119157218274580"
              autoLoad={false}
              fields="name,email,picture"
              render={renderProps => (
                <ButtonShadow
                  onClick={renderProps.onClick}
                  className={clsx(classes.fbBtn, classes.h100)}
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                  <p className={classes.m0}>Facebook</p>
                </ButtonShadow>
              )}
              callback={responseFacebook}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID_GOOGLE}
              render={renderProps => (
                <button
                  className={clsx(classes.ggBtn, classes.cusBtn, classes.h100)}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FontAwesomeIcon icon={faGoogle} />
                  <p>Google</p>
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </Grid>
          {
            // <Grid item xs={6} sm={6} md={3} lg={3}>
            //   <InstagramLogin
            //     cssClass={clsx(classes.insBtn, classes.cusBtn, classes.h100)}
            //     clientId="996134504052150"
            //     onSuccess={responseInstagram}
            //     onFailure={responseInstagram}
            //   >
            //     <FontAwesomeIcon icon={faInstagram} />
            //     <p>Instagram</p>
            //   </InstagramLogin>
            // </Grid>
          }
          {
            // <Grid item xs={6} sm={6} md={6} lg={4}>
            //   <TwitterLogin
            //     authCallback={responseTwitter}
            //     consumerKey={process.env.REACT_APP_TWITTER_COMSUMER_KEY}
            //     consumerSecret={process.env.REACT_APP_TWITTER_CONSUMER_SECRET}
            //     callbackUrl={process.env.REACT_APP_CALLBACK_TWITTER_URL}
            //     children={
            //       <ButtonShadow
            //         className={clsx(classes.twitterBtn, classes.h100)}
            //       >
            //         <FontAwesomeIcon icon={faTwitter} />
            //         <p className={classes.m0}>Twitter</p>
            //       </ButtonShadow>
            //     }
            //   />
            // </Grid>
          }
        </Grid>
      </div>
    </div>
  );
});
export default FormAuth;
