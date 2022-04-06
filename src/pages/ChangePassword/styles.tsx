import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 30
    },
    boxError: {
      backgroundColor: "#ffe0e0",
      padding: 10
    }
  })
);

export default useStyles;
