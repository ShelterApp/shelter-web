import React from "react";
import { push } from "connected-react-router";
import { reducerType } from "redux/reducers";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import HeaderBarSub from "components/HeaderBarSub";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import FormCrisisLine from "components/FormCrisisLine";
import GridFullHeight from "components/GridFullHeight";
import GridFormContainer from "components/GridFormContainer";

interface NewCrisisLineProps {
  dispatch: Dispatch;
}

const mapStateToProps = (state: reducerType) => {
  return {};
};

const NewCrisisLine = React.memo((props: NewCrisisLineProps) => {
  const { dispatch } = props;
  const classes = styles();
  const openUrl = url => {
    dispatch(push(url));
  };

  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight container>
          <HeaderBarSub
            backUrl={"/"}
            openUrl={openUrl}
            name="Add Crisis Line"
          />
          <Container className={classes.root}>
            <FormCrisisLine isCreate={true} />
          </Container>
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(NewCrisisLine);
