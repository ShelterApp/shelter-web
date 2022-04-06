import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: "100%",
      "& .Mui-selected": {
        color: "black",
        backgroundColor: "white"
      },
      "& .MuiTabs-indicator": {
        backgroundColor: "#6A46E5"
      },
      "& .MuiBox-root": {
        border: "1px solid #CCD2D9",
        borderTop: "none",
        borderRadius: 4
      }
    },
    tabContainer: {
      backgroundColor: "#a9a9a9",
      color: "black"
    },
    tab: {
      fontSize: 12
    },
    forgotPassword: {
      color: "#6A46E5",
      fontSize: 12,
      textAlign: "right",
      cursor: "pointer",
      marginBottom: 0
    },
    boxError: {
      backgroundColor: "#ffe0e0",
      padding: 10
    },
    socialLogin: {
      border: "1px solid #CCD2D9",
      borderRadius: 4,
      marginTop: 10,
      padding: 10,
      "& svg": {
        paddingRight: 10,
        fontSize: 16
      }
    },
    loginWith: {
      fontSize: 14,
      marginTop: 0
    },
    fbBtn: {
      color: "#087eeb"
    },
    ggBtn: {
      color: "red !important"
    },
    insBtn: {
      color: "#F56040"
    },
    cusBtn: {
      border: "none",
      backgroundColor: "white",
      width: "100%",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      fontSize: 12,
      alignItems: "center",
      boxShadow: "0px 8px 15px rgba(0,0,0,0.1)",
      borderRadius: "20px !important",
      fontWeight: "bold",
      outline: "none !important"
    },
    twitterBtn: {
      color: "#1DA1F2"
    },
    titleSU: {
      fontSize: 12,
      color: "red",
      textAlign: "center"
    },
    m0: {
      margin: "0px !important"
    },
    h100: {
      height: "100% !important"
    }
  })
);

export default useStyles;
