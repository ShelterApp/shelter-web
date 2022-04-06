import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    menuButton: {
      marginLeft: 0
    },
    containerHeader: {
      height: 44,
      minHeight: "unset",
      paddingLeft: 0
    },
    toolbar: {
      position: "fixed",
      top: 0,
      maxWidth: 1024,
      margin: "auto",
      backgroundColor: "#6A46E5",
      color: "white"
    },
    title: {
      flexGrow: 1,
      textAlign: "center",
      fontFamily: "Harabara",
      fontSize: 26
    },
    iconphone: {
      marginRight: -15
    },
    roomBtn: {
      paddingLeft: 0,
      color: "white"
    },
    pr0: {
      paddingRight: 0
    }
  })
);

export default useStyles;
