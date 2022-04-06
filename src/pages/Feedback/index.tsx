import React, { lazy } from "react";
import { push } from "connected-react-router";
import { reducerType } from "redux/reducers";
import { CREATE_FEEDBACK_REQUEST } from "redux/reducers/feedback/actionTypes";
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

const GridFullHeight = lazy(() => import("components/GridFullHeight"));
const GridFormContainer = lazy(() => import("components/GridFormContainer"));

interface FeedbackProps {
  dispatch: Dispatch;
}

const mapStateToProps = (state: reducerType) => {
  return {};
};

const Feedback = React.memo((props: FeedbackProps) => {
  const translate = useTranslation().t;
  const { dispatch } = props;
  const { register, errors, handleSubmit, setValue } = useForm();

  const submit = (data: any, e: any) => {
    e.preventDefault();
    dispatch({
      type: CREATE_FEEDBACK_REQUEST,
      form: data,
      message: translate("SENT_FEEDBACK_SUCCESSFULLY")
    });
    setValue("email", "");
    setValue("subject", "");
    setValue("message", "");
  };

  const classes = styles();

  const openUrl = url => {
    dispatch(push(url));
  };

  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight container>
          <HeaderBarSub openUrl={openUrl} name="Feedback" />
          <Container className={classes.root}>
            <form name="feedback" onSubmit={handleSubmit(submit)}>
              <Input
                name="email"
                type="email"
                fullWidth
                placeholder="mark@gmail.com"
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
                  Please enter your email address in format: mark@gmail.com
                </ErrorMessage>
              )}
              <Input
                name="subject"
                type="text"
                fullWidth
                placeholder="Subject"
                label="SUBJECT"
                validate={register({
                  required: true
                })}
                error={errors.subject}
              />
              {errors.subject && errors.subject.type === "required" && (
                <ErrorMessage>Please input your subject.</ErrorMessage>
              )}
              <Input
                name="message"
                type="textarea"
                fullWidth
                label="MESSAGE"
                validate={register({
                  required: true
                })}
                error={errors.message}
              />
              {errors.message && errors.message.type === "required" && (
                <ErrorMessage>Please input your message.</ErrorMessage>
              )}
              <Grid
                style={{ paddingTop: "20px" }}
                container
                spacing={1}
                direction="row"
              >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <ButtonGroup fullWidth>
                    <SubmitButton type="submit" variant="contained">
                      Send Feedback
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

export default connect(mapStateToProps)(Feedback);
