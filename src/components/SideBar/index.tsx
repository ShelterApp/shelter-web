import React, { useState } from "react";
import clsx from "clsx";
import styles from "./styles";

import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

import {
  Call as CallIcon,
  StarRate as StarRateIcon,
  Info as InfoIcon,
  Help as HelpIcon,
  Security as SecurityIcon,
  ExitToApp as ExitToAppIcon,
  Fingerprint as FingerprintIcon,
  AddCircle as AddCircleIcon
} from "@material-ui/icons";

import IosMapOutline from "react-ionicons/lib/IosMapOutline";
import MdThumbsUp from "react-ionicons/lib/MdThumbsUp";
import IosTime from "react-ionicons/lib/IosTime";
import IosKeypad from "react-ionicons/lib/IosKeypad";
import IosCreate from "react-ionicons/lib/IosCreate";
import MdClipboard from "react-ionicons/lib/MdClipboard";
import MdContact from "react-ionicons/lib/MdContact";
import MdPersonAdd from "react-ionicons/lib/MdPersonAdd";
import MdCheckmarkCircle from "react-ionicons/lib/MdCheckmarkCircle";
import MdUnlock from "react-ionicons/lib/MdUnlock";
import IosHappy from "react-ionicons/lib/IosHappy";

import { useSelector, useDispatch } from "react-redux";
import { reducerType } from "redux/reducers";
import { GET_SERVICES_REDUCER } from "redux/reducers/service/actionTypes";
import { LOGOUT_REQUEST } from "redux/reducers/auth/actionTypes";
import AntSwitch from "components/SwitchButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDonate } from "@fortawesome/free-solid-svg-icons";

import { Icon } from "@iconify/react";
import charityIcon from "@iconify-icons/mdi/charity";

interface SideBarProps {
  menuIsOpen: boolean;
  clickOpenMenu: Function;
  openUrl: Function;
  isMapView: boolean;
  setIsMapView: Function;
  setOpenServices: Function;
  isOpenService: boolean;
  setCategory: Function;
  category: string;
  badges: any;
}

