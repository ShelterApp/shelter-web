import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: 6,
      paddingRight: 6,
      paddingTop: 10,
      paddingBottom: 10,
      borderBottom: "1px solid #CCD2D9",
      display: "flex",
      alignItems: "center"
    },
    inputBed: {
      border: "1px solid #CCD2D9",
      borderRadius: 4,
      width: 50,
      "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none"
      },
      "& input": {
        textAlign: "center"
      }
    },
    icon: {
      color: "#6A46E5"
    },
    p0: {
      padding: 0
    },
    action: {
      width: "40%",
      display: "flex",
      justifyContent: "space-between"
    },
    name: {
      width: "60%",
      color: "#6A46E5"
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
