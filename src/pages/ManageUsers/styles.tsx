import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 10,
      paddingLeft: 6,
      paddingRight: 6
    },
    loadmore: {
      color: "#6B46E5",
      fontSize: 30
    },
    textCenter: {
      textAlign: "center"
    },
    noText: {
      fontSize: 14,
      color: "gray",
      paddingTop: 140,
      textAlign: "center",
      paddingLeft: 6,
      paddingRight: 6,
      width: "100%"
    },
    item: {
      border: "1px solid #CCD2D9",
      paddingLeft: 10,
      paddingRight: 10,
      display: "flex",
      justifyContent: "space-between"
    },
    pb15: {
      paddingBottom: 15
    },
    title: {
      marginBottom: 5,
      fontSize: 12
    },
    wrapDelete: {
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      paddingTop: 10
    },
    iconDelete: {
      fontSize: 14,
      paddingLeft: 6
    },
    groupIcon: {
      display: "flex",
      margin: 0
    }
  })
);

export default useStyles;
