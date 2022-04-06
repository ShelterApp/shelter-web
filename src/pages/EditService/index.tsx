import React, { useEffect } from "react";
import { push } from "connected-react-router";
import { reducerType } from "redux/reducers";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import HeaderBarSub from "components/HeaderBarSub";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import FormService from "components/FormService";
import GridFullHeight from "components/GridFullHeight";
import GridFormContainer from "components/GridFormContainer";
import { ServiceProps } from "common/";
import Loading from "components/Loading";
import { GET_SERVICE_REQUEST } from "redux/reducers/ServiceDetail/actionTypes";

interface EditServiceProps {
  dispatch: Dispatch;
  services: ServiceProps[];
  match: any;
  data: ServiceProps;
  loading: boolean;
}

const mapStateToProps = (state: reducerType) => {
  return {
    services: state.service.data,
    data: state.serviceDetail.data,
    loading: state.service.loading
  };
};

const EditService = React.memo((props: EditServiceProps) => {
  const { dispatch, loading, data, match } = props;
  const classes = styles();
  const openUrl = url => {
    dispatch(push(url));
  };

  useEffect(() => {
    if (!match.params.id) return;
    dispatch({
      type: GET_SERVICE_REQUEST,
      id: match.params.id
    });
    // eslint-disable-next-line
  }, []);

  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight container>
          <HeaderBarSub
            backUrl={"/manage_services"}
            openUrl={openUrl}
            name="Edit Service"
          />
          {loading ? (
            <Loading />
          ) : (
            <Container className={classes.root}>
              <FormService isCreate={false} initialValues={data} />
            </Container>
          )}
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(EditService);
