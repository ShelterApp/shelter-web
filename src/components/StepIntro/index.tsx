import React from "react";
import clsx from "clsx";
import styles from "./styles";
import Button from "components/Button";

import firstscreen from "asset/img/1firstscreen.png";
import secondscreen from "asset/img/2secondscreen.png";
import bottomIcons from "asset/img/3BottomIcons.png";
import optionsImg from "asset/img/4Options.png";
import crisisLines from "asset/img/5CrisisLines.png";
import contactImg from "asset/img/6Contact.png";
import mapviewimg from "asset/img/7Mapview.png";
import chatbotImg from "asset/img/8Chatbot.png";
import chatbotIcon from "asset/img/chatbox.png";

import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import StarIcon from "@material-ui/icons/Star";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import RoomIcon from "@material-ui/icons/Room";
import CheckIcon from "@material-ui/icons/Check";
import Cookie from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

interface StepIntroProps {
  stepNumber: number;
  goToSlide: Function;
  openUrl: Function;
}

const StepIntro = React.memo((props: StepIntroProps) => {
  const classes = styles();
  const { stepNumber, goToSlide, openUrl } = props;

  return (
    <React.Fragment>
      {stepNumber === 0 && (
        <div className={classes.stepContainer}>
          <p onClick={() => goToSlide(8)} className={classes.textSkip}>
            SKIP
          </p>
          <img
            alt={`img-${stepNumber}`}
            src={firstscreen}
            width={320}
            height={320}
          />
          <p className={classes.title}>Welcome to Shelter App</p>
          <p className={classes.desc}>
            Home Screen of the App displays list of services with info like Bed
            Availablility for Shelters, Open or Closed Times, Distance from your
            Location, etc. Feel Free to give Kudos to services that you like
            using{" "}
            <span className={classes.kudoIcon}>
              <ThumbUpAltIcon fontSize="small" />
            </span>
          </p>
        </div>
      )}
      {stepNumber === 1 && (
        <div className={classes.stepContainer}>
          <p onClick={() => goToSlide(8)} className={classes.textSkip}>
            SKIP
          </p>
          <img
            alt={`img-${stepNumber}`}
            src={secondscreen}
            width={320}
            height={320}
          />
          <p className={classes.desc}>
            You can click on any service on the Home Screen to get detailed info
            including Bus Directions to that service from your Location. You can
            click on{" "}
            <span className={classes.kudoIcon}>
              <StarIcon fontSize="small" />
            </span>{" "}
            at the top right of details screen to add that service to My
            Favorites.
          </p>
        </div>
      )}
      {stepNumber === 2 && (
        <div className={classes.stepContainer}>
          <p onClick={() => goToSlide(8)} className={classes.textSkip}>
            SKIP
          </p>
          <img
            alt={`img-${stepNumber}`}
            src={bottomIcons}
            width={320}
            height={320}
          />
          <p className={classes.desc}>
            Tabs at the bottom of Home screen will help you navigate to
            resources like Food, Shelter, Health, Resources & Work. Each tab has
            Sub Tabs on top of them like Clothes, Hygiene, Tech, etc., to help
            narrow your search.
          </p>
        </div>
      )}
      {stepNumber === 3 && (
        <div className={classes.stepContainer}>
          <p onClick={() => goToSlide(8)} className={classes.textSkip}>
            SKIP
          </p>
          <img
            alt={`img-${stepNumber}`}
            src={optionsImg}
            width={320}
            height={320}
          />
          <p className={classes.desc}>
            Clicking on{" "}
            <span className={classes.kudoIcon}>
              <MenuIcon fontSize="small" />
            </span>{" "}
            at the top of the Home Screen will take you to Options Menu where
            you can filter services based on Category like Youth, LGBT, Women,..
            Services that are Open Now, Map View, Crisis Lines, My Favorites,
            etc.
          </p>
        </div>
      )}
      {stepNumber === 4 && (
        <div className={classes.stepContainer}>
          <p onClick={() => goToSlide(8)} className={classes.textSkip}>
            SKIP
          </p>
          <img
            alt={`img-${stepNumber}`}
            src={crisisLines}
            width={320}
            height={320}
          />
          <p className={classes.desc}>
            You can click on Crisis Lines in Options Menu to reach out to
            National Hotlines for emotional support. You can also search for
            Crisis Lines or Services using{" "}
            <span className={classes.kudoIcon}>
              <SearchIcon fontSize="small" />
            </span>
          </p>
        </div>
      )}
      {stepNumber === 5 && (
        <div className={classes.stepContainer}>
          <p onClick={() => goToSlide(8)} className={classes.textSkip}>
            SKIP
          </p>
          <img
            alt={`img-${stepNumber}`}
            src={contactImg}
            width={320}
            height={320}
          />
          <p className={classes.desc}>
            Clicking{" "}
            <FontAwesomeIcon icon={faFlag} className={clsx(classes.kudoIcon)} />{" "}
            on Home screen for services will help you connect to the App Admin
            or Service Provider for that resource.
          </p>
        </div>
      )}
      {stepNumber === 6 && (
        <div className={classes.stepContainer}>
          <p onClick={() => goToSlide(8)} className={classes.textSkip}>
            SKIP
          </p>
          <img
            alt={`img-${stepNumber}`}
            src={mapviewimg}
            width={320}
            height={320}
          />
          <p className={classes.desc}>
            You can view services in List View or Map View and can even search
            for another City or Zip using{" "}
            <span className={classes.kudoIcon}>
              <RoomIcon fontSize="small" />
            </span>{" "}
            at the top of Home Screen.
          </p>
        </div>
      )}
      {stepNumber === 7 && (
        <div className={classes.stepContainer}>
          <p onClick={() => goToSlide(8)} className={classes.textSkip}>
            SKIP
          </p>
          <img
            alt={`img-${stepNumber}`}
            src={chatbotImg}
            width={320}
            height={320}
          />
          <p className={classes.desc}>
            Click on{" "}
            {
              <img
                src={chatbotIcon}
                className={classes.iconChatbot}
                alt="chatbox"
              />
            }{" "}
            Home Screen for interacting with our AI Powered Chatbot to find
            services with ease
          </p>
        </div>
      )}
      {stepNumber === 8 && (
        <div className={classes.stepContainer}>
          <div className={classes.checked}>
            <CheckIcon fontSize="large" />
          </div>
          <h1 className={classes.title}>ACCEPT TERMS</h1>
          <p className={clsx(classes.desc, classes.borderCenter)}>
            By Clicking I agree, you agree to the Shelter App, Inc's{" "}
            <span
              onClick={() => openUrl("/terms_of_use")}
              className={classes.textLink}
            >
              Terms of Use
            </span>{" "}
            and{" "}
            <span
              onClick={() => openUrl("/privacy_policy")}
              className={classes.textLink}
            >
              Privacy Policy
            </span>
          </p>
          <div className={classes.groupBtn}>
            <Button onClick={() => goToSlide(0)} className={classes.mr7}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                Cookie.set("@shelter_alreadyaccess", JSON.stringify(true));
                openUrl("/");
              }}
              className={classes.ml7}
            >
              I Agree
            </Button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
});

export default StepIntro;
