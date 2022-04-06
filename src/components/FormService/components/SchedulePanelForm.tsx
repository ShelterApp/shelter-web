import React, { useState } from "react";
import styles from "../styles";
import { useTranslation } from "react-i18next";
import { Dispatch } from "redux";
import {
  IScheduleProps,
  tranformScheduleTypes,
  tranformDayInWeek,
  tranformWeekInMonth
} from "common/";
import { ScheduleType, Service as IServiceProps } from "@shelter/core";
import dayjs from "dayjs";
import ErrorMessage from "components/ErrorMessage";
import Input from "components/Input";
import GridFullHeight from "components/GridFullHeight";
import GridFormContainer from "components/GridFormContainer";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ButtonOutline from "components/ButtonOutline";
import Swipeout from "rc-swipeout";
import "rc-swipeout/assets/index.css";
import { isMobile } from "common/";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { SET_MESSAGES_REDUCER } from "redux/reducers/messages/actionTypes";

interface ScheduleProps {
  addToSchedule?: (obj) => void;
  initialValues?: IServiceProps;
  schedules?: any;
  onDeleteSchedule?: (key) => void;
  close?: boolean;
  defaultValues: IScheduleProps;
  register: any;
  errors: any;
  getValues: any;
  dispatch: Dispatch;
}

const { Monthly, Weekly, DateRange, FullDay, PermanentlyClosed } = ScheduleType;

