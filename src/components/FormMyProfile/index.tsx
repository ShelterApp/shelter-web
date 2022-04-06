import React, { useState } from "react";
import { push } from "connected-react-router";
import useForm from "react-hook-form";
import ErrorMessage from "components/ErrorMessage";
import Input from "components/Input";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import SubmitButton from "components/Button";
import { useTranslation } from "react-i18next";
import Alert from "@material-ui/lab/Alert";
import imgLoading from "asset/img/loading.gif";
import { useDispatch } from "react-redux";
import { SET_MESSAGES_REDUCER } from "redux/reducers/messages/actionTypes";
import { UPDATE_CURRENT_USER } from "redux/reducers/auth/actionTypes";
import { updateMyProfile } from "api/services/getUsers";
import { UserReducer } from "redux/reducers/auth";

interface FormUserProps {
  user: UserReducer;
}

const FormUser = React.memo((props: FormUserProps) => {
  const translate = useTranslation().t;
  const dispatch = useDispatch();

  const { user } = props;
  const initUsew = user;
  const { register, errors, handleSubmit } = useForm({
    defaultValues: initUsew
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const submit = async (data: any, e: any) => {
    setLoading(true);
    console.log(errors);
    e.preventDefault();

    const obj = {
      ...data,
      userId: user.id
    };

    const res = await updateMyProfile(obj);

    if (res && res.id) {
      dispatch(push("/"));
      dispatch({
        type: UPDATE_CURRENT_USER,
        current_user: res
      });
      dispatch({
        type: SET_MESSAGES_REDUCER,
        message: {
          type: "success",
          key: "UPDATE_USER_SUCCESSFULLY",
          message: translate("UPDATE_USER_SUCCESSFULLY")
        }
      });
      return;
    }
    setError("");
    setLoading(false);
  };

  return (
    <React.Fragment>
      <form name="form_user" onSubmit={handleSubmit(submit)}>
        <Input
          name="displayName"
          type="string"
          fullWidth
          placeholder="Ex: Hotel California"
          label={"COMMUNITY SERVICE NAME"}
          validate={register({
            required: false
          })}
          error={errors.displayName}
        />
        {errors.displayName && errors.displayName.type === "required" && (
          <ErrorMessage>Please input display name.</ErrorMessage>
        )}
        <Input
          name="email"
          type="email"
          fullWidth
          placeholder="mark@gmail.com"
          label="EMAIL"
          validate={register}
          error={errors.email}
          disabled
        />
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
        {error && <Alert severity="error">{error}</Alert>}
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
                  "Update Profile"
                )}
              </SubmitButton>
            </ButtonGroup>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
});

export default FormUser;
