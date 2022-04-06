import React from "react";
import clsx from "clsx";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "components/Button";
import MapContainer from "components/GoogleMap";
import { ICoords } from "redux/reducers/service";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import StarRateIcon from "@material-ui/icons/StarRate";
import PhoneIcon from "@material-ui/icons/Phone";
import { ServiceProps, parseURL, tranformSchedulesForm } from "common/";
import { ScheduleCategory } from "@shelter/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";
import {
  faChild,
  faUsers,
  faMapMarkerAlt,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

import MdGlobe from "react-ionicons/lib/MdGlobe";
import IosCalendar from "react-ionicons/lib/IosCalendar";

interface ServiceItemProps {
  service: ServiceProps;
  openUrl: Function;
  currentLocation: ICoords;
  onClickFlag: Function;
  onClickReport: Function;
}

const ServiceItem = React.memo((props: ServiceItemProps) => {
  const translate = useTranslation().t;
  const { service, currentLocation, onClickFlag, onClickReport } = props;
  const classes = styles();
  const { name, contactEmail } = service;

  const renderSchedule = () => {
    const { schedules, isContact } = service;
    const lastSchedules = schedules && tranformSchedulesForm(schedules);
    if (lastSchedules.length > 0) {
      return (
        <div className={classes.pItems}>
          {lastSchedules.map((s, idx) => (
            <div
              className={clsx(
                { [classes.lastItem]: idx + 1 === lastSchedules.length },
                classes.childItem
              )}
              key={idx}
            >
              <span className={classes.w35}>
                {idx > 0 &&
                lastSchedules[idx - 1].title === lastSchedules[idx].title
                  ? ""
                  : translate(s.title)}
              </span>
              <span className={classes.w65}>{s.date}</span>
            </div>
          ))}
        </div>
      );
    }
    if (isContact) {
      return (
        <div className={clsx(classes.desc, classes.textShowcontact)}>
          {translate("IS_SHOW_CONTACT")}
        </div>
      );
    }
    return <></>;
  };
  const renderCloseSchedule = () => {
    const { closeSchedules } = service;
    const lastCloseSchedules =
      closeSchedules && tranformSchedulesForm(closeSchedules);

    if (lastCloseSchedules.length > 0) {
      return (
        <div className={classes.pItems}>
          {lastCloseSchedules.map((s, idx) => (
            <div
              className={clsx(
                { [classes.lastItem]: idx + 1 === lastCloseSchedules.length },
                classes.childItem
              )}
              key={idx}
            >
              <span className={classes.w35}>{translate(s.title)}</span>
              <span className={classes.w65}>{s.date}</span>
            </div>
          ))}
        </div>
      );
    }
  };

  const renderCategory = () => {
    const { age } = service;
    const category: string[] = service.category as string[];
    const isYouthKid = category && category[0] === ScheduleCategory.Kids;
    const lastCategory =
      category.indexOf("ALL") !== -1
        ? ["Anyone"]
        : category.map(a => translate(a));
    const withAge = age ? [...lastCategory, age] : lastCategory;

    return (
      <div
        className={clsx(classes.borderItem, classes.desc, classes.borderNone)}
      >
        <span>
          <div className={clsx(classes.iconCircle)}>
            <FontAwesomeIcon icon={isYouthKid ? faChild : faUsers} />
          </div>
          {withAge.join(" ")}
        </span>
      </div>
    );
  };

  const renderAddress = () => {
    const { address1, city, state, zip } = service;
    const address = { address1, city, state, zip };
    const lastAddress = Object.keys(address).map(ad => `${address[ad]}`);

    return (
      <>
        <div
          className={clsx(classes.childItem, classes.desc, classes.lastItem)}
        >
          <span>
            <div className={clsx(classes.iconCircle)}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={parseURL(
                `https://www.google.com/maps/search/?api=1&query=${lastAddress}`
              )}
              className={classes.tagLink}
            >
              {lastAddress.join(", ")}
            </a>
          </span>
        </div>
      </>
    );
  };

  return (
    <React.Fragment>
      <Container className={classes.root}>
        <Typography variant="h3" className={classes.title}>
          <strong>{name}</strong>
        </Typography>
        {service.isShowFlag && (
          <p className={clsx(classes.desc, classes.textCenter)}>
            {service.description}
          </p>
        )}
        {!service.isShowFlag && (
          <p
            className={clsx(classes.desc, classes.subhead, classes.textCenter)}
          >
            <StarRateIcon className={classes.icon} fontSize="small" />
            <span>{service.serviceSummary}</span>
          </p>
        )}
        {!!service.availableBeds && (
          <div className={clsx(classes.borderItem, classes.desc)}>
            <span>
              Available/Total Beds: {service.availableBeds}/{service.totalBeds}
            </span>
          </div>
        )}
        <div className={clsx(classes.pItems, classes.mt15)}>
          {!!service.phone && (
            <div className={clsx(classes.childItem, classes.desc)}>
              <span>
                <PhoneIcon className={classes.iconCircle} />
                <a href={`tel:${service.phone}`} className={classes.tagLink}>
                  {service.phone}
                </a>
              </span>
            </div>
          )}
          {!!contactEmail && (
            <div className={clsx(classes.childItem, classes.desc)}>
              <span>
                <div className={clsx(classes.iconCircle)}>
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <a href={`mailto:${contactEmail}`} className={classes.tagLink}>
                  {contactEmail}
                </a>
              </span>
            </div>
          )}
          {!!service.website && (
            <div className={clsx(classes.childItem, classes.desc)}>
              <span>
                <MdGlobe
                  color="white"
                  fontSize="18px"
                  className={classes.iconCircle}
                />
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={parseURL(service.website)}
                  className={classes.tagLink}
                >
                  {service.website}
                </a>
              </span>
            </div>
          )}
          {!!service.facebook && (
            <div className={clsx(classes.childItem, classes.desc)}>
              <span>
                <div className={clsx(classes.iconCircle)}>
                  <FontAwesomeIcon icon={faFacebookF} />
                </div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={parseURL(service.facebook)}
                  className={classes.tagLink}
                >
                  {service.facebook}
                </a>
              </span>
            </div>
          )}
          {!!service.twitter && (
            <div className={clsx(classes.childItem, classes.desc)}>
              <span>
                <div className={clsx(classes.iconCircle)}>
                  <FontAwesomeIcon icon={faTwitter} />
                </div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={parseURL(service.twitter)}
                  className={classes.tagLink}
                >
                  {service.twitter}
                </a>
              </span>
            </div>
          )}
          {!!service.youtube && (
            <div className={clsx(classes.childItem, classes.desc)}>
              <span>
                <div className={clsx(classes.iconCircle)}>
                  <FontAwesomeIcon icon={faYoutube} />
                </div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={parseURL(service.youtube)}
                  className={classes.tagLink}
                >
                  {service.youtube}
                </a>
              </span>
            </div>
          )}
          {!!service.instagram && (
            <div className={clsx(classes.childItem, classes.desc)}>
              <span>
                <div className={clsx(classes.iconCircle)}>
                  <FontAwesomeIcon icon={faInstagram} />
                </div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={parseURL(service.instagram)}
                  className={classes.tagLink}
                >
                  {service.instagram}
                </a>
              </span>
            </div>
          )}
          {renderAddress()}
        </div>
        <MapContainer currentLocation={currentLocation} service={service} />
        {service.isShowFlag && (
          <div
            className={clsx(
              classes.borderItem,
              classes.desc,
              classes.borderNone
            )}
          >
            <span className={classes.pb0}>
              <StarRateIcon className={classes.iconCircle} />
              {service.serviceSummary}
            </span>
          </div>
        )}
        <div
          className={clsx(classes.borderItem, classes.desc, classes.borderNone)}
        >
          <span>
            <IosCalendar
              color="white"
              fontSize="18px"
              className={classes.iconCircle}
            />
            {translate("SCHEDULE")}
          </span>
        </div>
        {renderSchedule()}
        {!!service.closeSchedules && service.closeSchedules.length > 0 && (
          <>
            <div
              className={clsx(
                classes.borderItem,
                classes.desc,
                classes.borderNone
              )}
            >
              <span>
                <IosCalendar
                  color="white"
                  fontSize="18px"
                  className={classes.iconCircle}
                />
                {translate("CLOSED_DAYS")}
              </span>
            </div>
            {renderCloseSchedule()}
          </>
        )}
        {renderCategory()}
        {service.isShowFlag ? (
          <div className={classes.textCenter}>
            <ButtonGroup>
              <Button
                onClick={() => onClickFlag(service)}
                className={classes.connectBtn}
                variant="contained"
              >
                {translate("CONNECT_WITH_US")}
              </Button>
            </ButtonGroup>
          </div>
        ) : (
          <div className={classes.textCenter}>
            <ButtonGroup>
              <Button
                onClick={() => onClickReport(service)}
                className={classes.connectBtn}
                variant="contained"
              >
                Click here to Report Incorrect Info or Claim this Service
              </Button>
            </ButtonGroup>
          </div>
        )}
        {(service.updatedAt || service.createdAt) && (
          <div className={classes.textCenter}>
            <p className={classes.desc}>
              {translate("LAST_UPDATE_ON")}:{" "}
              {dayjs(service.updatedAt || service.createdAt).format(
                "MMMM DD, YYYY"
              )}
            </p>
          </div>
        )}
      </Container>
    </React.Fragment>
  );
});

export default ServiceItem;
