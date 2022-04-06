import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import clsx from "clsx";
import MdSearch from "react-ionicons/lib/MdSearch";
import FlashMessage from "components/FlashMessage";
import { useTranslation } from "react-i18next";
import SearchBar from "components/Search";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import ChooseLocation from "components/ChooseLocation";
import RoomIcon from "@material-ui/icons/Room";
import FAQPopUp from "components/FAQPopUp";

export interface HeaderBarProps {
  name?: string;
  serviceId?: string;
  isSearch?: boolean;
  favorite?: boolean;
  openUrl: Function;
  backUrl?: string;
  handleSearch?: Function;
  handleCloseSearch?: Function;
  faq?: boolean | false;
  setLocate?: boolean | false;
  login?: boolean | false;
  content?: string | "";
}

const HeaderBarSub = React.memo((props: HeaderBarProps) => {
  const classes = useStyles();
  const {
    name,
    serviceId,
    isSearch,
    favorite,
    openUrl,
    backUrl,
    handleSearch,
    handleCloseSearch,
    faq,
    setLocate,
    login,
    content
  } = props;
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [flashMessage, setFlashMessage] = React.useState(false);
  const translate = useTranslation().t;
  const [isOpenSearch, setIsOpenSearch] = React.useState(false);
  const [chooseLocate, setChooseLocate] = React.useState(false);
  const [openFAQ, handleOpenFAQ] = React.useState(false);

  const clickFavorite = () => {
    if (!serviceId) return;
    const res = localStorage.getItem("@shelter_favorite");
    if (!res) {
      localStorage.setItem("@shelter_favorite", JSON.stringify([serviceId]));
      setIsFavorite(true);
      setFlashMessage(true);
      return;
    }
    const afterRes = JSON.parse(res);
    if (afterRes) {
      const isFound = afterRes.includes(serviceId);
      if (isFound) {
        localStorage.setItem(
          "@shelter_favorite",
          JSON.stringify(afterRes.filter(fil => fil !== serviceId))
        );
        setIsFavorite(false);
        setFlashMessage(true);
        return;
      }
      localStorage.setItem(
        "@shelter_favorite",
        JSON.stringify([...afterRes, serviceId])
      );
      setIsFavorite(true);
      setFlashMessage(true);
      return;
    }
  };

  const message = () => {
    return isFavorite
      ? translate("ADDED_TO_FAVORITE")
      : translate("REMOVED_TO_FAVORITE");
  };

  const redirectTo = () => {
    backUrl ? openUrl(backUrl) : openUrl("/");
  };

  React.useEffect(() => {
    if (serviceId) {
      const res = localStorage.getItem("@shelter_favorite");
      if (!res) return;
      const afterRes = JSON.parse(res);
      if (afterRes) {
        const isFound = afterRes.includes(serviceId);
        if (isFound) {
          setIsFavorite(true);
          return;
        }
      }
      setIsFavorite(false);
      return;
    }
  }, [serviceId]);

  return (
    <div className={classes.root}>
      <AppBar className={classes.toolbar} position="static">
        <Toolbar className={classes.containerHeader}>
          <IconButton
            onClick={() => redirectTo()}
            edge="start"
            className={clsx({ [classes.fontSmall]: login }, classes.menuButton)}
            color="inherit"
            aria-label="menu"
          >
            {login ? "Login" : <KeyboardBackspaceIcon />}
          </IconButton>

          <Typography
            variant="h6"
            className={clsx({ [classes.fontHarabara]: !name }, classes.title)}
          >
            {name ? <p>{name}</p> : "ShelterApp"}
          </Typography>

          {!!favorite ? (
            <IconButton
              onClick={() => clickFavorite()}
              className={classes.iconphone}
              edge="end"
              color="inherit"
            >
              {isFavorite ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          ) : !!isSearch ? (
            <IconButton
              onClick={() => setIsOpenSearch(true)}
              className={classes.iconphone}
              edge="end"
              color="inherit"
            >
              <MdSearch color="white" fontSize="24px" />
            </IconButton>
          ) : (
            <></>
          )}
          {setLocate && (
            <IconButton
              onClick={() => setChooseLocate(true)}
              className={classes.roomBtn}
            >
              <RoomIcon />
            </IconButton>
          )}
          {faq && (
            <IconButton
              onClick={() => handleOpenFAQ(true)}
              className={classes.iconphone}
              edge="end"
              color="inherit"
            >
              <LiveHelpIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {!!isSearch && (
        <SearchBar
          isOpenSearch={isOpenSearch}
          clickOpenSearch={setIsOpenSearch}
          handleCloseSearch={handleCloseSearch}
          handleSearch={handleSearch}
        />
      )}
      <FlashMessage
        open={flashMessage}
        setOpen={setFlashMessage}
        message={message()}
      />
      <ChooseLocation
        isOpenSearch={chooseLocate}
        clickOpenSearch={setChooseLocate}
      />
      <FAQPopUp
        isOpenSearch={openFAQ}
        clickOpenSearch={handleOpenFAQ}
        content={content}
      />
    </div>
  );
});
export default HeaderBarSub;
