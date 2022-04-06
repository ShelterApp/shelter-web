import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import StarRateIcon from "@material-ui/icons/StarRate";
import PhoneIcon from "@material-ui/icons/Phone";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import IconButton from "@material-ui/core/IconButton";

import clsx from "clsx";
import styles from "./styles";

import { ScheduleCategory } from "@shelter/core";

import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChild, faEnvelope, faFlag } from "@fortawesome/free-solid-svg-icons";

import IosPeople from "react-ionicons/lib/IosPeople";
import IosWoman from "react-ionicons/lib/IosWoman";
import IosMan from "react-ionicons/lib/IosMan";
import MdTransgender from "react-ionicons/lib/MdTransgender";
import { ServiceProps } from "common/";
import Schedule from "./components/Schedule";
import moment from "moment";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { ICoords } from "redux/reducers/service";
dayjs.extend(calendar);

interface ServiceItemProps {
  service: ServiceProps;
  onClickKudo: Function;
  onClickFlag: Function;
  currentLocation: ICoords;
  openUrl: Function;
  isMapView?: boolean;
}

const ServiceItem = React.memo((props: ServiceItemProps) => {
  const {
    service,
    onClickKudo,
    onClickFlag,
    currentLocation,
    openUrl,
    isMapView
  } = props;
  const classes = styles();
  const translate = useTranslation().t;
  const [like, setLike] = React.useState(0);
  const {
    name,
    serviceSummary,
    age,
    phone,
    id,
    likes,
    availableBeds,
    updatedAt,
    contactEmail,
    isShowFlag
  } = service;
  React.useEffect(() => {
    if (likes) {
      setLike(likes);
    }
  }, [likes]);

  const clickkudo = () => {
    compareKudo();
  };

  const category: string[] = service.category as string[];

  const isOnlyOne = category && category.length === 1;
  const isYouthKid = isOnlyOne && category[0] === ScheduleCategory.Kids;
  const isMen = isOnlyOne && category[0] === ScheduleCategory.Men;
  const isWomen = isOnlyOne && category[0] === ScheduleCategory.Women;
  const isLGBT = isOnlyOne && category[0] === ScheduleCategory.Lgbt;
  const isExpectedCate = isYouthKid || isMen || isWomen || isLGBT;
  const lastCategory = (category.indexOf("ALL") !== -1
    ? ["Anyone"]
    : category.map(a => translate(a))
  ).join(", ");
  const withAge = age ? `${lastCategory} ${age}` : lastCategory;

  const compareKudo = () => {
    const res = localStorage.getItem("@kudo");

    // const res = getDataToLocal('@kudo');
    if (!res) {
      // call api like
      localStorage.setItem("@kudo", JSON.stringify([id]));
      onClickKudo(id);
      setLike(like + 1);
      return;
    }
    const afterRes = JSON.parse(res);

    if (afterRes) {
      const isFound = afterRes.includes(id);
      if (isFound) return;
      setLike(like + 1);
      localStorage.setItem("@kudo", JSON.stringify([...afterRes, id]));
      onClickKudo(id);
      return;
    }
  };

  const openModelFlag = () => {
    onClickFlag(service);
  };

  const goToDetail = e => {
    openUrl(`/services/${service.id}`);
  };

  return (
    <React.Fragment>
      <Container className={clsx({ [classes.root]: !isMapView })}>
        <div className={clsx({ [classes.flaginline]: isShowFlag })}>
          <Typography
            onClick={goToDetail}
            variant="h3"
            className={classes.title}
          >
            <strong>{name}</strong>
          </Typography>
          {isShowFlag && !isMapView && (
            <IconButton
              onClick={() => openModelFlag()}
              className={classes.spcFlag}
            >
              <FontAwesomeIcon
                icon={faFlag}
                className={clsx(classes.flagIcon)}
              />
            </IconButton>
          )}
        </div>
        <p
          onClick={goToDetail}
          className={clsx(classes.description, classes.w85)}
        >
          <StarRateIcon className={classes.icon} fontSize="small" />{" "}
          {serviceSummary}
        </p>
        {!!isExpectedCate ? (
          <div onClick={goToDetail}>
            {isYouthKid && (
              <p className={classes.description}>
                <FontAwesomeIcon
                  icon={faChild}
                  className={clsx(classes.icon, classes.fzico)}
                />
                {withAge}
              </p>
            )}
            {isMen && (
              <p className={classes.description}>
                <IosMan color="gray" fontSize="20px" className={classes.icon} />
                {withAge}
              </p>
            )}
            {isWomen && (
              <p className={classes.description}>
                <IosWoman
                  color="gray"
                  fontSize="20px"
                  className={classes.icon}
                />
                {withAge}
              </p>
            )}
            {isLGBT && (
              <p className={classes.description}>
                <MdTransgender
                  color="gray"
                  fontSize="20px"
                  className={classes.icon}
                />
                {withAge}
              </p>
            )}
          </div>
        ) : (
          <p onClick={goToDetail} className={classes.description}>
            <IosPeople color="gray" fontSize="20px" className={classes.icon} />
            {withAge}
          </p>
        )}
        {phone ? (
          <a href={`tel:${phone}`} className={classes.iconPhone}>
            <p className={classes.description}>
              <PhoneIcon className={classes.icon} fontSize="small" />
              {phone}
            </p>
          </a>
        ) : (
          contactEmail && (
            <a href={`mailto:${contactEmail}`} className={classes.iconPhone}>
              <p className={classes.description}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className={clsx(classes.icon, classes.fzico)}
                />
                {contactEmail}
              </p>
            </a>
          )
        )}
        {!!availableBeds && (
          <p
            onClick={goToDetail}
            className={clsx(classes.description, classes.colgreen)}
          >
            <span style={{ color: "gray", paddingLeft: 3, paddingRight: 7 }}>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="bed"
                className="svg-inline--fa fa-bed fa-w-45"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  fill="currentColor"
                  d="M176 256c44.11 0 80-35.89 80-80s-35.89-80-80-80-80 35.89-80 80 35.89 80 80 80zm352-128H304c-8.84 0-16 7.16-16 16v144H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v352c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-48h512v48c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V240c0-61.86-50.14-112-112-112z"
                ></path>
              </svg>
            </span>
            {availableBeds} Beds Available. Updated{" "}
            {updatedAt && moment(updatedAt).fromNow()}
          </p>
        )}
        <div className={classes.botDesc}>
          <Schedule
            openUrl={openUrl}
            {...service}
            currentLocation={currentLocation}
          />
          {!isMapView && (
            <p
              onClick={() => clickkudo()}
              className={clsx(classes.description, classes.kudo)}
            >
              <ThumbUpAltIcon fontSize="small" />
              {like > 0 ? `${like} Kudos` : ""}
            </p>
          )}
        </div>
        {!isMapView && <hr className={classes.mx16} />}
      </Container>
    </React.Fragment>
  );
});

export default ServiceItem;
