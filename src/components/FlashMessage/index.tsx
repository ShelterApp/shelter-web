import React from "react";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

import useStyles from "./styles";
import clsx from "clsx";

export interface FlashMessageProps {
  message: string;
  open: boolean;
  setOpen: Function;
  type?: string | "success";
}

const FlashMessage = React.memo((props: FlashMessageProps) => {
  const classes = useStyles();
  const { message, open, setOpen, type } = props;
  const error = type === "error";
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      className={classes.snackbar}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={handleClose}
      key={"topcenter"}
    >
      <Alert
        className={clsx({
          [classes.flashSuccess]: !error,
          [classes.flashError]: error
        })}
        iconMapping={{
          success: error ? (
            <CancelIcon fontSize="inherit" />
          ) : (
            <CheckCircleIcon fontSize="inherit" />
          )
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
});
export default FlashMessage;
