import React from "react";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import FormAuth from "components/FormAuth";

interface AuthProps {
  login: Function;
  openUrl: Function;
}

const AuthContainer = React.memo((props: AuthProps) => {
  const { login, openUrl } = props;
  const classes = styles();

  return (
    <>
      <Container className={classes.root}>
        <FormAuth openUrl={openUrl} login={login} />
      </Container>
    </>
  );
});

export default AuthContainer;
