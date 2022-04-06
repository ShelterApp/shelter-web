import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullList: {
      width: "100%",
      maxWidth: 1024,
      margin: "auto",
      height: "100vh",
      display: "flex",
      flexDirection: "column"
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: "white",
      "&:hover": {
        backgroundColor: "white"
      },
      marginLeft: 0,
      width: "100%"
    },
    searchIcon: {
      padding: "0px 8px",
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& svg": {
        fontSize: 18,
        color: "gray",
        opacity: 0.5
      }
    },
    loadingIcon: {
      padding: "0px 5px",
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      top: 0,
      right: 0
    },
    clearIcon: {
      cursor: "pointer",
      padding: "0px 8px",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& svg": {
        fontSize: 18,
        color: "gray",
        opacity: 0.5
      }
    },
    inputRoot: {
      color: "inherit",
      display: "flex",
      fontSize: 12,
      marginRight: 30
    },
    inputInput: {
      padding: "8px 50px 8px 30px",
      transition: theme.transitions.create("width"),
      width: "100%"
    },
    rootList: {
      backgroundColor: "#6A46E5",
      paddingTop: 5,
      paddingBottom: 5
    },
    rootListItem: {
      paddingLeft: 6,
      paddingRight: 6
    },
    btnClose: {
      position: "absolute",
      right: 10,
      padding: 0,
      "& svg": {
        color: "white"
      }
    },
    borderBot: {
      borderBottom: "1px solid #CCD2D9"
    },
    location: {
      margin: 0,
      color: "#6A46E5",
      fontSize: 12,
      padding: 6
    },
    noMatch: {
      fontSize: 16,
      color: "gray",
      paddingTop: 70,
      textAlign: "center",
      width: "100%"
    },
    listOp: {
      flexShrink: 1,
      overflow: "auto"
    },
    pb0: {
      paddingBottom: 0
    },
    pt0: {
      paddingTop: 0
    },
    shrink0: {
      flexShrink: 0
    },
    p0: {
      padding: 0
    },
    root: {
      padding: 10,
      paddingTop: 55
    },
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
      fontSize: 20
    },
    iconphone: {
      marginRight: -15
    },
    fontHarabara: {
      fontFamily: "Harabara",
      fontSize: 26
    },
    roomBtn: {
      padding: 0,
      color: "white"
    },
    fontSmall: {
      fontSize: 14
    }
  })
);

export default useStyles;
