import React from "react";
import { ServiceProps } from "common/";
import { ICoords } from "redux/reducers/service";
import Schedule from "components/ServiceItem/components/Schedule";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import Swipeout from "rc-swipeout";
import "rc-swipeout/assets/index.css";
import { isMobile } from "common/";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
// import clsx from 'clsx';

interface myFavProps {
  myFavorites: ServiceProps[];
  openUrl: Function;
  currentLocation: ICoords;
  handleDelete: Function;
}

const MyFavoritesContainer = React.memo((props: myFavProps) => {
  const translate = useTranslation().t;
  const { myFavorites, openUrl, currentLocation, handleDelete } = props;
  const classes = styles();
  const [isSwipe, setIsSwipe] = React.useState(false);
  const redirectTo = url => {
    if (isSwipe) return;
    openUrl(url);
  };

  React.useEffect(() => {
    console.log(isMobile);
  }, []);

  const deleteMF = (e, id) => {
    // if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    handleDelete(id);
  };

  const renderList = () => {
    if (!myFavorites || (myFavorites && myFavorites.length === 0)) {
      return (
        <p className={classes.noText}>
          <i>{translate("NO_FAVORITES")}</i>
        </p>
      );
    }

    return myFavorites.map((service, index) => (
      <div key={index} className={classes.pb15}>
        <Swipeout
          right={[
            {
              text: "DELETE",
              onPress: () => handleDelete(service.id),
              style: { backgroundColor: "#E55A5A", color: "white" },
              className: "custom-class-2"
            }
          ]}
          onOpen={() => setIsSwipe(true)}
          onClose={() => setIsSwipe(false)}
        >
          <div
            onClick={() => redirectTo(`/services/${service.id}`)}
            className={classes.borderItem}
          >
            <p className={classes.title}>
              {service.name}
              {!isMobile && (
                <span onClick={e => deleteMF(e, service.id)}>
                  <DeleteOutlineIcon />
                </span>
              )}
            </p>
            <p className={classes.desc}>{service.serviceSummary}</p>
            <Schedule
              openUrl={redirectTo}
              {...service}
              currentLocation={currentLocation}
            />
          </div>
        </Swipeout>
      </div>
    ));
  };
  // const service = myFavorites[0];
  return (
    <>
      <Container className={classes.root}>{renderList()}</Container>
    </>
  );
});

export default MyFavoritesContainer;

// <div className="views">
//   <div className="list-block">
//     <ul>
//       <li className="swipeout">
//         <a href="#" className="swipeout-content item-link">
//           <div
//             onClick={() => redirectTo(`/services/${service.id}`)}
//             className={classes.borderItem}
//           >
//             <p className={classes.title}>{service.name}</p>
//             <p className={classes.desc}>{service.serviceSummary}</p>
//             <Schedule
//               openUrl={redirectTo}
//               {...service}
//               currentLocation={currentLocation}
//             />
//           </div>
//         </a>
//         <div className="swipeout-actions-right">
//           <a href="#" className={clsx(classes.btnDelete)}>DELETE</a>
//         </div>
//       </li>
//     </ul>
//   </div>
// </div>
