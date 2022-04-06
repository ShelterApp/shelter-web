import React, { useState, useEffect } from "react";
import { push } from "connected-react-router";
import { reducerType } from "redux/reducers";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import HeaderBarSub from "components/HeaderBarSub";
import styles from "./styles";
import clsx from "clsx";
import GridFullHeight from "components/GridFullHeight";
import GridFormContainer from "components/GridFormContainer";
import { useSelector } from "react-redux";
import Loading from "components/Loading";
import { User } from "@shelter/core";
import Input from "components/Input";
import {
  GET_USERS_REQUEST,
  LOADMORE_USERS_REQUEST,
  UPDATE_PERMISSION_REQUEST
} from "redux/reducers/service/actionTypes";
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
    const isSuperUser = u.roles && u.roles.includes(UserRole.SuperUser);
    return {
      ...u,
      isSuperUser
    };
  });
};

const ManageAccess = React.memo((props: ManageAccessProps) => {
  const { dispatch, loading, loadingMore, canLoadmore } = props;
  const [users, setUsers] = useState([]);
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

  const changeHandler = (userId, checked) => {
    dispatch({
      type: UPDATE_PERMISSION_REQUEST,
      userId,
      role: checked ? UserRole.SuperUser : UserRole.User
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
                    <div
                      key={index}
                      className={classes.item}
                      onClick={() => changeHandler(user.id, !user.isSuperUser)}
                    >
                      <Input
                        name=""
                        type="checkbox"
                        label={<p>{user.email}</p>}
                        checked={user.isSuperUser}
                        changeHandler={checked =>
                          changeHandler(user.id, checked)
                        }
                      />
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
              </>
            )}
          </Container>
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(ManageAccess);
