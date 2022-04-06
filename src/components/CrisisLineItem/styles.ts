import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      border: "1px solid #CCD2D9",
      borderRadius: 4,
      marginBottom: 10
    },
    title: {
      fontSize: 16,
      color: "#6A46E5",
      fontWeight: 600,
      backgroundColor: "#f5f5f5",
      borderBottom: "1px solid #CCD2D9",
      margin: 0,
      padding: 6
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
      padding: 6,
      placeContent: "space-between",
      display: "flex"
    },
    second: {
      width: "20%",
      textAlign: "right",
      placeSelf: "center"
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
    p0: {
      padding: 0
    },
    m0: {
      margin: 0
    },
    justifyBetween: {
      justifyContent: "space-between"
    }
  })
);

export default useStyles;
