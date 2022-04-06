import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullList: {
      width: "100%",
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
    title: {
      color: "white",
      fontSize: 16,
      flexGrow: 1,
      fontWeight: "bold",
      margin: 0,
      textAlign: "center"
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
    }
  })
);

export default useStyles;
