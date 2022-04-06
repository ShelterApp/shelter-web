import React, { useEffect } from "react";
import { push } from "connected-react-router";
import { reducerType } from "redux/reducers";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import HeaderBarSub from "components/HeaderBarSub";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import FormUser from "components/FormUser";
import GridFullHeight from "components/GridFullHeight";
import GridFormContainer from "components/GridFormContainer";
import { User } from "@shelter/core";
import { GET_USER_REQUEST } from "redux/reducers/service/actionTypes";
import Loading from "components/Loading";

interface EditUserProps {
  dispatch: Dispatch;
  data: User;
  match: any;
  loading: boolean;
}

const mapStateToProps = (state: reducerType) => {
  return {
    data: state.service.user,
    loading: state.service.loading
  };
};

const EditUser = React.memo((props: EditUserProps) => {
  const { dispatch, loading, data, match } = props;
  const classes = styles();
  const openUrl = url => {
    dispatch(push(url));
  };

  useEffect(() => {
    if (!match.params.id) return;
    dispatch({
      type: GET_USER_REQUEST,
      id: match.params.id
    });
    // eslint-disable-next-line
  }, []);

  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight container>
          <HeaderBarSub
            backUrl={"/manage_users"}
            openUrl={openUrl}
            name="User Profile"
          />
          {loading ? (
            <Loading />
          ) : (
            <Container className={classes.root}>
              <FormUser user={data} />
            </Container>
          )}
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(EditUser);
