import React from "react";
import { ServiceProps } from "common/";
import ServiceItemDetail from "components/ServiceItemDetail";
import { ICoords } from "redux/reducers/service";

interface ServiceDetailContainerProps {
  data: ServiceProps;
  openUrl: Function;
  currentLocation: ICoords;
  onClickFlag: Function;
  onClickReport: Function;
}

const ServiceDetailContainer = React.memo(
  (props: ServiceDetailContainerProps) => {
    const {
      data,
      openUrl,
      currentLocation,
      onClickFlag,
      onClickReport
    } = props;
    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    return (
      <>
        <ServiceItemDetail
          currentLocation={currentLocation}
          service={data}
          openUrl={openUrl}
          onClickFlag={onClickFlag}
          onClickReport={onClickReport}
        />
      </>
    );
  }
);

export default ServiceDetailContainer;
