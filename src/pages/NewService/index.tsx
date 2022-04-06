import React, { useState, useEffect } from "react";
import { push } from "connected-react-router";
import { reducerType } from "redux/reducers";
import { connect, useSelector } from "react-redux";
import { Dispatch } from "redux";
import HeaderBarSub from "components/HeaderBarSub";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import FormService from "components/FormService";
import GridFullHeight from "components/GridFullHeight";
import GridFormContainer from "components/GridFormContainer";
import { getReportNotifcations, getProfile } from "api/auth/getProfile";
import Loading from "components/Loading";

interface NewServiceProps {
  dispatch: Dispatch;
}

const mapStateToProps = (state: reducerType) => {
  return {};
};

const NewService = React.memo((props: NewServiceProps) => {
  const { dispatch } = props;
  const classes = styles();
  const openUrl = url => {
    dispatch(push(url));
  };

  const user = useSelector((state: reducerType) => state.auth.current_user);

  const [isAccess, setIsAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      if (user.isAdmin) {
        setLoading(false);
        setIsAccess(true);
        return;
      }

      var current_user = await getProfile();
      var badgeCount = await getReportNotifcations();
      if (badgeCount.countManagedServices < current_user.totalServices) {
        setIsAccess(true);
      }
      setLoading(false);
    };

    checkProfile();
    // eslint-disable-next-line
  }, []);

  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight container>
          <HeaderBarSub backUrl={"/"} openUrl={openUrl} name="Add Service" />
          <Container className={classes.root}>
            {loading && <Loading />}
            {!loading &&
              (!isAccess ? (
                <p className={classes.noText}>
                  You reached the Max Limit for adding new services. Please
                  check with Shelter App Admin at{" "}
                  <a href="mailto:shelterappinfo@gmail.com">
                    shelterappinfo@gmail.com
                  </a>{" "}
                  to request access to add more services.
                </p>
              ) : (
                <FormService isCreate={true} />
              ))}
          </Container>
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(NewService);