const Schedule = React.memo((props: ScheduleProps) => {
  const translate = useTranslation().t;
  const classes = styles();
  const { errors, defaultValues, schedules, dispatch } = props;
  const [values, setValues] = useState(defaultValues);

  const flashError = message => {
    dispatch({
      type: SET_MESSAGES_REDUCER,
      message: {
        type: "error",
        key: "ERROR_FORM_SERVICE",
        message: message
      }
    });
  };

  const handleOnAddToSchedule = () => {
    const obj = {
      startTime: parseSchedule(values.startTime, "time"),
      endTime: parseSchedule(values.endTime, "time"),
      type: values.scheduleType
    } as any;

    let start = new Date(Date.parse("11/24/2014 " + values.startTime)),
      end = new Date(Date.parse("11/24/2014 " + values.endTime));
    if (start > end) {
      flashError("End Time should be greater than Start time");
      return;
    }

    if (!values.scheduleType) {
      flashError("Something wrong, please try again");
      return;
    }
    console.log(values, obj, " -=-= -= -= -= ");

    switch (values.scheduleType) {
      case Weekly:
        obj.day = values.dayInWeek;
        break;
      case Monthly:
        obj.period = values.period;
        obj.day = values.dayInWeek;
        break;
      case DateRange:
        obj.startDate = parseSchedule(values.startDate, "date");
        obj.endDate = parseSchedule(values.endDate, "date");
        // obj.startDate = values.startDate;
        // obj.endDate = values.endDate;
        break;
      default:
        delete obj.startTime;
        delete obj.endTime;
        break;
    }

    props.addToSchedule(obj);
  };

  const parseSchedule = (value, type) => {
    switch (type) {
      case "date":
        return dayjs(value).format("MM/DD/YYYY");
      case "time":
        return dayjs(value).format("hh:mm A");
      default:
        return value;
    }
  };

  const setFieldValue = (name, value) => {
    setValues({
      ...values,
      [name]: value
    });
  };

  const { scheduleType } = values;
  const isShowWeekly = scheduleType === Weekly;
  const isShowMonthly = scheduleType === Monthly;
  const isShowDateRange = scheduleType === DateRange;
  const isShowFullday =
    scheduleType === FullDay || scheduleType === PermanentlyClosed;
  const isClose = !isShowWeekly;
  const isNotClose = isShowWeekly || isShowMonthly || isShowDateRange;
  const scheduleTypesClose = tranformScheduleTypes.filter(
    ty => ty.value !== FullDay
  );
  const scheduleTypesOpen = tranformScheduleTypes.filter(
    ty => ty.value !== PermanentlyClosed
  );
  const scheduleTypes = props.close ? scheduleTypesClose : scheduleTypesOpen;

  const onDeleteSchedule = key => {
    props.onDeleteSchedule(key);
  };

  const scheduleItems = () => {
    return schedules.map((item, index) => (
      <Swipeout
        right={[
          {
            text: "DELETE",
            onPress: () => onDeleteSchedule(item.key),
            style: {
              backgroundColor: "#E55A5A",
              color: "white",
              marginTop: 10
            },
            className: "custom-class-2"
          }
        ]}
        autoClose={true}
        key={index}
      >
        <div className={classes.schedule}>
          <span>{item.title}</span>
          <span style={{ display: "flex" }}>
            {item.date}
            {!isMobile && (
              <span
                className={classes.wrapDelete}
                onClick={() => onDeleteSchedule(item.key)}
              >
                <DeleteOutlineIcon className={classes.iconDelete} />
              </span>
            )}
          </span>
        </div>
      </Swipeout>
    ));
  };
  return (
    <React.Fragment>
      <Input
        name="scheduleType"
        type="select"
        fullWidth
        label="SCHEDULE TYPE"
        changeHandler={e => setFieldValue("scheduleType", e)}
        value={values.scheduleType}
        options={scheduleTypes}
        error={errors.scheduleType}
      />
      {errors.scheduleType && errors.scheduleType.type === "required" && (
        <ErrorMessage>Please input your address.</ErrorMessage>
      )}
      {!isShowFullday && (
        <>
          {isShowMonthly && (
            <Input
              name="period"
              type="select"
              fullWidth
              label={translate("SELECT_PERIOD")}
              changeHandler={e => setFieldValue("period", e)}
              value={values.period}
              options={tranformWeekInMonth}
              error={errors.period}
            />
          )}
          {(isShowMonthly || isShowWeekly) && (
            <Input
              name="dayInWeek"
              type="select"
              fullWidth
              label={"SELECT DAY"}
              changeHandler={e => setFieldValue("dayInWeek", e)}
              value={values.dayInWeek}
              options={tranformDayInWeek}
              error={errors.dayInWeek}
            />
          )}
          {isShowDateRange && (
            <GridFullHeight container spacing={2}>
              <GridFormContainer item xs={6} sm={6} md={6}>
                <Input
                  name="startDate"
                  type="date"
                  fullWidth
                  label={"START DATE"}
                  changeHandler={e => setFieldValue("startDate", e)}
                  value={values.startDate}
                  error={errors.startDate}
                />
              </GridFormContainer>
              <GridFormContainer item xs={6} sm={6} md={6}>
                <Input
                  name="endDate"
                  type="date"
                  fullWidth
                  label={"END DATE"}
                  changeHandler={e => setFieldValue("endDate", e)}
                  value={values.endDate}
                  error={errors.endDate}
                />
              </GridFormContainer>
            </GridFullHeight>
          )}
          {(props.close ? isClose : isNotClose) && (
            <GridFullHeight container spacing={2}>
              <GridFormContainer item xs={6} sm={6} md={6}>
                <Input
                  name="startTime"
                  type="time"
                  fullWidth
                  label={"START TIME"}
                  changeHandler={e => setFieldValue("startTime", e)}
                  value={values.startTime}
                  error={errors.startTime}
                />
              </GridFormContainer>
              <GridFormContainer item xs={6} sm={6} md={6}>
                <Input
                  name="endTime"
                  type="time"
                  fullWidth
                  label={"END TIME"}
                  changeHandler={e => setFieldValue("endTime", e)}
                  value={values.endTime}
                  error={errors.endTime}
                />
              </GridFormContainer>
            </GridFullHeight>
          )}
        </>
      )}
      <ButtonGroup
        className={classes.mt15}
        onClick={() => handleOnAddToSchedule()}
        fullWidth
      >
        <ButtonOutline variant="contained">Add to schedule</ButtonOutline>
      </ButtonGroup>
      <br />
      {scheduleItems()}
    </React.Fragment>
  );
});

export default Schedule;
