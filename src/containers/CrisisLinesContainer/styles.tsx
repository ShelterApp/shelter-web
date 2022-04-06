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
    }
  })
);

export default useStyles;
