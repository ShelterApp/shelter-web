import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 25,
      paddingRight: 6,
      paddingLeft: 6
    },
    textCenter: {
      textAlign: "center"
    }
  })
);

export default useStyles;
