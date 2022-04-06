import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 10,
      height: "calc(100vh - 44px)",
      paddingLeft: 0,
      paddingRight: 0,
      "& textarea": {
        paddingTop: 10
      }
    },
    spcText: {
      margin: 0,
      padding: 10
    },
    listServices: {
      margin: 0,
      padding: 10,
      display: "flex"
    },
    btnpill: {
      border: "1px solid #6A46E5",
      backgroundColor: "#fff",
      padding: 10,
      marginRight: 10,
      marginBottom: 5,
      marginTop: 5,
      color: "#6A46E5",
      borderRadius: 30
    },
    btnpill_white: {
      border: "1px solid #fff",
      backgroundColor: "#6A46E5",
      padding: 8,
      fontSize: 14,
      marginRight: 10,
      marginBottom: 5,
      marginTop: 5,
      color: "#fff",
      borderRadius: 30
    },
    textWhite: {
      color: "#fff"
    },
    tagLink: {
      "-webkit-user-drag": "none",
      "-webkit-tap-highlight-color": "transparent",
      textDecoration: "none",
      // color: "#6A46E5",
      "&:active": {
        // color: "#6A46E5",
        backgroundColor: "unset"
      },
      "&:hover": {
        // color: "#6A46E5",
        backgroundColor: "unset"
      }
    },
    iconCircle: {
      width: 18,
      height: 18,
      backgroundColor: "#6B46E5",
      borderRadius: 50,
      color: "white",
      padding: 4,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    cardService: {
      backgroundColor: "#6A46E5",
      color: "#fff",
      padding: 6,
      inlineSize: "max-content",
      marginRight: 10,
      minWidth: "fit-content"
    },
    nameService: {
      display: "flex",
      alignItems: "center",
      wordBreak: "break-word",
      margin: 0
    },
    actionBtn: {
      display: "flex",
      justifyContent: "space-around"
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
      justifyContent: "space-between",
      "& span": {
        display: "flex",
        alignItems: "center"
      }
    },
    lastItem: {
      borderBottom: "none"
    },
    textShowcontact: {
      margin: 0,
      paddingLeft: 10
    },
    desc: {
      fontSize: 14,
      color: "#6A46E5",
      marginBottom: 0,
      marginTop: 0
    },
    pr10: {
      paddingRight: 10
    },
    btnpill_line: {
      display: "inline-block",
      paddingLeft: "15px !important",
      textDecoration: "none"
    },
    btnSend: {
      border: "1px solid #6A46E5",
      borderRadius: "50%",
      padding: 7,
      fontSize: 15,
      marginBottom: 1,
      marginRight: 4,
      color: "white",
      backgroundColor: "#6A46E5"
    },
    m0: {
      marginBottom: 2,
      marginTop: 0
    }
  })
);

export default useStyles;
