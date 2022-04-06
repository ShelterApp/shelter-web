import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: 20
    },
    borderItem: {
      marginTop: 15,
      borderRadius: 4,
      border: "1px solid #CCD2D9",
      padding: 6,
      fontSize: 14,
      "& p": {
        marginTop: 0,
        marginBottom: 5
      }
    },
    iconCircle: {
      width: 18,
      height: 18,
      backgroundColor: "#6B46E5",
      borderRadius: 50,
      color: "white",
      padding: 4,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    name: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 16,
      fontWeight: "bold"
    },
    w30: {
      width: "30% !important",
      display: "inline-block"
    },
    w70: {
      width: "70% !important",
      display: "inline-block"
    },
    textApproved: {
      border: "1px solid green",
      borderRadius: 4,
      padding: 10,
      color: "green",
      textAlign: "center"
    },
    textNotApproved: {
      border: "1px solid red",
      borderRadius: 4,
      padding: 10,
      color: "red",
      textAlign: "center"
    },
    bgRed: {
      backgroundColor: "#E55A5A !important"
    },
    p0: {
      padding: 0
    }
  })
);

export default useStyles;
