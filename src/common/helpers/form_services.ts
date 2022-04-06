import {
  ScheduleType,
  ScheduleCategory,
  ServiceType,
  DayPeriod
} from "@shelter/core";
import { tranformType, weekInMonth } from "./service";
import i18n from "../../i18n";

const translate = i18n.t.bind(i18n);
export const typeCheckboxs = Object.keys(ServiceType).map(type => ({
  name: ServiceType[type],
  isCheck: false
}));

export const categoryCheckboxs = Object.keys(ScheduleCategory).map(type => ({
  name: ScheduleCategory[type],
  isCheck: false
}));

export interface CheckboxType {
  name: string;
  isCheck: boolean;
}

export const tranformSchedulesForm = schedules => {
  if (schedules && schedules.length) {
    const order = schedules.sort((a, b) =>
      a.startTimeSeconds > b.startTimeSeconds ? 1 : -1
    );
    let newArr = [];
    order.forEach(element => {
      if (element.day === "MONDAY" && element.type === "WEEKLY")
        newArr.push(element);
    });
    order.forEach(element => {
      if (element.day === "TUESDAY" && element.type === "WEEKLY")
        newArr.push(element);
    });
    order.forEach(element => {
      if (element.day === "WEDNESDAY" && element.type === "WEEKLY")
        newArr.push(element);
    });
    order.forEach(element => {
      if (element.day === "THURSDAY" && element.type === "WEEKLY")
        newArr.push(element);
    });
    order.forEach(element => {
      if (element.day === "FRIDAY" && element.type === "WEEKLY")
        newArr.push(element);
    });
    order.forEach(element => {
      if (element.day === "SATURDAY" && element.type === "WEEKLY")
        newArr.push(element);
    });
    order.forEach(element => {
      if (element.day === "SUNDAY" && element.type === "WEEKLY")
        newArr.push(element);
    });
    order.forEach(element => {
      if (element.type === "MONTHLY" && element.period === "FIRST")
        newArr.push(element);
    });
    order.forEach(element => {
      if (element.type === "MONTHLY" && element.period === "SECOND")
        newArr.push(element);
    });
    order.forEach(element => {
      if (element.type === "MONTHLY" && element.period === "THIRD")
        newArr.push(element);
    });
    order.forEach(element => {
      if (element.type === "MONTHLY" && element.period === "FOURTH")
        newArr.push(element);
    });
    order.forEach(element => {
      if (element.type === "MONTHLY" && element.period === "FIFTH")
        newArr.push(element);
    });
    order.forEach(element => {
      if (element.type === "MONTHLY" && element.period === "LAST")
        newArr.push(element);
    });
    order.forEach(element => {
      if (element.type === "DATE_RANGE") newArr.push(element);
    });
    order.forEach(element => {
      if (element.type === "FULL_DAY") newArr.push(element);
    });
    order.forEach(element => {
      if (element.type === "PERMANENTLY_CLOSED") newArr.push(element);
    });

    return newArr.map((sche, idx) => ({
      key: idx,
      title: tranformType(sche, translate),
      date:
        sche.type !== ScheduleType.FullDay
          ? sche.startTime && sche.endTime
            ? `${sche.startTime} - ${sche.endTime}`
            : ""
          : ""
    }));
  }
  return [];
};

export const tranformWeekInMonth = weekInMonth.map(week => ({
  label: translate(week.name.toLocaleUpperCase()),
  value: week.name.toLocaleUpperCase()
}));

const dayInWeek = Object.keys(DayPeriod).map(day => `${DayPeriod[day]}`);

export const tranformDayInWeek = dayInWeek.map(day => ({
  label: translate(day),
  value: day
}));

export const tranformScheduleTypes = Object.keys(ScheduleType).map(type => ({
  label:
    ScheduleType[type] === ScheduleType.FullDay
      ? translate("OPEN_24H")
      : translate(ScheduleType[type]),
  value: ScheduleType[type]
}));

export interface IScheduleProps {
  scheduleType?: string;
  period?: string;
  dayInWeek?: string;
  startDate?: any;
  endDate?: any;
  startTime?: any;
  endTime?: any;
}

export const defaultShedule: IScheduleProps = {
  scheduleType: tranformScheduleTypes[0].value,
  period: tranformWeekInMonth[0].value, // First
  dayInWeek: tranformDayInWeek[0].value, // Monday
  startDate: new Date(),
  // startDate: dayjs(new Date()).format('MM/DD/YYYY'),
  // endDate: dayjs(new Date()).format('MM/DD/YYYY'),
  endDate: new Date(),
  startTime: new Date(new Date().setHours(8, 0)),
  // startTime: '11:00 PM',
  endTime: new Date(new Date().setHours(17, 0))
  // endTime: '12:00 AM',
};
export const holiday: IScheduleProps = {
  // startDate: dayjs(new Date()).format('MM/DD/YYYY'),
  // endDate: dayjs(new Date()).format('MM/DD/YYYY'),
  // startTime: '12:00 AM',
  // endTime: '11:59 PM',
  startDate: new Date(),
  endDate: new Date(),
  startTime: new Date(new Date().setHours(0, 0)),
  endTime: new Date(new Date().setHours(23, 59)),
  scheduleType: tranformScheduleTypes[0].value,
  dayInWeek: tranformDayInWeek[0].value,
  period: tranformWeekInMonth[0].value
};

// export const holiday: IScheduleProps = {
//   scheduleType: tranformScheduleTypes[0].value,
//   period: tranformWeekInMonth[0].value, // First
//   dayInWeek: tranformDayInWeek[6].value, // Monday
//   startDate: dayjs(new Date()).format("MM/DD/YYYY"),
//   endDate: dayjs(new Date()).format("MM/DD/YYYY"),
//   startTime: "12:00 AM",
//   endTime: "11:59 PM",
// };
