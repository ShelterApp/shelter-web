import React from "react";
import styles from "../../styles";
import useForm from "react-hook-form";
import ErrorMessage from "components/ErrorMessage";
import Input from "components/Input";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import SubmitButton from "components/Button";
import { useTranslation } from "react-i18next";
import { signup } from "api/auth/signup";
import imgLoading from "asset/img/loading.gif";

interface SignupProps {
  login: Function;
  openUrl: Function;
}

const SignupForm = React.memo((props: SignupProps) => {
  const { login } = props;
  const classes = styles();
  const { register, errors, handleSubmit } = useForm();
  const translate = useTranslation().t;
  const [loading, setLoading] = React.useState(false);
  const [acceptTerm, setAcceptTerm] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState("");
  const submit = (data: any, e: any) => {
    setLoading(true);
    setErrMessage("");
    e.preventDefault();
    if (!acceptTerm) {
      setErrMessage("Please accept Term & Privacy to continue.");
      setLoading(false);
      return;
    }
    signup({
      email: data.email.toLowerCase(),
      password: data.password,
      displayName: data.communityServiceName,
      phone: data.phone
    }).then(data => {
      if (data.code === 401 || data.code === 400) {
        console.log(data);
        setErrMessage(data.message);
        setLoading(false);
      } else if (data) {
        login(data);
      }
    });
  };

  const checkbox = checked => {
    setAcceptTerm(checked);
  };

  return (
    <form name="signup" onSubmit={handleSubmit(submit)}>
      <p className={classes.titleSU}>
        Users need not Signup. This is for Service Providers only.
      </p>
      <Input
        name="communityServiceName"
        type="string"
        fullWidth
        placeholder="Non-Profit Name"
        label="COMMUNITY SERVICE NAME"
        validate={register({
          required: true
        })}
        error={errors.communityServiceName}
      />
      {errors.communityServiceName &&
        errors.communityServiceName.type === "required" && (
          <ErrorMessage>Please input your Community Service Name.</ErrorMessage>
        )}
      <Input
        name="phone"
        type="phonenumber"
        fullWidth
        placeholder="(303) 555-0100"
        label="PHONE"
        validate={register({
          required: false
        })}
        error={errors.phone}
      />
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
      <Input
        name="acceptTermAndPrivacy"
        type="checkbox"
        label={
          <label>
            Accept <a href="/terms_of_use">Terms of Use</a> &{" "}
            <a href="/privacy_policy">Privacy Policy</a>
          </label>
        }
        changeHandler={checkbox}
      />
      {errMessage && (
        <ErrorMessage className={classes.boxError}>{errMessage}</ErrorMessage>
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
                "SIGNUP"
              )}
            </SubmitButton>
          </ButtonGroup>
        </Grid>
      </Grid>
    </form>
  );
});

export default SignupForm;
