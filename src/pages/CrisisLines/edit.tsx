import React, { useEffect } from "react";
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
import { CrisisLine } from "@shelter/core";
import { GET_CRISISLINE_REQUEST } from "redux/reducers/service/actionTypes";
import Loading from "components/Loading";

interface EditCrisisLineProps {
  dispatch: Dispatch;
  data: CrisisLine;
  match: any;
  loading: boolean;
  crisis_lines: CrisisLine[];
}

const mapStateToProps = (state: reducerType) => {
  return {
    data: state.service.lineDetail,
    loading: state.service.loading,
    crisis_lines: state.service.crisis_lines
  };
};

const EditCrisisLine = React.memo((props: EditCrisisLineProps) => {
  const { dispatch, loading, data, match } = props;
  const classes = styles();
  const openUrl = url => {
    dispatch(push(url));
  };

  useEffect(() => {
    if (!match.params.id) return;
    dispatch({
      type: GET_CRISISLINE_REQUEST,
      id: match.params.id
    });
    // eslint-disable-next-line
  }, []);

  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight container>
          <HeaderBarSub
            backUrl={"/crisis_lines"}
            openUrl={openUrl}
            name="Edit Crisis Line"
          />
          {loading ? (
            <Loading />
          ) : (
            <Container className={classes.root}>
              <FormCrisisLine isCreate={false} initialValues={data} />
            </Container>
          )}
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(EditCrisisLine);
