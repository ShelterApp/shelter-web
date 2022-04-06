import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootGoogleMap: {
      "& .gm-style-iw.gm-style-iw-c": {
        padding: 0,
        maxWidth: 340,
        paddingTop: 10,
        "& button": {
          display: "none !important"
        },
        "& .MuiContainer-root.MuiContainer-maxWidthLg": {
          paddingRight: 0
        }
      }
    }
  })
);

export default useStyles;
