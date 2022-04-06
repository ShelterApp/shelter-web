import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 10,
      paddingLeft: 0,
      paddingRight: 0
    },
    title: {
      color: "#6B46E5",
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 0
    },
    textCenter: {
      textAlign: "center"
    },
    group: {
      borderTop: "1px solid #CCD2D9",
      paddingBottom: 15
    },
    btnAction: {
      paddingLeft: 0,
      paddingRight: 0,
      fontSize: 12
    }
  })
);

export default useStyles;