const SideBar = React.memo((props: SideBarProps) => {
  const current_user = useSelector(
    (state: reducerType) => state.auth.current_user
  );
  const role =
    current_user && current_user.isLogin
      ? current_user.isAdmin
        ? "admin"
        : "user"
      : "guest";

  const dispatch = useDispatch();
  const classes = styles();
  const {
    clickOpenMenu,
    menuIsOpen,
    isMapView,
    setIsMapView,
    setOpenServices,
    isOpenService,
    category,
    setCategory,
    badges
  } = props;

  const [topKudos, setTopKudos] = useState(
    Boolean(JSON.parse(sessionStorage.getItem("@shelter_isTopKudos")))
  );

  const setSortTopKudos = open => {
    sessionStorage.setItem("@shelter_isTopKudos", JSON.stringify(open));
    window.scrollTo(0, 0);
    let params = {
      skip: 0,
      sort: open ? "likes" : ""
    };
    dispatch({
      type: GET_SERVICES_REDUCER,
      params: params
    });
    setTopKudos(open);
  };

  const openUrl = url => {
    props.openUrl(url);
  };

  const openNewPage = url => {
    var win = window.open(url, "_blank");
    win.focus();
  };

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    clickOpenMenu(open);
  };

  const logout = () => {
    dispatch({
      type: LOGOUT_REQUEST
    });
  };

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div className={classes.toolbar}>
        {role !== "guest" ? <p>{current_user.email}</p> : <p>Options</p>}
      </div>
      <Divider />
      <ListItem className={classes.optMenu} button>
        <ListItemIcon>
          <IosTime color="#6A46E5" fontSize="18px" />
        </ListItemIcon>
        <ListItemText primary={"Open Services"} />
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>
              <AntSwitch
                checked={isOpenService}
                onChange={() => {
                  setOpenServices(!isOpenService);
                }}
                name="checkedC"
              />
            </Grid>
          </Grid>
        </Typography>
      </ListItem>
      <Divider />
      <ListItem className={classes.listSelections}>
        {["Men", "Women", "Youth/Kids", "All"].map((text, index) => {
          return (
            <span
              className={clsx(
                {
                  [classes.borderRadiusLeft]: index === 0,
                  [classes.borderRadiusRight]: index === 3,
                  [classes.selectActive]: category === text
                },
                classes.selection
              )}
              onClick={() => setCategory(text)}
              key={text}
            >
              {text}
            </span>
          );
        })}
      </ListItem>
      <ListItem className={classes.listSelections}>
        {["Seniors", "Disabled", "Families", "LGBT+"].map((text, index) => {
          return (
            <span
              className={clsx(
                {
                  [classes.borderRadiusLeft]: index === 0,
                  [classes.borderRadiusRight]: index === 3,
                  [classes.selectActive]: category === text
                },
                classes.selection
              )}
              onClick={() => setCategory(text)}
              key={text}
            >
              {text}
            </span>
          );
        })}
      </ListItem>
      <Divider />
      <ListItem className={classes.optMenu} button>
        <ListItemIcon>
          <IosMapOutline color="#6A46E5" fontSize="18px" />
        </ListItemIcon>
        <ListItemText primary={"Map View"} />
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>
              <AntSwitch
                checked={isMapView}
                onChange={() => {
                  setIsMapView(!isMapView);
                }}
                name="checkedC"
              />
            </Grid>
          </Grid>
        </Typography>
      </ListItem>
      <Divider />
      {role === "admin" && (
        <>
          <ListItem className={classes.optMenu} button>
            <ListItemIcon>
              <MdThumbsUp color="#6A46E5" fontSize="18px" />
            </ListItemIcon>
            <ListItemText primary={"Top Kudos"} />
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>
                  <AntSwitch
                    checked={topKudos}
                    onChange={() => {
                      setSortTopKudos(!topKudos);
                    }}
                    name="checkedC"
                  />
                </Grid>
              </Grid>
            </Typography>
          </ListItem>
          <Divider />
        </>
      )}
      <ListItem
        onClick={() => openUrl("/crisis_lines")}
        className={classes.optMenu}
        button
      >
        <ListItemIcon>
          <CallIcon className={classes.iconM} />
        </ListItemIcon>
        <ListItemText primary={"Crisis Lines"} />
      </ListItem>
      <Divider />
      <ListItem
        onClick={() => openUrl("/my_favorites")}
        className={classes.optMenu}
        button
      >
        <ListItemIcon>
          <StarRateIcon className={classes.iconM} />
        </ListItemIcon>
        <ListItemText primary={"My Favorites"} />
      </ListItem>
      {role !== "guest" && (
        <>
          <Divider />
          <ListItem
            onClick={() => openUrl("/add_service")}
            className={classes.optMenu}
            button
          >
            <ListItemIcon>
              <AddCircleIcon className={classes.iconM} />
            </ListItemIcon>
            <ListItemText primary={"Add Service"} />
          </ListItem>
          {role === "admin" && (
            <>
              <Divider />
              <ListItem
                onClick={() => openUrl("/crisis_lines/new")}
                className={classes.optMenu}
                button
              >
                <ListItemIcon>
                  <AddCircleIcon className={classes.iconM} />
                </ListItemIcon>
                <ListItemText primary={"Add Crisis Line"} />
              </ListItem>
            </>
          )}
          <Divider />
          <ListItem
            onClick={() => openUrl("/manage_services")}
            className={classes.optMenu}
            button
          >
            <ListItemIcon>
              <IosKeypad color="#6A46E5" fontSize="18px" />
            </ListItemIcon>
            <Badge
              max={9999}
              classes={{
                badge: classes.badge
              }}
              badgeContent={badges ? Number(badges.countManagedServices) : 0}
              color="error"
            >
              <ListItemText primary={"Manage Services"} />
            </Badge>
          </ListItem>
          <Divider />
          <ListItem
            onClick={() => openUrl("/feedbacks")}
            className={classes.optMenu}
            button
          >
            <ListItemIcon>
              <IosHappy color="#6A46E5" fontSize="18px" />
            </ListItemIcon>
            <Badge
              max={9999}
              classes={{
                badge: classes.badge
              }}
              badgeContent={badges ? Number(badges.countUnReadFeedbacks) : 0}
              color="error"
            >
              <ListItemText primary={"Manage Feedback"} />
            </Badge>
          </ListItem>
          <Divider />
          <ListItem
            onClick={() => openUrl("/available_beds")}
            className={classes.optMenu}
            button
          >
            <ListItemIcon>
              <MdCheckmarkCircle color="#6A46E5" fontSize="18px" />
            </ListItemIcon>
            <Badge
              max={9999}
              classes={{
                badge: classes.badge
              }}
              badgeContent={badges ? Number(badges.countManagedShelters) : 0}
              color="error"
            >
              <ListItemText primary={"Update Shelter"} />
            </Badge>
          </ListItem>
          {current_user.isAdmin ? (
            <>
              <Divider />
              <ListItem
                onClick={() => openUrl("/manage_approvals")}
                className={classes.optMenu}
                button
              >
                <ListItemIcon>
                  <MdUnlock color="#6A46E5" fontSize="18px" />
                </ListItemIcon>
                <Badge
                  max={9999}
                  classes={{
                    badge: classes.badge
                  }}
                  badgeContent={
                    badges ? Number(badges.countNotApprovedServices) : 0
                  }
                  color="error"
                >
                  <ListItemText primary={"Manage Approvals"} />
                </Badge>
              </ListItem>
              <Divider />
              {
                // <ListItem
                //   onClick={() => openUrl("/manage_access")}
                //   className={classes.optMenu}
                //   button
                // >
                //   <ListItemIcon>
                //     <MdUnlock color="#6A46E5" fontSize="18px" />
                //   </ListItemIcon>
                //   <Badge
                //     max={9999}
                //     classes={{
                //       badge: classes.badge
                //     }}
                //     badgeContent={badges ? Number(badges.countAdminUsers) : 0}
                //     color="error"
                //   >
                //     <ListItemText primary={"Manage Admin Access"} />
                //   </Badge>
                // </ListItem>
                // <Divider />
                // <ListItem
                //   onClick={() => openUrl("/manage_superusers")}
                //   className={classes.optMenu}
                //   button
                // >
                //   <ListItemIcon>
                //     <MdPersonAdd color="#6A46E5" fontSize="18px" />
                //   </ListItemIcon>
                //   <Badge
                //     max={9999}
                //     classes={{
                //       badge: classes.badge
                //     }}
                //     badgeContent={badges ? Number(badges.countSupperUsers) : 0}
                //     color="error"
                //   >
                //     <ListItemText primary={"Manage Users"} />
                //   </Badge>
                // </ListItem>
              }
              <ListItem
                onClick={() => openUrl("/manage_users")}
                className={classes.optMenu}
                button
              >
                <ListItemIcon>
                  <MdPersonAdd color="#6A46E5" fontSize="18px" />
                </ListItemIcon>
                <Badge
                  max={9999}
                  classes={{
                    badge: classes.badge
                  }}
                  badgeContent={badges ? Number(badges.countTotalUsers) : 0}
                  color="error"
                >
                  <ListItemText primary={"Manage Users"} />
                </Badge>
              </ListItem>
            </>
          ) : (
            <>
              <Divider />
              <ListItem
                onClick={() => openUrl("/update_profile")}
                className={classes.optMenu}
                button
              >
                <ListItemIcon>
                  <MdContact color="#6A46E5" fontSize="18px" />
                </ListItemIcon>
                <ListItemText primary={"Manage Profile"} />
              </ListItem>
            </>
          )}
          {current_user.lastMethod === "LOCAL" && (
            <>
              <Divider />
              <ListItem
                onClick={() => openUrl("/change_password")}
                className={classes.optMenu}
                button
              >
                <ListItemIcon>
                  <FingerprintIcon className={classes.iconM} />
                </ListItemIcon>
                <ListItemText primary={"Change Password"} />
              </ListItem>
            </>
          )}
        </>
      )}
      {(role === "guest" || role === "user") && (
        <>
          <Divider />
          <ListItem
            onClick={() => openUrl("/about")}
            className={classes.optMenu}
            button
          >
            <ListItemIcon>
              <InfoIcon className={classes.iconM} />
            </ListItemIcon>
            <ListItemText primary={"About Shelter App"} />
          </ListItem>
          <Divider />
          <ListItem
            onClick={() => openUrl("/introduce")}
            className={classes.optMenu}
            button
          >
            <ListItemIcon>
              <HelpIcon className={classes.iconM} />
            </ListItemIcon>
            <ListItemText primary={"Show Tutorial"} />
          </ListItem>
          <Divider />
          <ListItem
            onClick={() => openUrl("/feedback")}
            className={classes.optMenu}
            button
          >
            <ListItemIcon>
              <IosCreate color="#6A46E5" fontSize="18px" />
            </ListItemIcon>
            <ListItemText primary={"Give Feedback"} />
          </ListItem>
          <Divider />
          <ListItem
            onClick={() => openNewPage("http://volunteer.shelterapp.org/")}
            className={classes.optMenu}
            button
          >
            <ListItemIcon>
              <Icon icon={charityIcon} className={classes.iconM} />
            </ListItemIcon>
            <ListItemText primary={"Volunteer"} />
          </ListItem>
          <Divider />
          <ListItem
            onClick={() =>
              openNewPage("https://www.paypal.com/fundraiser/charity/3945196")
            }
            className={classes.optMenu}
            button
          >
            <ListItemIcon>
              <FontAwesomeIcon icon={faDonate} className={classes.iconM} />
            </ListItemIcon>
            <ListItemText primary={"Donate"} />
          </ListItem>
          <Divider />
          <ListItem
            onClick={() => openUrl("/terms_of_use")}
            className={classes.optMenu}
            button
          >
            <ListItemIcon>
              <MdClipboard color="#6A46E5" fontSize="18px" />
            </ListItemIcon>
            <ListItemText primary={"Terms of Use"} />
          </ListItem>
          <Divider />
          <ListItem
            onClick={() => openUrl("/privacy_policy")}
            className={classes.optMenu}
            button
          >
            <ListItemIcon>
              <SecurityIcon className={classes.iconM} />
            </ListItemIcon>
            <ListItemText primary={"Privacy Policy"} />
          </ListItem>
        </>
      )}
      {role !== "guest" ? (
        <>
          <Divider />
          <ListItem onClick={logout} className={classes.optMenu} button>
            <ListItemIcon>
              <ExitToAppIcon className={classes.iconM} />
            </ListItemIcon>
            <ListItemText primary={"Log out"} />
          </ListItem>
        </>
      ) : (
        <>
          <Divider />
          <ListItem
            onClick={() => openUrl("/login")}
            className={classes.optMenu}
            button
          >
            <ListItemIcon>
              <ExitToAppIcon className={classes.iconM} />
            </ListItemIcon>
            <ListItemText primary={"Provider Login/SignUp"} />
          </ListItem>
        </>
      )}
    </div>
  );

  return (
    <React.Fragment key={"left"}>
      <Drawer anchor={"left"} open={menuIsOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </React.Fragment>
  );
});

export default SideBar;
