import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: 55
    },
    menuOpen: {
      [theme.breakpoints.down("md")]: {
        paddingLeft: 275,
        display: "inline-grid",
        overflowX: "hidden"
      }
    }
  })
);

export default styles;
