import React, { lazy } from "react";
import { push } from "connected-react-router";
import { reducerType } from "redux/reducers";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import HeaderBarSub from "components/HeaderBarSub";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import useForm from "react-hook-form";
import ErrorMessage from "components/ErrorMessage";
import Input from "components/Input";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import SubmitButton from "components/Button";
import { useTranslation } from "react-i18next";
import { changePassword } from "api/auth/resetPassword";
import imgLoading from "asset/img/loading.gif";
import { LOGOUT_REQUEST } from "redux/reducers/auth/actionTypes";

const GridFullHeight = lazy(() => import("components/GridFullHeight"));
const GridFormContainer = lazy(() => import("components/GridFormContainer"));

interface ChangePasswordProps {
  dispatch: Dispatch;
}

const mapStateToProps = (state: reducerType) => {
  return {};
};

const ChangePassword = React.memo((props: ChangePasswordProps) => {
  const translate = useTranslation().t;
  const { dispatch } = props;
  const { register, errors, handleSubmit, watch } = useForm();
  const [error, setError] = React.useState("");
  // const [emailNotFound, setEmailNotFound] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const submit = async (data: any, e: any) => {
    setLoading(true);
    e.preventDefault();
    const obj = {
      oldPassword: data.current_password,
      newPassword: data.new_password
    };
    let res = await changePassword(obj);
    console.log(res);
    if (res && res.code !== 400) {
      setError("");
      dispatch({
        type: LOGOUT_REQUEST
      });
      dispatch(push("/login"));
    } else {
      setLoading(false);
      setError(res.message);
    }
  };

  const classes = styles();

  const openUrl = url => {
    dispatch(push(url));
  };

  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight container>
          <HeaderBarSub
            backUrl={"/login"}
            openUrl={openUrl}
            name="Change Password"
          />
          <Container className={classes.root}>
            <form name="change_password" onSubmit={handleSubmit(submit)}>
              <Input
                name="current_password"
                type="password"
                fullWidth
                placeholder={"******"}
                label={"CURRENT PASSWORD"}
                validate={register({
                  minLength: 6,
                  required: true
                })}
                error={errors.current_password}
              />
              {errors.current_password &&
                errors.current_password.type === "minLength" && (
                  <ErrorMessage>
                    {translate("PASSWORD_MIN_LENGTH", { value: 6 })}
                  </ErrorMessage>
                )}
              {errors.current_password &&
                errors.current_password.type === "required" && (
                  <ErrorMessage>
                    Please input your current password
                  </ErrorMessage>
                )}
              <Input
                name="new_password"
                type="password"
                fullWidth
                placeholder={"******"}
                label={"NEW PASSWORD"}
                validate={register({
                  minLength: 6,
                  required: true
                })}
                error={errors.new_password}
              />
              {errors.new_password &&
                errors.new_password.type === "minLength" && (
                  <ErrorMessage>
                    {translate("PASSWORD_MIN_LENGTH", { value: 6 })}
                  </ErrorMessage>
                )}
              {errors.new_password &&
                errors.new_password.type === "required" && (
                  <ErrorMessage>Please input your new password</ErrorMessage>
                )}
              <Input
                name="confirm_password"
                type="password"
                fullWidth
                placeholder={"******"}
                label={"CONFIRM PASSWORD"}
                validate={register({
                  minLength: 6,
                  required: true,
                  validate: value => value === watch("new_password")
                })}
                error={errors.confirm_password}
              />
              {errors.confirm_password &&
                errors.confirm_password.type === "minLength" && (
                  <ErrorMessage>
                    {translate("PASSWORD_MIN_LENGTH", { value: 6 })}
                  </ErrorMessage>
                )}
              {errors.confirm_password &&
                errors.confirm_password.type === "required" && (
                  <ErrorMessage>
                    Please input your confirm password
                  </ErrorMessage>
                )}
              {errors.confirm_password &&
                errors.confirm_password.type === "validate" && (
                  <ErrorMessage>
                    New password did not match. Please check and try again.
                  </ErrorMessage>
                )}
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <Grid
                style={{ paddingTop: "20px" }}
                container
                spacing={1}
                direction="row"
              >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <ButtonGroup fullWidth>
                    <SubmitButton
                      disabled={loading}
                      type="submit"
                      variant="contained"
                    >
                      {loading ? (
                        <img alt="loading" src={imgLoading} width="30px" />
                      ) : (
                        "Change Password"
                      )}
                    </SubmitButton>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </form>
          </Container>
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(ChangePassword);
