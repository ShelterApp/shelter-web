import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 25
    },
    borderItem: {
      border: "1px solid #CCD2D9",
      borderRadius: 4,
      padding: 10,
      paddingBottom: 0,
      cursor: "pointer"
    },
    title: {
      margin: "0 0 4px 0",
      fontSize: 12,
      color: "#6A46E5",
      display: "flex",
      justifyContent: "space-between",
      "& svg": {
        fontSize: 16,
        cursor: "pointer"
      }
    },
    desc: {
      margin: "0 0 4px 0",
      fontSize: 12,
      color: "gray"
    },
    noText: {
      fontSize: 16,
      color: "gray",
      paddingTop: 70,
      textAlign: "center"
    },
    btnDelete: {
      backgroundColor: "#ff00009e !important",
      fontSize: 12,
      padding: "0 15px !important"
    },
    pb15: {
      paddingBottom: 15
    }
  })
);

export default useStyles;
