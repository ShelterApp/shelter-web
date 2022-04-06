import React, { lazy } from "react";
import Container from "@material-ui/core/Container";
import { CarouselProvider } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { reducerType } from "redux/reducers";
import { connect } from "react-redux";

import IntroduceContainer from "containers/IntroduceContainer";

const GridFullHeight = lazy(() => import("components/GridFullHeight"));
const GridFormContainer = lazy(() => import("components/GridFormContainer"));

interface IntroduceProps {
  dispatch: Dispatch;
}
const mapStateToProps = (state: reducerType) => {
  return {};
};

const Introduce = React.memo((props: IntroduceProps) => {
  const { dispatch } = props;
  const openUrl = url => {
    dispatch(push(url));
  };

  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight container>
          <Container>
            <CarouselProvider
              naturalSlideWidth={100}
              naturalSlideHeight={100}
              totalSlides={9}
              isIntrinsicHeight={true}
            >
              <IntroduceContainer openUrl={openUrl} totalSlides={9} />
            </CarouselProvider>
          </Container>
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(Introduce);
