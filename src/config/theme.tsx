const lightGray = "#f8f8f8";
const Gray = "#616061";
const hardGary = "#4d4e5d";
const Red = "#e02020d4";
const RedPink = " #db4437";
const lightRed = "rgba(219, 68, 55, 0.15)";

const theme: object = {
  //backGround
  bg: lightGray,
  bgContainer: "white",
  bgButton: "#6A46E5",
  bgError: lightRed,
  bgHover: lightGray,

  //text
  textExplanation: Gray,
  textLabel: hardGary,
  textError: Red,
  icon: Gray,
  warnIcon: RedPink,
  //other
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  }
};

export default theme;
