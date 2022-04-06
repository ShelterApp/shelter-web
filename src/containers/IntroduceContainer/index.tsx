import React, { useContext, useEffect, useState } from "react";
import {
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Dot
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import StepIntro from "components/StepIntro";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import styles from "./styles";
import clsx from "clsx";
import { CarouselContext } from "pure-react-carousel";
import { range } from "lodash";

interface IntroProps {
  totalSlides: number;
  openUrl: Function;
}

const IntroduceContainer = React.memo((props: IntroProps) => {
  const classes = styles();
  const carouselContext = useContext(CarouselContext);
  const [currentSlide, setCurrentSlide] = useState(
    carouselContext.state.currentSlide
  );
  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide);
    }
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);
  useEffect(() => {
    console.log(currentSlide);
  }, [currentSlide]);
  const arr = range(props.totalSlides);

  const goToSlide = number => {
    carouselContext.setStoreState({ currentSlide: number });
  };

  return (
    <React.Fragment>
      <Slider>
        {arr.map(i => (
          <Slide key={i} className={classes.spaceBot} index={i}>
            <StepIntro
              openUrl={props.openUrl}
              goToSlide={goToSlide}
              stepNumber={i}
            />
          </Slide>
        ))}
      </Slider>
      <div className={classes.botSlide}>
        <div className={classes.btnCircle}>
          {currentSlide !== 0 && (
            <ButtonBack>
              <ArrowBackIcon className={classes.icon} fontSize="small" />
            </ButtonBack>
          )}
        </div>
        <div className={classes.dotContainer}>
          {arr.map(i => (
            <Dot
              key={i}
              slide={i}
              className={clsx(
                {
                  [classes.mr10]: i !== props.totalSlides - 1
                },
                classes.dot
              )}
            >
              <></>
            </Dot>
          ))}
        </div>
        <div className={classes.btnCircle}>
          {currentSlide !== props.totalSlides - 1 && (
            <ButtonNext>
              <ArrowForwardIcon className={classes.icon} fontSize="small" />
            </ButtonNext>
          )}
        </div>
      </div>
    </React.Fragment>
  );
});

export default IntroduceContainer;
