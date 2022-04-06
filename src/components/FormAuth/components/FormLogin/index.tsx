import React from "react";
import styles from "../../styles";
import useForm from "react-hook-form";
import ErrorMessage from "components/ErrorMessage";
import Input from "components/Input";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import SubmitButton from "components/Button";
import { useTranslation } from "react-i18next";
import { login } from "api/auth/login";
import imgLoading from "asset/img/loading.gif";

interface LoginProps {
  login: Function;
  openUrl: Function;
}

const LoginForm = React.memo((props: LoginProps) => {
  const { openUrl } = props;
  const classes = styles();
  const { register, errors, handleSubmit } = useForm();
  const translate = useTranslation().t;
  const [errorLogin, setErrorLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const submit = (data: any, e: any) => {
    setLoading(true);
    setErrorLogin(false);
    e.preventDefault();
    login({
      email: data.email.toLowerCase(),
      password: data.password
    }).then(data => {
      if (
        (data.code === 401 || data.code === 400) &&
        data.message === "Email or password invalid"
      ) {
        console.log(data);
        setLoading(false);
        setErrorLogin(true);
      } else if (data) {
        props.login(data);
      }
    });
  };

  return (
    <form name="login" onSubmit={handleSubmit(submit)}>
      <Input
        name="email"
        type="email"
        fullWidth
        placeholder="name@your-nonprofit.org"
        label="EMAIL"
        validate={register({
          required: true,
          // eslint-disable-next-line
          pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        })}
        error={errors.email}
      />
      {errors.email && errors.email.type === "required" && (
        <ErrorMessage>Please input your email.</ErrorMessage>
      )}
      {errors.email && errors.email.type === "pattern" && (
        <ErrorMessage>
          Please enter your email address in format: name@your-nonprofit.org
        </ErrorMessage>
      )}
      <Input
        name="password"
        type="password"
        fullWidth
        placeholder={"******"}
        label={"PASSWORD"}
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
        <ErrorMessage>Please input your password</ErrorMessage>
      )}
      {errorLogin && (
        <ErrorMessage className={classes.boxError}>
          Please check your email and password. Try again.
        </ErrorMessage>
      )}
      <Grid
        style={{ paddingTop: "20px" }}
        container
        spacing={1}
        direction="row"
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ButtonGroup fullWidth>
            <SubmitButton disabled={loading} type="submit" variant="contained">
              {loading ? (
                <img alt="loading" src={imgLoading} width="30px" />
              ) : (
                "LOGIN"
              )}
            </SubmitButton>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <p
            className={classes.forgotPassword}
            onClick={() => openUrl("/forgot_password")}
          >
            Forgot Password?
          </p>
        </Grid>
      </Grid>
    </form>
  );
});

export default LoginForm;
