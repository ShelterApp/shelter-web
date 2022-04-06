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
import FlashMessage from "components/FlashMessage";
import { useTranslation } from "react-i18next";
import { resetPasswordWithToken } from "api/auth/resetPassword";
import imgLoading from "asset/img/loading.gif";
import { SET_MESSAGES_REDUCER } from "redux/reducers/messages/actionTypes";
const GridFullHeight = lazy(() => import("components/GridFullHeight"));
const GridFormContainer = lazy(() => import("components/GridFormContainer"));

interface ForgotPasswordProps {
  dispatch: Dispatch;
  query: any;
}

const mapStateToProps = (state: reducerType) => {
  return {
    query: state.router.location.query
  };
};

const ForgotPassword = React.memo((props: ForgotPasswordProps) => {
  const translate = useTranslation().t;
  const { dispatch, query } = props;

  const [open, setOpen] = React.useState(false);
  const { register, errors, handleSubmit } = useForm();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const submit = async (data: any, e: any) => {
    setLoading(true);
    setError("");
    e.preventDefault();
    const obj = {
      ...query,
      password: data.password
    };

    try {
      const res = (await resetPasswordWithToken(obj)) as any;
      if (res) {
        if (res.code === 400) {
          setError(res.message);
          setLoading(false);
          return;
        }
        if (res) {
          dispatch({
            type: SET_MESSAGES_REDUCER,
            message: {
              type: "success",
              key: "RESET_PASSWORD_SUCCESSFULLY",
              message: translate("RESET_PASSWORD_SUCCESSFULLY")
            }
          });
          openUrl("/login");
        }
      }
    } catch (error) {
      throw new Error(
        `Can not request reset password with error: ${error.message}`
      );
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
            name="Reset Password"
            login
          />
          <Container className={classes.root}>
            <form name="reset_password" onSubmit={handleSubmit(submit)}>
              <Input
                name="password"
                type="password"
                fullWidth
                placeholder={"******"}
                label={"ENTER NEW PASSWORD"}
                validate={register({
                  minLength: 6,
                  required: true
                })}
                error={errors.password}
              />
              {errors.password && errors.password.type === "minLength" && (
                <ErrorMessage>
                  {translate("PASSWORD_MIN_LENGTH", { value: 6 })}
                </ErrorMessage>
              )}
              {errors.password && errors.password.type === "required" && (
                <ErrorMessage>Please input your new password</ErrorMessage>
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
                        "Reset Password"
                      )}
                    </SubmitButton>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </form>
            <FlashMessage
              open={open}
              setOpen={setOpen}
              message={translate("REQUEST_RESET_PASSWORD_SUCCESSFULLY")}
              type={"success"}
            />
          </Container>
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(ForgotPassword);
