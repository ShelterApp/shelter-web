import React, { useState, useEffect } from "react";
import { push } from "connected-react-router";
import { reducerType } from "redux/reducers";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Container from "@material-ui/core/Container";
import HeaderBarSub from "components/HeaderBarSub";
import styles from "./styles";
import clsx from "clsx";
import GridFullHeight from "components/GridFullHeight";
import GridFormContainer from "components/GridFormContainer";
import { GiftedChat, Bubble, Time, Send } from "react-gifted-chat";
import imgBot from "asset/img/bot.png";
import { chatboxAPI } from "api/chatbox";
import { ICoords } from "redux/reducers/service";
import { struct } from "pb-util";
import { ScheduleCategory } from "@shelter/core";
import MdGlobe from "react-ionicons/lib/MdGlobe";
import MdStar from "react-ionicons/lib/MdStar";
import IosTimeOutline from "react-ionicons/lib/IosTimeOutline";
import { parseURL, tranformSchedulesForm } from "common/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChild, faUsers } from "@fortawesome/free-solid-svg-icons";
import Schedule from "components/ServiceItem/components/Schedule";
import { useTranslation } from "react-i18next";
import SendIcon from "@material-ui/icons/Send";
import { User } from "@shelter/core";
import $ from "jquery";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { getFAQPage } from "api/staticPages";
import moment from "moment";

interface ChatboxProps {
  dispatch: Dispatch;
  location: ICoords;
  auth: User;
}

const mapStateToProps = (state: reducerType) => {
  return {
    location: state.service.currentLocation
    // auth: state.auth,
  };
};

const numberRandom = () => Math.round(Math.random() * 1000000);

const commonProps = {
  user: {
    _id: 2,
    avatar: imgBot
  },
  text: [""]
};

const waiting = {
  _id: numberRandom(),
  ...commonProps,
  createdAt: new Date(),
  isWating: true,
  text: "...",
  quickReplies: {
    type: "radio",
    name: "waiting",
    values: [
      {
        title: "",
        value: ""
      }
    ]
  }
};

