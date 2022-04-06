import React, { useState, useEffect } from "react";
import { push } from "connected-react-router";
import styles from "./styles";
import useForm from "react-hook-form";
import ErrorMessage from "components/ErrorMessage";
import Input from "components/Input";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import SubmitButton from "components/Button";
import { useTranslation } from "react-i18next";
import Alert from "@material-ui/lab/Alert";
import imgLoading from "asset/img/loading.gif";
import { CrisisLine as ICrisisLine } from "@shelter/core";
import { useDispatch } from "react-redux";
import { SET_MESSAGES_REDUCER } from "redux/reducers/messages/actionTypes";
import { createCrisisLine, updateCrisisLine } from "api/crisislines";

interface FormCrisisLineProps {
  initialValues?: ICrisisLine;
  isCreate: boolean | false;
}

const initDefaultValues: ICrisisLine = {
  name: "",
  description: "",
  phone: "",
  text: "",
  chatWebLink: "",
  time: "",
  area: "",
  website: ""
};

const FormCrisisLine = React.memo((props: FormCrisisLineProps) => {
  const translate = useTranslation().t;
  const dispatch = useDispatch();
  const { initialValues, isCreate } = props;
  const defaultValues = initialValues ? initialValues : initDefaultValues;
  const { register, errors, handleSubmit, reset } = useForm({
    defaultValues: defaultValues
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const submit = async (data: any, e: any) => {
    setLoading(true);
    console.log(errors);
    e.preventDefault();

    const obj = {
      ...data
    };

    if (props.isCreate) {
      const res = await createCrisisLine(obj);
      console.log(res);
      if (res) {
        dispatch(push("/"));
        dispatch({
          type: SET_MESSAGES_REDUCER,
          message: {
            type: "success",
            key: "CREATE_LINE_SUCCESSFULLY",
            message: "Crisisline Added Successfully"
          }
        });
        return;
      }
    } else {
      obj.id = initialValues.id;
      const res = await updateCrisisLine(obj);
      console.log(res);
      if (res && res.id) {
        dispatch(push("/crisis_lines"));
        dispatch({
          type: SET_MESSAGES_REDUCER,
          message: {
            type: "success",
            key: "UPDATE_LINE_SUCCESSFULLY",
            message: translate("UPDATE_LINE_SUCCESSFULLY")
          }
        });
        return;
      }
      setError("");
      setLoading(false);
    }

    setError("");
    setLoading(false);
  };

  const classes = styles();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (initialValues && initialValues.id) {
      reset(initialValues);
      return;
    }
    // eslint-disable-next-line
  }, [initialValues, isCreate]);

  return (
    <React.Fragment>
      <form name="form_crisisline" onSubmit={handleSubmit(submit)}>
        <fieldset className={classes.fieldset}>
          <legend className={classes.legend}>Name</legend>
          <Input
            name="name"
            type="string"
            fullWidth
            placeholder="Ex: Domestic Violence Hotline"
            label="CRISISLINE NAME"
            validate={register({
              required: true
            })}
            error={errors.name}
          />
          {errors.name && errors.name.type === "required" && (
            <ErrorMessage>Please input crisisline name.</ErrorMessage>
          )}
          <Input
            name="description"
            type="textarea"
            fullWidth
            placeholder="Description in less than 1000 characters."
            label=""
            validate={register({
              required: true,
              maxLength: 1000
            })}
            error={errors.description}
          />
          {errors.description && errors.description.type === "required" && (
            <ErrorMessage>Please input your description.</ErrorMessage>
          )}
          {errors.description && errors.description.type === "maxLength" && (
            <ErrorMessage>
              Description in less than 1000 characters.
            </ErrorMessage>
          )}
        </fieldset>
        <br />
        <fieldset className={classes.fieldset}>
          <legend className={classes.legend}>Crisis Line Information</legend>
          <Input
            name="phone"
            type="phonenumber"
            fullWidth
            placeholder="(303) 555-0100"
            label="PHONE"
            validate={register({
              required: true
            })}
            error={errors.phone}
          />
          {errors.phone && errors.phone.type === "required" && (
            <ErrorMessage>Please input your phone</ErrorMessage>
          )}
          <Input
            name="text"
            type="string"
            fullWidth
            placeholder="Text number"
            label="TEXT"
            validate={register({
              required: false
            })}
            error={errors.text}
          />
          <Input
            name="chatWebLink"
            type="string"
            fullWidth
            placeholder="www.abc.org/chatlink"
            label="CHAT WEB LINK"
            validate={register({
              required: false
            })}
            error={errors.chatWebLink}
          />
          <Input
            name="website"
            type="string"
            fullWidth
            placeholder="www.abc.org"
            label="WEBSITE"
            validate={register({
              required: false
            })}
            error={errors.website}
          />
          <Input
            name="area"
            type="string"
            fullWidth
            placeholder="USA"
            label="AREA"
            validate={register({
              required: true
            })}
            error={errors.area}
          />
          {errors.area && errors.area.type === "required" && (
            <ErrorMessage>Please input your area.</ErrorMessage>
          )}
          <Input
            name="time"
            type="string"
            fullWidth
            placeholder="24/7"
            label="HOURS"
            validate={register({
              required: true
            })}
            error={errors.time}
          />
          {errors.time && errors.time.type === "required" && (
            <ErrorMessage>Please input your time.</ErrorMessage>
          )}
        </fieldset>
        <br />
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
                  `${isCreate ? "Add" : "Update"} Crisis Line`
                )}
              </SubmitButton>
            </ButtonGroup>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
});

export default FormCrisisLine;
