import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 25
    },
    loadmore: {
      color: "#6B46E5",
      fontSize: 30
    },
    textCenter: {
      textAlign: "center"
    },
    card: {
      border: "1px solid #CCD2D9",
      borderRadius: 4,
      marginBottom: 10
    },
    title: {
      fontSize: 14,
      color: "#6A46E5",
      backgroundColor: "#f5f5f5",
      margin: 0,
      padding: 6
    },
    borderBot: {
      borderBottom: "1px solid #CCD2D9"
    },
    desc: {
      fontSize: 14,
      color: "#6A46E5",
      backgroundColor: "#f5f5f5",
      borderBottom: "1px solid #CCD2D9",
      margin: 0,
      padding: 6,
      placeContent: "space-between",
      display: "flex"
    },
    font600: {
      fontWeight: 600
    },
    blockDesc: {
      padding: 6,
      margin: 0,
      fontSize: 14,
      color: "#333333"
    },
    itemPhone: {
      display: "flex",
      alignItems: "center"
    },
    hrefLink: {
      color: "#6A46E5",
      "-webkit-user-drag": "none",
      "-webkit-tap-highlight-color": "transparent",
      textDecoration: "none",
      "&:active": {
        backgroundColor: "unset"
      },
      "&:hover": {
        backgroundColor: "unset"
      }
    },
    lastDesc: {
      fontSize: 14,
      color: "#6A46E5",
      backgroundColor: "#f5f5f5",
      borderTop: "1px solid #CCD2D9",
      margin: 0,
      placeContent: "space-between",
      display: "flex"
    },
    second: {
      width: "20%",
      textAlign: "right",
      placeSelf: "center",
      paddingRight: 6
    },
    first: {
      width: "80%"
    },
    pr10: {
      paddingRight: "10px !important"
    },
    dFlex: {
      display: "flex"
    },
    justifyBetween: {
      justifyContent: "space-between"
    },
    pr5: {
      paddingRight: 5
    },
    pl10: {
      paddingLeft: 10
    },
    p0: {
      padding: 0
    },
    noText: {
      fontSize: 14,
      color: "gray",
      paddingTop: 140,
      textAlign: "center",
      paddingLeft: 6,
      paddingRight: 6,
      width: "100%"
    }
  })
);

export default useStyles;
