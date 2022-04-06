import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import MdSquare from "react-ionicons/lib/MdSquare";
import { ServiceProps } from "common/";
import dayjs from "dayjs";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    flexGrow: 1,
    position: "fixed",
    zIndex: 2,
    maxWidth: 1024,
    margin: "auto"
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "#565656",
    justifyContent: "center",
    cursor: "pointer",
    "& svg": {
      transform: "rotate(45deg)"
    }
  },
  title: {
    whiteSpace: "nowrap",
    overflow: "hidden !important",
    textOverflow: "ellipsis",
    width: "85%",
    textAlign: "center",
    paddingLeft: 5,
    paddingRight: 5
  }
}));

interface BreakingNewsProps {
  critical_header_services: ServiceProps[];
  openUrl: Function;
}

const SwipeableTextMobileStepper = React.memo((props: BreakingNewsProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const { critical_header_services, openUrl } = props;
  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const getTimeService = service => {
    const time = dayjs(service.criticalExpiredAt).format("hh:mm A");
    const day = dayjs(service.criticalExpiredAt).format("MM/DD/YY");
    return service.isCriticalNeverExpire
      ? ""
      : ` - Open till ${day} ${time === "11:59 PM" ? "" : time}`;
  };

  React.useEffect(() => {
    if (!Boolean(JSON.parse(sessionStorage.getItem("@shelterGoBack")))) {
      window.scrollTo(0, 0);
    }
  }, []);

  const tutorialSteps = critical_header_services.map(s => ({
    label: s.criticalDescription
      ? `${s.criticalDescription} - ${s.name}${getTimeService(s)}`
      : `${s.name}${getTimeService(s)}`,
    id: s.id
  }));

  return (
    <div className={classes.root}>
      {critical_header_services.length > 0 && (
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map((step, index) => (
            <div
              key={index}
              className={classes.header}
              onClick={() => openUrl(`/services/${step.id}`)}
            >
              <MdSquare color="#fff" fontSize="14px" />
              <div className={classes.title}>{step.label}</div>
              <MdSquare color="#fff" fontSize="14px" />
            </div>
          ))}
        </AutoPlaySwipeableViews>
      )}
    </div>
  );
});

export default SwipeableTextMobileStepper;
