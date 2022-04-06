import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imagePreview: {
      objectFit: "cover",
      width: 62,
      height: 62
    },
    preview: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      paddingRight: 20,
      display: "inline-flex"
    },
    iconRemove: {
      fontSize: 12,
      color: "red",
      border: "1px solid red",
      borderRadius: "50%",
      textAlign: "center",
      width: 16,
      height: 16,
      flexDirection: "column",
      display: "flex",
      justifyContent: "center",
      marginTop: -8,
      marginLeft: -9
    },

    attachIcon: {
      backgroundColor: "#6A46E5",
      borderRadius: "50%",
      padding: 4,
      minWidth: "unset",
      marginRight: 53
    },
    outlinenone: {
      outline: "none"
    }
  })
);

export default useStyles;
