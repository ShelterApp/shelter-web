import React from "react";
import useForm from "react-hook-form";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { ICoords } from "redux/reducers/service";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";

import ButtonOutline from "components/ButtonOutline";
import SubmitButton from "components/Button";
import ErrorMessage from "components/ErrorMessage";
import Input from "components/Input";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "block"
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      outline: "none",
      boxShadow: theme.shadows[5],
      padding: "16px 12px 24px",
      borderRadius: 5,
      maxHeight: "70vh",
      overflowY: "scroll",
      maxWidth: 360,
      [theme.breakpoints.down("xs")]: {
        maxWidth: "90vw !important"
      },
      [theme.breakpoints.down("md")]: {
        maxWidth: "50vw"
      },
      margin: "auto",
      marginTop: "10vh"
    },
    title: {
      fontSize: 16,
      fontWeight: 600,
      borderBottom: "1px solid #dddddd",
      paddingRight: 15,
      paddingLeft: 15,
      paddingBottom: 15,
      marginBottom: 0
    },
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(0)
        // width: "25ch"
      }
    }
  })
);

interface ModalFlagProps {
  open: boolean;
  setOpen: Function;
  submitForm: Function;
  currentLocation: ICoords;
  serviceNameFlag: string;
}

const ModalFlag = React.memo((props: ModalFlagProps) => {
  const classes = useStyles();
  const { open, setOpen, submitForm, currentLocation, serviceNameFlag } = props;
  const hasLocation =
    currentLocation &&
    !(currentLocation.longitude === 0 && currentLocation.latitude === 0);
  const [checkbox, setCheckbox] = React.useState(false);
  const {
    register,
    errors,
    // setError,
    // clearError,
    handleSubmit
    // getValues,
  } = useForm();
  const submit = (data: any, e: any) => {
    e.preventDefault();
    let form = {
      ...data,
      // files: files.map(file => ({
      //   fileName: file.name,
      //   type: file.name ? file.name.split(".").slice(-1)[0] : file.type,
      //   size: file.size,
      //   content: file.content,
      //   contentType: file.type
      // })),
      coordinates: currentLocation
        ? `${currentLocation.longitude}|${currentLocation.latitude}`
        : "0|0"
    };
    !checkbox && delete form.coordinates;
    submitForm(form);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const checkboxLocation = checked => {
    setCheckbox(checked);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => handleClose()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 className={classes.title}>Connect to {serviceNameFlag}?</h2>
            <form
              className={classes.root}
              name="feedback"
              onSubmit={handleSubmit(submit)}
            >
              <Input
                name="name"
                type="text"
                fullWidth
                placeholder="mark"
                label="NAME"
                validate={register({
                  required: true
                })}
                error={errors.name}
              />
              {errors.name && errors.name.type === "required" && (
                <ErrorMessage>Please input your name.</ErrorMessage>
              )}
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
                <ErrorMessage>Please input your phone number.</ErrorMessage>
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
              {/* <InputUploadImage
                onChangeFunction={onChangeFunction}
                name={"attachments"}
              /> */}
              {hasLocation && (
                <Input
                  name="hasLocation"
                  type="checkbox"
                  label="Add your location"
                  changeHandler={checkboxLocation}
                />
              )}
              <Grid
                style={{ paddingTop: "20px" }}
                container
                spacing={1}
                direction="row"
              >
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <ButtonGroup onClick={handleClose} fullWidth>
                    <ButtonOutline variant="contained">Cancel</ButtonOutline>
                  </ButtonGroup>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <ButtonGroup fullWidth>
                    <SubmitButton type="submit" variant="contained">
                      SEND
                    </SubmitButton>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
});

export default ModalFlag;
