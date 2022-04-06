import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: 18,
      fontWeight: 700
    },
    desc: {
      fontSize: 14,
      textAlign: "center"
    },
    stepContainer: {
      width: "100%",
      textAlign: "center"
    },
    kudoIcon: {
      color: "#6A46E5",
      "& svg": {
        marginBottom: -5
      }
    },
    groupBtn: {
      marginTop: 50,
      display: "flex",
      justifyContent: "space-between",
      "& button": {
        width: "100%",
        fontSize: 12
      }
    },
    ml7: {
      marginLeft: 7
    },
    mr7: {
      marginRight: 7
    },
    checked: {
      width: 60,
      height: 60,
      backgroundColor: "#6A46E5",
      borderRadius: "50%",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: "auto",
      marginTop: 100,
      "& svg": {
        paddingBottom: 3
      }
    },
    textLink: {
      color: "black",
      "-webkit-user-drag": "none",
      "-webkit-tap-highlight-color": "transparent",
      textDecoration: "underline",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "unset",
        color: "black"
      },
      "&:hover": {
        backgroundColor: "unset",
        color: "black"
      }
    },
    borderCenter: {
      border: "1px solid red",
      textAlign: "center",
      padding: 8
    },
    textSkip: {
      color: "#6A46E5",
      cursor: "pointer",
      textAlign: "right",
      marginBottom: 0,
      fontSize: 14
    },
    iconChatbot: {
      width: 24,
      backgroundColor: "#6A46E5",
      height: 24,
      borderRadius: 5
    }
  })
);

export default useStyles;
