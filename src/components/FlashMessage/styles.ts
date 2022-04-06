import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flashSuccess: {
      color: "white !important",
      backgroundColor: "rgb(60 190 60) !important",
      width: "100%",
      "& svg": {
        color: "white"
      }
    },
    flashError: {
      color: "white !important",
      backgroundColor: "#DD3444 !important",
      width: "100%",
      "& svg": {
        color: "white"
      }
    },
    snackbar: {
      top: 0,
      left: 0,
      right: 0,
      transform: "unset"
    }
  })
);

export default useStyles;
