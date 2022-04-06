import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 30
    },
    boxError: {
      backgroundColor: "#ffe0e0",
      padding: 10
    },
    legend: {
      fontSize: 14,
      paddingLeft: 5,
      paddingRight: 5,
      color: "#6A46E5"
    },
    fieldset: {
      borderColor: "rgba(255, 255, 255, 0.3)"
    },
    schedule: {
      border: "1px solid #CCD2D9",
      borderRadius: 4,
      padding: 10,
      justifyContent: "space-between",
      display: "flex",
      marginTop: 10,
      fontSize: 14
    },
    mt15: {
      marginTop: 15
    },
    iconDelete: {
      fontSize: 14,
      paddingLeft: 6
    },
    wrapDelete: {
      cursor: "pointer",
      display: "flex",
      alignItems: "center"
    }
  })
);

export default useStyles;
