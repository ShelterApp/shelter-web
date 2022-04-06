import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textarea: {
      width: "100%",
      border: "1px solid #dddddd",
      outline: "none",
      font: "unset",
      fontSize: 12,
      "&::placeholder": {
        opacity: 0.8
      }
    },
    rootCheckbox: {
      paddingTop: 10
    },
    labelCheckbox: {
      marginTop: 12,
      color: "black"
    },
    rootInput: {
      color: "rgba(0, 0, 0, 0.87)",
      cursor: "text",
      display: "inline-flex",
      position: "relative",
      fontSize: "14px",
      boxSizing: "border-box",
      alignItems: "center",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      lineHeight: "1.1876em",
      letterSpacing: "0.00938em",
      padding: "0 0 7px 0",
      borderBottom: "1px solid #dddddd",
      width: "100%",
      "& input": {
        font: "inherit",
        color: "currentColor",
        width: "100%",
        border: 0,
        height: "1.1876em",
        margin: 0,
        display: "block",
        minWidth: 0,
        background: "none",
        boxSizing: "content-box",
        animationName: "mui-auto-fill-cancel",
        letterSpacing: "inherit",
        animationDuration: "10ms",
        "-webkit-tap-highlight-color": "transparent",
        outline: "none",
        fontSize: 12,
        "&::placeholder": {
          opacity: "0.42 !important"
        }
      },
      "& .react-datepicker-wrapper": {
        width: "100%"
      }
    },
    inputPhone: {
      "& input": {
        paddingBottom: 0
      }
    },
    rootSelect: {
      width: "100%",
      borderBottom: "1px solid #dddddd",
      fontSize: 12
    },
    rootSelect2: {
      width: "100%",
      fontSize: 12
    }
  })
);

export default useStyles;
