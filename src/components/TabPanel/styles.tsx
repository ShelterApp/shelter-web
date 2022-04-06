import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      height: 50
    },
    pBottom: {
      maxWidth: 1024,
      position: "fixed",
      bottom: 0
    },
    prTab: {
      backgroundColor: "#6A46E5",
      paddingTop: 0,
      fontSize: "12px !important",
      opacity: 1,
      "& .MuiTab-wrapper": {
        top: 0,
        position: "absolute",
        fontSize: 9.5,
        textTransform: "capitalize",
        opacity: 0.7
      }
    },
    stTabs: {
      height: "50px",
      "& .Mui-selected .MuiTab-wrapper": {
        opacity: 1
      }
    },
    iService: {
      fontSize: 32,
      marginBottom: "0 !important"
    },
    bar1: {
      maxWidth: 1024,
      position: "fixed",
      bottom: 50,
      backgroundColor: "#f6f3f3",
      display: "inline-flex",
      flexFlow: "row",
      justifyContent: "space-between",
      borderTop: "1px solid #CCD2D9"
    },
    allbtn: {
      borderRadius: "50%",
      padding: "8px 10px",
      width: 35,
      maxWidth: "35 !important",
      minWidth: 35,
      height: 35,
      minHeight: 35,
      maxHeight: 35
    },
    cusBtn: {
      fontSize: 12,
      textTransform: "capitalize",
      margin: theme.spacing(1),
      border: "solid 1px #ccc",
      color: "#6A46E5",
      borderRadius: 20
    },
    cBtn: {
      width: "100%",
      maxWidth: 360
    },
    activeBtn: {
      color: "white",
      backgroundColor: "#6A46E5",
      "&:hover": {
        backgroundColor: "#6A46E5"
      }
    }
  })
);

export default styles;
