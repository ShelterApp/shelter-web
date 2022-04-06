import React from "react";
import styles from "../styles";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { ICoords } from "redux/reducers/service";
import { ServiceProps, tranformSchedules } from "common/";

interface ScheduleProps extends ServiceProps {
  currentLocation: ICoords;
  openUrl: Function;
  isChatBox?: boolean | false;
}

const Schedule = React.memo((props: ScheduleProps) => {
  const translate = useTranslation().t;
  const classes = styles();
  const { isContact, distance, isChatBox, openUrl } = props;
  const afterTranform = tranformSchedules({ ...props, translate: translate });

  const firstText = isContact
    ? translate("IS_SHOW_CONTACT")
    : afterTranform.text;

  const goToDetail = e => {
    openUrl(`/services/${props.id}`);
  };

  if (isChatBox) {
    return <>{firstText}. </>;
  }

  return (
    <React.Fragment>
      <p
        onClick={goToDetail}
        className={clsx(
          {
            [classes.warningColor]: isContact,
            [classes.greenColor]: !isContact && afterTranform.isOpen,
            [classes.redColor]: !isContact && !afterTranform.isOpen
          },
          classes.description,
          classes.inlineblock,
          classes.spcSchedule
        )}
      >
        {firstText}.
        {distance && (
          <label
            className={clsx(
              {
                [classes.redColor]: isContact || !afterTranform.isOpen,
                [classes.greenColor]: !isContact && afterTranform.isOpen
              },
              classes.spacingDis
            )}
          >
            {distance} Miles
          </label>
        )}
      </p>
    </React.Fragment>
  );
});

export default Schedule;
