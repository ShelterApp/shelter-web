import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    pt50: {
      paddingTop: 50
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
    }
  })
);

export default useStyles;
