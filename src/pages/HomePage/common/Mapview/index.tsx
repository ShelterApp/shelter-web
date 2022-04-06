import React, { forwardRef } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import markerRed from "asset/img/red-dot.png";
import markerGreen from "asset/img/green-dot.png";
import { ICoords } from "redux/reducers/service";
import { ServiceProps } from "common/";
import { ScheduleType } from "@shelter/core";
import ServiceItem from "components/ServiceItem";
import styles from "./styles";
import { tranformSchedules } from "common/";
import { useTranslation } from "react-i18next";
import * as _ from "lodash";

interface MapViewProps {
  services: ServiceProps[];
  currentLocation?: ICoords;
  openUrl: Function;
  queryServicesByLocation: Function;
}

const MapView = forwardRef((props: MapViewProps, _ref: React.Ref<any>) => {
  const classes = styles();
  const translate = useTranslation().t;
  const { currentLocation, services, openUrl, queryServicesByLocation } = props;
  const _locateSelected = JSON.parse(
    sessionStorage.getItem("@shelter_locationMapview")
  );
  const locateSelected =
    _locateSelected && typeof _locateSelected === "object"
      ? _locateSelected
      : {
          lat: services[0]
            ? services[0].location.coordinates[1]
            : currentLocation
            ? currentLocation.latitude
            : 0,
          lng: services[0]
            ? services[0].location.coordinates[0]
            : currentLocation
            ? currentLocation.longitude
            : 0
        };
  const [activeKey, setActiveKey] = React.useState(null);
  const [curLoca, setCurLoca] = React.useState(locateSelected);

  const renderMarker = (service: ServiceProps) => {
    const { location, schedules, isContact } = service;
    const fullDay =
      schedules &&
      schedules.length === 1 &&
      schedules[0].type === ScheduleType.FullDay;
    const latLong = {
      lat: location.coordinates[1],
      lng: location.coordinates[0]
    };
    const afterTranform = tranformSchedules({
      ...service,
      translate: translate
    });
    const iconMarker =
      !isContact && (fullDay || afterTranform.isOpen) ? markerGreen : markerRed;

    return (
      <Marker
        key={service.id}
        icon={iconMarker}
        position={latLong}
        onClick={() => setActiveKey(service.id)}
      >
        {activeKey && activeKey === service.id && (
          <InfoWindow
            key={`InfoWindow-${service.id}`}
            onCloseClick={() => setActiveKey(null)}
            options={{ maxWidth: 300 }}
          >
            <div
              onClick={() => openUrl(`/services/${service.id}`)}
              style={{ cursor: "pointer" }}
            >
              <ServiceItem
                key={`ServiceItem-${service.id}`}
                currentLocation={currentLocation}
                service={service}
                onClickKudo={() => {}}
                onClickFlag={() => {}}
                isMapView={true}
                openUrl={openUrl}
              />
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
  };

  const handleClickMap = () => {
    if (activeKey) {
      setActiveKey(null);
    }
  };

  var fetchServices = _.debounce((lat, long) => {
    setCurLoca({
      lat: lat,
      lng: long
    });
    queryServicesByLocation(`${long}|${lat}`);
  }, 1000);

  let ref;

  return (
    <GoogleMap
      mapContainerClassName={classes.rootGoogleMap}
      zoom={10}
      center={curLoca}
      onClick={() => handleClickMap()}
      mapContainerStyle={{
        width: "100%",
        height: "calc(100vh - 146px)",
        maxWidth: 1024
      }}
      ref={mapRef => (ref = mapRef)}
      onCenterChanged={() => {
        if (ref) {
          let lat = ref.state.map.center.lat(),
            long = ref.state.map.center.lng();
          if (lat <= 90 && lat >= -90 && long >= -180 && long <= 180) {
            fetchServices(lat, long);
          }
          // console.log(ref.state.map.center.lat());
          // console.log(ref.state.map.center.lng());
          // console.log(ref.state.map.zoom);
        }
      }}
    >
      {services.map(service => renderMarker(service))}
    </GoogleMap>
  );
});

export default MapView;
// <Marker
//   icon={markerAGreen}
//   position={curLoca}
// />
