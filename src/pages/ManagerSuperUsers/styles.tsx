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
      marginBottom: 10,
      cursor: "pointer"
    }
  })
);

export default useStyles;
