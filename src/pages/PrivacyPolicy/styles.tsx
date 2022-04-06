import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 10
    },
    title: {
      fontSize: 14,
      color: "#6A46E5",
      "& a": {
        color: "#6A46E5",
        "-webkit-user-drag": "none",
        "-webkit-tap-highlight-color": "transparent",
        textDecoration: "underline",
        cursor: "pointer",
        "&:active": {
          backgroundColor: "unset",
          color: "#6A46E5"
        },
        "&:hover": {
          backgroundColor: "unset",
          color: "#6A46E5"
        }
      }
    },
    font600: {
      fontWeight: 600
    }
  })
);

export default useStyles;
