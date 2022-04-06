import React, { useState, useEffect } from "react";
import { push } from "connected-react-router";
import { reducerType } from "redux/reducers";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import HeaderBarSub from "components/HeaderBarSub";
import styles from "./styles";
import GridFullHeight from "components/GridFullHeight";
import GridFormContainer from "components/GridFormContainer";
import Loading from "components/Loading";
import { User } from "@shelter/core";
import {
  GET_USERS_REQUEST,
  LOADMORE_USERS_REQUEST,
  DELETE_USERS_REQUEST
} from "redux/reducers/service/actionTypes";
import Alert from "components/Alert";
import Swipeout from "rc-swipeout";
import "rc-swipeout/assets/index.css";
import { isMobile } from "common/";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import { UserRole } from "common/";

interface ManageAccessProps {
  dispatch: Dispatch;
  loading: boolean;
  users: User[];
  loadingMore: boolean;
  canLoadmore: boolean;
}

const mapStateToProps = (state: reducerType) => {
  return {
    loading: state.service.loading,
    users: state.service.users,
    loadingMore: state.service.loadingMore,
    canLoadmore: state.service.canLoadmore
  };
};

const afterTranform = (users: User[]) => {
  return users.map(u => {
    const isAdmin = u.roles && u.roles.includes(UserRole.Administrator);
    return {
      ...u,
      isAdmin
    };
  });
};

const ManageAccess = React.memo((props: ManageAccessProps) => {
  const { dispatch, loading, loadingMore, canLoadmore } = props;
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line
  const [isSwipe, setIsSwipe] = useState(false);
  const classes = styles();

  useEffect(() => {
    dispatch({
      type: GET_USERS_REQUEST
    });
    // eslint-disable-next-line
  }, []);

  const loadmoreFunction = () => {
    dispatch({
      type: LOADMORE_USERS_REQUEST
    });
  };

  const openUrl = url => {
    dispatch(push(url));
  };

  const handleWindowScroll = () => {
    const bottomOfWindow =
      window.scrollY + window.innerHeight >= document.body.scrollHeight - 500;
    if (bottomOfWindow && !loadingMore && canLoadmore && !loading) {
      loadmoreFunction();
    }

    return;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  });

  useEffect(() => {
    setUsers(afterTranform(props.users));
  }, [props.users]);

  const [openAlert, setOpenAlert] = useState(false);
  const [selectedLine, setSelectedLine] = useState();

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setSelectedLine(null);
  };

  const handleOpenAlert = id => {
    setOpenAlert(true);
    setSelectedLine(id);
  };

  const handleClickYes = () => {
    selectedLine && handleDelete(selectedLine);
    handleCloseAlert();
  };

  const handleDelete = id => {
    dispatch({
      type: DELETE_USERS_REQUEST,
      id: id
    });
  };

  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight container>
          <HeaderBarSub
            backUrl={"/"}
            openUrl={openUrl}
            name="Manage Users"
            isSearch
          />
          <Container className={classes.root}>
            {loading ? (
              <Loading />
            ) : (
              <>
                {!users.length && <p className={classes.noText}>NO USERS</p>}
                {users.length > 0 &&
                  users.map((user, index) => (
                    <div key={index} className={classes.pb15}>
                      <Swipeout
                        right={[
                          {
                            text: "EDIT",
                            onPress: () => openUrl(`/users/${user.id}`),
                            style: {
                              backgroundColor: "#BBB",
                              color: "white",
                              width: 85
                            },
                            className: "custom-class-2"
                          },
                          {
                            text: "DELETE",
                            onPress: () => handleOpenAlert(user.id),
                            style: {
                              backgroundColor: "#E55A5A",
                              color: "white",
                              width: 85
                            },
                            className: "custom-class-2"
                          }
                        ]}
                        onOpen={() => setIsSwipe(true)}
                        onClose={() => setIsSwipe(false)}
                      >
                        <div className={classes.item}>
                          <div>
                            {user.displayName && (
                              <p className={classes.title}>
                                Name: {user.displayName}
                              </p>
                            )}
                            {user.phone && (
                              <p className={classes.title}>
                                Phone: {user.phone}
                              </p>
                            )}
                            {user.email && (
                              <p className={classes.title}>
                                Email: {user.email}
                              </p>
                            )}
                            <p className={classes.title}>
                              Role:{" "}
                              {user.roles.includes("ADMINISTRATOR")
                                ? "ADMINISTRATOR"
                                : user.roles.includes("SUPER USER")
                                ? "SUPER USER"
                                : user.roles.includes("AUTO USER")
                                ? "AUTO USER"
                                : "USER"}
                            </p>
                            {user.lastMethod && (
                              <p className={classes.title}>
                                Login Method: {user.lastMethod}
                              </p>
                            )}
                          </div>
                          {!isMobile && (
                            <p className={classes.groupIcon}>
                              <span
                                className={classes.wrapDelete}
                                onClick={() => openUrl(`/users/${user.id}`)}
                              >
                                <EditIcon className={classes.iconDelete} />
                              </span>
                              <span
                                className={classes.wrapDelete}
                                onClick={() => handleOpenAlert(user.id)}
                              >
                                <DeleteOutlineIcon
                                  className={classes.iconDelete}
                                />
                              </span>
                            </p>
                          )}
                        </div>
                      </Swipeout>
                    </div>
                  ))}
                {canLoadmore && (
                  <Container className={classes.textCenter}>
                    <CircularProgress
                      style={{ width: 25, height: 25 }}
                      className={classes.loadmore}
                    />
                  </Container>
                )}
                <Alert
                  title={"Do you want to delete this user?"}
                  open={openAlert}
                  handleClose={handleCloseAlert}
                  handleClickYes={handleClickYes}
                />
              </>
            )}
          </Container>
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(ManageAccess);
