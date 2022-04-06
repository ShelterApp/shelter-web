import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import { Feedback } from "@shelter/core/dist/models";
import CircularProgress from "@material-ui/core/CircularProgress";
import FeedbackItem from "./components/FeedbackItem";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { useTranslation } from "react-i18next";

interface FeedbacksProps {
  openUrl: Function;
  feedbacks: Feedback[];
  loadingMore: boolean;
  loadmoreFunction: Function;
  canLoadmore: boolean;
  selectedIndex: number;
  handleArchive: Function;
  handleDelete: Function;
}

const FeedbacksContainer = React.memo((props: FeedbacksProps) => {
  const {
    loadmoreFunction,
    canLoadmore,
    loadingMore,
    feedbacks,
    selectedIndex,
    handleArchive,
    handleDelete
  } = props;
  const classes = styles();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [isOpenImage, setIsOpenImage] = useState(false);
  const translate = useTranslation().t;

  const handleWindowScroll = () => {
    const bottomOfWindow =
      window.scrollY + window.innerHeight >= document.body.scrollHeight - 500;
    if (bottomOfWindow && !loadingMore && canLoadmore) {
      loadmoreFunction();
    }

    return;
  };

  useEffect(() => {
    if (canLoadmore && !loadingMore) {
      handleWindowScroll();
    }
    // eslint-disable-next-line
  }, [canLoadmore, loadingMore, selectedIndex]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  });

  const toggleOpenImage = () => {
    setIsOpenImage(!isOpenImage);
    console.log(images, "-=-=-=");
  };

  const renderList = () => {
    if (feedbacks.length === 0) {
      return (
        <p className={classes.noText}>
          <i>{translate("NO_FEEDBACKS")}</i>
        </p>
      );
    }
    return (
      <>
        {feedbacks.map((feedback, index) => (
          <FeedbackItem
            setImages={setImages}
            toggleOpenImage={toggleOpenImage}
            key={index}
            handleArchive={handleArchive}
            handleDelete={handleDelete}
            feedback={feedback}
          />
        ))}
      </>
    );
  };

  return (
    <>
      <Container className={classes.root}>
        {renderList()}
        {canLoadmore && (
          <Container className={classes.textCenter}>
            <CircularProgress
              style={{ width: 25, height: 25 }}
              className={classes.loadmore}
            />
          </Container>
        )}
        {images.length > 0 && isOpenImage && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setIsOpenImage(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % images.length)
            }
          />
        )}
      </Container>
    </>
  );
});

export default FeedbacksContainer;
