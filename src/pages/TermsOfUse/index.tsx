import React, { lazy } from "react";
import { push } from "connected-react-router";
import { reducerType } from "redux/reducers";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import HeaderBarSub from "components/HeaderBarSub";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import { getTermsPage } from "api/staticPages";

const GridFullHeight = lazy(() => import("components/GridFullHeight"));
const GridFormContainer = lazy(() => import("components/GridFormContainer"));

interface TermsOfUseProps {
  dispatch: Dispatch;
}

const mapStateToProps = (state: reducerType) => {
  return {};
};

const TermsOfUse = React.memo((props: TermsOfUseProps) => {
  const { dispatch } = props;
  const classes = styles();

  const openUrl = url => {
    dispatch(push(url));
  };

  const [content, setContent] = React.useState("");
  React.useEffect(() => {
    getTermsPage().then(data => {
      setContent(data.content);
    });
  }, []);

  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight container>
          <HeaderBarSub openUrl={openUrl} name="Terms of Use" />
          <Container className={classes.root}>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </Container>
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(TermsOfUse);
