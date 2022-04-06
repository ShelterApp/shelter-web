import React from "react";
import useStyles from "../styles";
import clsx from "clsx";
import { Feedback } from "@shelter/core/dist/models";
import IosCreate from "react-ionicons/lib/IosCreate";
import MdFlag from "react-ionicons/lib/MdFlag";
import MdArchive from "react-ionicons/lib/MdArchive";
import MdTrash from "react-ionicons/lib/MdTrash";
import MdPin from "react-ionicons/lib/MdPin";
import MdPhotos from "react-ionicons/lib/MdPhotos";
import IconButton from "@material-ui/core/IconButton";
import dayjs from "dayjs";
import { getLocationAPIMap } from "api/map";
export interface FeedbackProps {
  feedback: Feedback;
  toggleOpenImage: Function;
  setImages: Function;
  handleArchive: Function;
  handleDelete: Function;
}

const FeedbackItem = React.memo((props: FeedbackProps) => {
  const classes = useStyles();
  const {
    subject,
    message,
    email,
    type,
    createdAt,
    phone,
    isArchive,
    files,
    location,
    name,
    id
  } = props.feedback;

  const openImage = () => {
    props.setImages(
      files.map(x => `${process.env.REACT_APP_IMAGE_SERVER_URL}/${x}`)
    );
    props.toggleOpenImage();
  };

  const clickLocation = async () => {
    const res = await getLocationAPIMap(location.coordinates);
    if (res) {
      window.open(
        `https://maps.google.com/?q=${encodeURIComponent(
          res.plus_code.compound_code
        )}`
      );
    }
  };

  return (
    <div className={classes.card}>
      <div
        className={clsx(
          classes.title,
          classes.borderBot,
          classes.dFlex,
          classes.font600,
          classes.justifyBetween
        )}
      >
        <div className={classes.dFlex}>
          <div className={classes.pr5}>
            {type === "SERVICE" ? (
              <MdFlag color="#6A46E5" fontSize="18px" />
            ) : (
              <IosCreate color="#6A46E5" fontSize="18px" />
            )}
          </div>
          {subject}
        </div>
        <div className={classes.dFlex}>
          {files.length > 0 && (
            <div className={classes.dFlex}>
              <IconButton onClick={() => openImage()} className={classes.p0}>
                <MdPhotos color="#6A46E5" fontSize="18px" />
              </IconButton>
            </div>
          )}
          {location &&
            type !== "APP" &&
            location.coordinates &&
            location.coordinates[0] !== 0 &&
            location.coordinates[1] !== 0 && (
              <div className={clsx(classes.dFlex, classes.pl10)}>
                <IconButton
                  onClick={() => clickLocation()}
                  className={classes.p0}
                >
                  <MdPin color="#6A46E5" fontSize="18px" />
                </IconButton>
              </div>
            )}
        </div>
      </div>
      {!!name && (
        <p
          className={clsx(classes.title, classes.borderBot, classes.dFlex)}
        >{`${name} ${dayjs(createdAt).format("MM/DD/YYYY hh:mm A")}`}</p>
      )}
      {!!phone && (
        <a
          href={`tel:${phone}`}
          className={clsx(
            classes.title,
            classes.borderBot,
            classes.dFlex,
            classes.hrefLink
          )}
        >
          {phone}
        </a>
      )}
      <p className={classes.blockDesc}>{message}</p>
      <div className={clsx(classes.lastDesc)}>
        <div className={clsx(classes.first, classes.title)}>
          <a
            href={`mailto:${email}`}
            className={clsx(classes.font600, classes.hrefLink)}
          >
            {email}
          </a>
        </div>
        <div className={clsx(classes.second)}>
          {!isArchive && (
            <IconButton
              onClick={() => props.handleArchive(id)}
              className={clsx(classes.p0, classes.pr10)}
            >
              <MdArchive color="#6A46E5" fontSize="18px" />
            </IconButton>
          )}
          <IconButton
            onClick={() => props.handleDelete(id)}
            className={classes.p0}
          >
            <MdTrash color="#6A46E5" fontSize="18px" />
          </IconButton>
        </div>
      </div>
    </div>
  );
});
export default FeedbackItem;
