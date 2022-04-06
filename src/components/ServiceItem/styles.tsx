import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 16
    },
    title: {
      margin: "0 0 4px 0",
      fontSize: 14,
      color: "#6A46E5"
    },
    iconCircle: {
      width: 22,
      height: 22,
      alignItems: "center",
      justifyContent: "center",
      paddingRight: 4
    },
    center: {
      display: "flex",
      alignItems: "center"
    },
    description: {
      fontSize: 12,
      color: "gray",
      display: "inline-flex",
      width: "100%",
      marginBottom: 0,
      marginTop: 5
    },
    icon: {
      marginTop: -2,
      marginRight: 5
    },
    fzico: {
      fontSize: 15,
      marginLeft: 4
    },
    kudo: {
      flexDirection: "column",
      alignItems: "center",
      width: "75px",
      color: "#886aea !important",
      cursor: "pointer",
      marginTop: -30,
      textAlign: "center",
      "-webkit-user-drag": "none",
      "-webkit-tap-highlight-color": "transparent",
      [theme.breakpoints.down("xs")]: {
        width: "20%"
      }
    },
    botDesc: {
      display: "inline-flex",
      alignItems: "center",
      width: "100%"
    },
    inlineblock: {
      display: "inline-block"
    },
    mx16: {
      marginLeft: -16,
      marginRight: -16,
      opacity: 0.3,
      marginBottom: 0
    },
    colgreen: {
      color: "green"
    },
    redColor: {
      color: "red"
    },
    greenColor: {
      color: "#008000"
    },
    warningColor: {
      color: "#E67E00"
    },
    spacingDis: {
      marginLeft: 3
    },
    flagIcon: {
      color: "#886aea",
      fontSize: 17
    },
    flaginline: {
      display: "inline-flex",
      width: "100%",
      justifyContent: "space-between"
    },
    spcFlag: {
      paddingLeft: 5,
      paddingTop: 5,
      paddingBottom: 5,
      paddingRight: 26
    },
    spcSchedule: {
      margin: "0 !important",
      paddingBottom: 15
    },
    iconPhone: {
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
    w85: {
      width: "85% !important"
    }
  })
);

export default useStyles;
