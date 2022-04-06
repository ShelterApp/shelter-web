import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 16,
      paddingBottom: 20
    },
    title: {
      margin: "0 0 4px 0",
      fontSize: 16,
      color: "#6A46E5",
      textAlign: "center",
      width: "100%"
    },
    desc: {
      fontSize: 14,
      color: "#6A46E5",
      marginBottom: 0,
      marginTop: 0
    },
    icon: {
      marginTop: 1,
      marginRight: 0
    },
    borderItem: {
      marginTop: 15,
      border: "1px solid #CCD2D9",
      borderRadius: 4,
      "& span": {
        padding: 10,
        display: "flex",
        alignItems: "center"
      }
    },
    iconCircle: {
      width: 18,
      height: 18,
      backgroundColor: "#6B46E5",
      borderRadius: 50,
      marginRight: 10,
      color: "white",
      padding: 4,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    tagLink: {
      "-webkit-user-drag": "none",
      "-webkit-tap-highlight-color": "transparent",
      textDecoration: "none",
      color: "#6A46E5",
      "&:active": {
        color: "#6A46E5",
        backgroundColor: "unset"
      },
      "&:hover": {
        color: "#6A46E5",
        backgroundColor: "unset"
      },
      width: "100%",
      wordBreak: "break-word"
    },
    iconFacebook: {
      color: "#6B46E5 !important"
    },
    textCenter: {
      textAlign: "center"
    },
    subhead: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      placeItems: "start"
    },
    w35: {
      width: "35%"
    },
    w65: {
      width: "65%"
    },
    pItems: {
      border: "1px solid #CCD2D9",
      borderRadius: "4px"
    },
    childItem: {
      borderBottom: "1px solid #CCD2D9",
      padding: 10,
      fontSize: 14,
      color: "#6A46E5",
      display: "flex",
      "& span": {
        display: "flex",
        alignItems: "center"
      }
    },
    lastItem: {
      borderBottom: "none"
    },
    borderNone: {
      border: "none"
    },
    textShowcontact: {
      margin: 0,
      paddingLeft: 10
    },
    connectBtn: {
      padding: "0px 60px",
      marginBottom: 10
    },
    mt15: {
      marginTop: 15
    },
    pb0: {
      paddingBottom: "0 !important"
    }
  })
);

export default useStyles;
