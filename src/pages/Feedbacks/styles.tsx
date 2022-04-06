import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 20
    },
    btnFilter: {
      textTransform: "capitalize",
      fontSize: 12,
      backgroundColor: "rgba(106, 70, 229, 0.8)",
      width: "100%",
      borderColor: "rgba(106, 70, 229, 0.8) !important",
      "&:hover": {
        backgroundColor: "rgba(106, 70, 229, 0.8)"
      },
      paddingLeft: "6px !important",
      paddingRight: "6px !important"
    },
    btnActive: {
      backgroundColor: "#6A46E5 !important"
    },
    groupBtns: {
      width: "100%"
    }
  })
);

export default useStyles;
