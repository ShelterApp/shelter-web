import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 10
    },
    loadmore: {
      color: "#6B46E5",
      fontSize: 30,
      paddingTop: 20,
      paddingBottom: 20
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
      width: "100%",
      "& a": {
        fontSize: 14,
        color: "gray"
      }
    }
  })
);

export default useStyles;
