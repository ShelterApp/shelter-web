import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullList: {
      width: "100%"
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
    clearIcon: {
      padding: "0px 8px",
      height: "100%",
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      top: 0,
      right: 0,
      "& svg": {
        fontSize: 18,
        color: "gray",
        opacity: 0.5
      },
      "& img": {
        paddingRight: 15
      }
    },
    inputRoot: {
      color: "inherit !important",
      display: "flex !important",
      fontSize: "12px !important"
    },
    inputInput: {
      padding: "8px 50px 8px 30px !important",
      transition: theme.transitions.create("width"),
      width: "100% !important"
    },
    rootList: {
      backgroundColor: "#6A46E5",
      padding: "0px !important"
    },
    rootListItem: {
      paddingLeft: 6,
      paddingRight: 6
    },
    cancelbtn: {
      fontSize: 12,
      color: "white",
      paddingLeft: 10,
      cursor: "pointer"
    },
    containerHeader: {
      height: 44,
      minHeight: "unset",
      paddingLeft: 0,
      paddingRight: 0
    },
    toolbar: {
      position: "fixed",
      top: 0,
      maxWidth: 1024,
      margin: "auto",
      backgroundColor: "#6A46E5",
      color: "black"
    }
  })
);

export default useStyles;
