import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 275
    },
    toolbar: {
      minHeight: 44,
      backgroundColor: "#6A46E5",
      color: "#fff",
      lineHeight: "44px",
      "& p": {
        textAlign: "center",
        fontSize: 17,
        fontWeight: 500,
        margin: 0
      }
    },
    optMenu: {
      fontSize: 14,
      color: "#6A46E5",
      paddingLeft: 6,
      paddingRight: 6,
      "& .MuiListItemIcon-root": {
        minWidth: 30
      },
      "& .MuiListItemText-primary": {
        fontSize: 14
      }
    },
    selection: {
      backgroundColor: "#886aea",
      width: "25%",
      textAlign: "center",
      paddingTop: 5,
      color: "white",
      paddingBottom: 5,
      cursor: "pointer"
    },
    selectActive: {
      backgroundColor: "#6A46E5"
    },
    borderRadiusLeft: {
      borderRadius: "3px 0 0 3px"
    },
    borderRadiusRight: {
      borderRadius: "0 3px 3px 0"
    },
    listSelections: {
      fontSize: 12,
      paddingLeft: 3,
      paddingRight: 3
    },
    iconM: {
      fontSize: 18,
      color: "#6A46E5"
    },
    badge: {
      top: "15px !important",
      right: "-25px !important"
    }
  })
);

export default useStyles;
