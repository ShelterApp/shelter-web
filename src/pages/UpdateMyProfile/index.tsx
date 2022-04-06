import React from "react";
import { push } from "connected-react-router";
import { reducerType } from "redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import HeaderBarSub from "components/HeaderBarSub";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import FormUser from "components/FormMyProfile";
import GridFullHeight from "components/GridFullHeight";
import GridFormContainer from "components/GridFormContainer";

const EditUser = React.memo(() => {
  const current_user = useSelector(
    (state: reducerType) => state.auth.current_user
  );
  const dispatch = useDispatch();
  const classes = styles();
  const openUrl = url => {
    dispatch(push(url));
  };

  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight container>
          <HeaderBarSub backUrl={"/"} openUrl={openUrl} name="Update Profile" />
          <Container className={classes.root}>
            <FormUser user={current_user} />
          </Container>
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default EditUser;