const Chatbox = React.memo((props: ChatboxProps) => {
  const { dispatch } = props;
  const location =
    props.location && !!props.location.latitude && !!props.location.longitude
      ? props.location
      : undefined;
  const classes = styles();
  const [messages, setMessages] = useState([waiting]);
  const [chatToken, setChatToken] = useState(Math.random().toString(36));
  const translate = useTranslation().t;

  const current_user = useSelector(
    (state: reducerType) => state.auth.current_user
  );

  useEffect(() => {
    init();
    // eslint-disable-next-line
  }, []);

  const [triggerSend, setTriggerSend] = useState(false);

  useEffect(() => {
    $("textarea").bind("keypress", handlePressEnter);
    return () => {
      $("textarea").unbind("keypress", handlePressEnter);
    };
    // eslist-disable-next-line
  });

  const handlePressEnter = e => {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 13) {
      setTriggerSend(true);
      return true;
    }
  };
  const clickDiv = el => {
    if (triggerSend) {
      el && el.click();
      setTriggerSend(false);
    }
  };
  const init = async () => {
    if (current_user && current_user.id) {
      setChatToken(current_user.id);
    }
    try {
      const coordinate = location
        ? [location.latitude, location.longitude].join("|")
        : undefined;
      const res = (await chatboxAPI({
        query: "Hi",
        coordinate,
        chatToken
      })) as any;
      if (res && res.length) {
        const results = [
          ...tranformChatBoxAPI(res)
          // ...defaultChat,
        ];
        console.log(results);
        setMessages(results);
      }
    } catch (error) {
      /* tslint:disable */
      console.log(error);
    }
  };

  const tranformChatBoxAPI = res => {
    let afterTranform = res.reduce((preV, current) => {
      let last, quickReplies;
      if (current.payload) {
        const { fields } = current.payload;
        if (fields.type && fields.type.stringValue) {
          let type = fields.type.stringValue;
          switch (type) {
            case "SERVICES_LIST":
            case "GET_SHELTER_AVAILABLE_BEDS":
              quickReplies = {
                name: "SERVICES_LIST",
                type: "radio",
                values: fields.data.listValue.values.map(rep =>
                  struct.decode({ fields: rep.structValue.fields })
                )
              };
              break;
            case "ASK_SERVICE_SCHEDULE":
              quickReplies = {
                name: "ASK_SERVICE_SCHEDULE",
                type: "radio",
                values: struct.decode({
                  fields: fields.data.structValue.fields
                })
              };
              break;
            case "ASK_DISTANCE_SERVICE":
            case "ASK_SERVICE_BED_AVAILABLE":
            case "ASK_PARTICULAR_SERVICE":
              quickReplies = {
                name: "SERVICES_LIST",
                type: "radio",
                values: [
                  struct.decode({
                    fields: fields.data.structValue.fields
                  })
                ]
              };
              break;
            case "CRISIS_LINES_LIST":
              quickReplies = {
                name: "CRISIS_LINES_LIST",
                type: "radio",
                values: fields.data.listValue.values.map(rep =>
                  struct.decode(rep.structValue)
                )
              };
              break;
            case "WEATHER":
              quickReplies = {
                name: "WEATHER",
                type: "radio",
                values: [
                  struct.decode({
                    fields: fields.data.structValue.fields
                  })
                ]
              };
              break;
            default:
              console.log("Alert");
          }
        } else {
          quickReplies = {
            name: "listValue",
            type: "radio",
            values: fields.quick_replies.listValue.values.map(
              rep => rep.structValue.fields.text.stringValue
            )
          };
        }
        last = {
          _id: numberRandom(),
          ...commonProps,
          createdAt: new Date(),
          quickReplies
        };
        return [...preV, last];
      }
      last = {
        _id: numberRandom(),
        ...commonProps,
        createdAt: new Date(),
        text: current.text.text
      };
      return [...preV, last];
    }, []);
    afterTranform = afterTranform.filter(item => item);
    return afterTranform.reverse();
  };

  const onSend = async (newMess, picked?) => {
    console.log(newMess);
    const lastNewMessageArr = newMess.map(me => ({
      ...me,
      _id: numberRandom()
    }));
    let messageState = messages;

    if (picked) {
      console.log(messageState);
      messageState = messageState.filter(
        m =>
          !m.quickReplies ||
          (m.quickReplies &&
            m.quickReplies.name &&
            m.quickReplies.name !== "listValue")
      );
    }

    let combineArr = GiftedChat.append(messageState, [
      waiting,
      ...lastNewMessageArr
    ]);

    setMessages(combineArr);

    if (newMess) {
      try {
        const query = newMess[0].text;
        // const token = await getDataToLocal("@ShelterToken");
        const coordinate = location
          ? [location.latitude, location.longitude].join("|")
          : undefined;
        const res = (await chatboxAPI({ query, coordinate, chatToken })) as any;
        if (res && res.length) {
          const tranformIdx = tranformChatBoxAPI(res);
          // tranformIdx.forEach((element, index) => {
          //   setTimeout(() => {
          //     const newArray = GiftedChat.append(
          //       combineArr.filter((c) => !c.isWating),
          //       tranformIdx.splice(index + 1)
          //     );
          //     console.log(index, tranformIdx);
          //     setMessage(newArray);
          //   }, index * 1000);
          // });
          const newArray = GiftedChat.append(
            combineArr.filter(c => !c.isWating),
            [...tranformIdx]
          );
          setMessages(newArray);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const openUrl = url => {
    dispatch(push(url));
  };

  const [content, setContent] = React.useState("");
  React.useEffect(() => {
    getFAQPage().then(data => {
      setContent(data.content);
    });
  }, []);

  const renderMessageText = props => {
    let { currentMessage, user } = props;
    let { quickReplies } = currentMessage;
    if (quickReplies) {
      console.log("quickReplies - ", quickReplies);
      let { name, type, values } = quickReplies;
      if (name === "listValue" && type === "radio") {
        return (
          <div className={classes.spcText}>
            {values.map((v, i) => (
              <button
                onClick={() => pickService(v)}
                className={classes.btnpill}
                key={i}
              >
                {v}
              </button>
            ))}
          </div>
        );
      }
      if (name === "SERVICES_LIST" && type === "radio") {
        return (
          <div className={classes.listServices}>
            {values.map((v, i) => (
              <ServiceItem key={i} {...v} />
            ))}
          </div>
        );
      }
      if (name === "ASK_SERVICE_SCHEDULE") {
        return <div className={classes.spcText}>{renderSchedule(values)}</div>;
      }
      if (name === "CRISIS_LINES_LIST") {
        return (
          <div className={classes.spcText}>{renderCrisisLines(values)}</div>
        );
      }
      if (name === "WEATHER") {
        console.log(values);
        return (
          <div className={classes.spcText}>{renderWeather(values[0])}</div>
        );
      }
      return (
        // <p className={classes.spcText}>loading</p>
        <div className={classes.spcText}>
          <div className="sk-flow">
            <div className="sk-flow-dot"></div>
            <div className="sk-flow-dot"></div>
            <div className="sk-flow-dot"></div>
          </div>
        </div>
      );
    }
    return (
      <p
        className={clsx(
          { [classes.textWhite]: user._id === 2 },
          classes.spcText
        )}
        key={currentMessage._id}
      >
        {currentMessage.text}
      </p>
    );
  };

  const renderBubble = props => {
    let { currentMessage } = props;
    let { quickReplies } = currentMessage;
    if (quickReplies) {
      console.log("quickReplies - ", quickReplies);
      let { name, type } = quickReplies;
      if (name === "SERVICES_LIST" && type === "radio") {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: "#6A46E5",
                color: "#fff"
              },
              left: {
                overflow: "overlay",
                width: "100%"
              }
            }}
          />
        );
      }
    }
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#6A46E5",
            color: "#fff"
          }
        }}
      />
    );
  };

  const renderTime = props => {
    console.log(props);
    return <Time {...props} />;
  };
  const renderSend = props => {
    return (
      <Send {...props}>
        <div ref={clickDiv}>
          <SendIcon id={"btnSend"} className={classes.btnSend} />
        </div>
      </Send>
    );
  };

  const pickService = serviceSelected => {
    const newMess = [
      {
        _id: numberRandom(),
        createdAt: new Date(),
        user: {
          _id: 1
        },
        text: serviceSelected
      }
    ];

    onSend(newMess, true);
  };

  const ServiceItem = props => {
    const {
      name,
      serviceSummary,
      age,
      website,
      phone,
      address1,
      address2,
      distance,
      likes,
      availableBeds,
      updatedAt,
      id
    } = props;
    // const isYouthKid = category && category[0] === ScheduleCategory.Kids;
    const category: string[] = props.category as string[];

    const isOnlyOne = category && category.length === 1;
    const isYouthKid = isOnlyOne && category[0] === ScheduleCategory.Kids;
    const lastCategory = (category.indexOf("ALL") !== -1
      ? ["Anyone"]
      : category.map(a => translate(a))
    ).join(", ");
    const withAge = age ? `${lastCategory} ${age}` : lastCategory;

    // const lastCategory = category.indexOf("ALL") !== -1 ? ["Anyone"] : category;
    // const withAge = age ? [...lastCategory, age] : lastCategory;
    return (
      <div className={classes.cardService}>
        <h4 className={classes.nameService}>
          <a
            href={`/services/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(classes.tagLink, classes.textWhite)}
          >
            {name}
          </a>
          {!!website && (
            <a
              href={parseURL(website)}
              className={classes.tagLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdGlobe
                color="white"
                fontSize="18px"
                className={classes.iconCircle}
              />
            </a>
          )}
        </h4>
        <p className={clsx(classes.nameService)}>
          <span>
            <MdStar
              color="white"
              fontSize="18px"
              className={classes.iconCircle}
            />
          </span>
          {serviceSummary}
        </p>
        <p className={clsx(classes.nameService)}>
          <span>
            <div className={clsx(classes.iconCircle)}>
              <FontAwesomeIcon icon={isYouthKid ? faChild : faUsers} />
            </div>
          </span>
          {withAge}
        </p>
        <p className={clsx(classes.nameService)}>
          <span>
            <IosTimeOutline
              color="white"
              fontSize="18px"
              className={classes.iconCircle}
            />
          </span>
          <span>
            {<Schedule isChatBox={true} {...props} />}
            {location && distance ? (
              <>{distance} miles</>
            ) : (
              <>{likes > 0 ? `${likes} Kudos` : ""}</>
            )}
          </span>
        </p>
        {!!availableBeds && (
          <p className={clsx(classes.nameService)}>
            <span style={{ color: "white", paddingRight: 5 }}>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="bed"
                className="svg-inline--fa fa-bed fa-w-20"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  fill="currentColor"
                  d="M176 256c44.11 0 80-35.89 80-80s-35.89-80-80-80-80 35.89-80 80 35.89 80 80 80zm352-128H304c-8.84 0-16 7.16-16 16v144H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v352c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-48h512v48c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V240c0-61.86-50.14-112-112-112z"
                ></path>
              </svg>
            </span>
            {availableBeds} Beds Available. Updated{" "}
            {updatedAt && moment(updatedAt).fromNow()}
          </p>
        )}
        <hr />
        <div className={classes.actionBtn}>
          {phone && (
            <a
              href={`tel:${phone}`}
              className={clsx(classes.btnpill_white, classes.tagLink)}
            >
              Contact
            </a>
          )}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${address1 ||
              address2}`}
            className={clsx(classes.btnpill_white, classes.tagLink)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
          </a>
        </div>
      </div>
    );
  };

  const renderSchedule = service => {
    const { schedules, isContact } = service;
    const lastSchedules = schedules && tranformSchedulesForm(schedules);
    if (lastSchedules.length > 0) {
      return (
        <div className={classes.pItems}>
          {lastSchedules.map((s, idx) => (
            <div
              className={clsx(
                { [classes.lastItem]: idx + 1 === lastSchedules.length },
                classes.childItem
              )}
              key={idx}
            >
              <span className={classes.pr10}>
                {idx > 0 &&
                lastSchedules[idx - 1].title === lastSchedules[idx].title
                  ? ""
                  : translate(s.title)}
              </span>
              <span>{s.date}</span>
            </div>
          ))}
        </div>
      );
    }
    if (isContact) {
      return (
        <div className={clsx(classes.desc, classes.textShowcontact)}>
          {translate("IS_SHOW_CONTACT")}
        </div>
      );
    }
    return <></>;
  };

  const renderCrisisLines = services => {
    return (
      <>
        {services.map(tempSer => {
          return (
            <a
              href={tempSer.website ? parseURL(tempSer.website) : "#"}
              className={clsx(classes.btnpill, classes.btnpill_line)}
              target={tempSer.website && "_blank"}
            >
              {tempSer.title || tempSer.name}
            </a>
          );
        })}
      </>
    );
  };

  const renderWeather = service => {
    const now = new Date(),
      sunrise = dayjs(
        service.sys.sunrise * 1000 +
          now.getTimezoneOffset() * 60000 +
          service.timezone * 1000
      ).format("h:mm A"),
      sunset = dayjs(
        service.sys.sunset * 1000 +
          now.getTimezoneOffset() * 60000 +
          service.timezone * 1000
      ).format("h:mm A");
    console.log(sunrise, sunset);
    return (
      <>
        <p className={classes.m0}>Humidity: {service.main.humidity}%</p>
        <p className={classes.m0}>Visibility: {service.visibility / 1000} mi</p>
        <p className={classes.m0}>Wind: {service.wind.speed} m/h</p>
        <p className={classes.m0}>Sunrise Today: {sunrise}</p>
        <p className={classes.m0}>Sunset Today: {sunset}</p>
      </>
    );
  };

  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight container>
          <HeaderBarSub
            backUrl={"/"}
            openUrl={openUrl}
            faq
            setLocate
            content={content}
          />
          <Container className={classes.root}>
            <GiftedChat
              renderMessageText={renderMessageText}
              renderBubble={renderBubble}
              renderTime={renderTime}
              messages={messages}
              onSend={m => onSend(m)}
              renderSend={renderSend}
              user={{
                _id: 1
              }}
            />
          </Container>
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(Chatbox);
