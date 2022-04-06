import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btnCircle: {
      width: 40,
      height: 40,
      "& button": {
        backgroundColor: "#6A46E5",
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: "none",
        outline: "none"
      }
    },
    icon: {
      color: "white"
    },
    dot: {
      fontSize: 34,
      border: "none",
      padding: 5,
      borderRadius: "50%",
      backgroundColor: "gray",
      opacity: 0.5
    },
    mr10: {
      marginRight: 10
    },
    dotContainer: {
      alignSelf: "center",
      display: "inline-flex",
      "& .carousel__dot--selected": {
        opacity: 1,
        backgroundColor: "#6A46E5"
      }
    },
    botSlide: {
      display: "inline-flex",
      width: "100%",
      justifyContent: "space-between"
    },
    spaceBot: {
      minHeight: "85vh"
    }
  })
);

export default useStyles;
