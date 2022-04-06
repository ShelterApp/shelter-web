import React from "react";
import {
  GoogleMap,
  Marker,
  DirectionsService,
  DirectionsRenderer
} from "@react-google-maps/api";
import markerBRed from "asset/img/pinBRed.svg";
import markerBGreen from "asset/img/pinBGreen.svg";
import { ICoords } from "redux/reducers/service";
import { ServiceProps } from "common/";
import { ScheduleType } from "@shelter/core";

interface MapViewProps {
  service: ServiceProps;
  currentLocation?: ICoords;
}

const MapView = React.memo((props: MapViewProps) => {
  const { location, schedules } = props.service;
  const { currentLocation } = props;
  const [response, setResponse] = React.useState(null);
  const is24Hour =
    schedules && schedules[0] && schedules[0].type === ScheduleType.FullDay;
  const [isDirect, setIsDirect] = React.useState(null);

  const latLong = {
    lat: location.coordinates[1],
    lng: location.coordinates[0]
  };
  const curLoca = currentLocation
    ? {
        lat: currentLocation.latitude,
        lng: currentLocation.longitude
      }
    : undefined;

  const directionsCallback = res => {
    if (response) return;
    console.log(res);
    if (res !== null) {
      if (res.status === "OK") {
        setIsDirect(true);
        setResponse(res);
        return;
      } else {
        setIsDirect(false);
        console.log("response: ", res);
        return;
      }
    }
    setIsDirect(false);
  };
  return (
    <GoogleMap
      zoom={13}
      mapContainerStyle={{ width: "100%", height: "300px" }}
      center={latLong}
    >
      {(!currentLocation || isDirect === false) && (
        <Marker
          icon={is24Hour ? markerBGreen : markerBRed}
          position={latLong}
        />
      )}
      {!!currentLocation && !!location && (
        <>
          <DirectionsService
            options={{
              destination: latLong,
              origin: curLoca,
              travelMode: "TRANSIT"
            }}
            callback={directionsCallback}
            onLoad={directionsService => {
              console.log(
                "DirectionsService onLoad directionsService: ",
                directionsService
              );
            }}
            onUnmount={directionsService => {
              console.log(
                "DirectionsService onUnmount directionsService: ",
                directionsService
              );
            }}
          />
          {isDirect && (
            <DirectionsRenderer
              options={{
                directions: response,
                polylineOptions: {
                  strokeColor: "red"
                }
              }}
              onLoad={directionsRenderer => {
                console.log(
                  "DirectionsRenderer onLoad directionsRenderer: ",
                  directionsRenderer
                );
              }}
              onUnmount={directionsRenderer => {
                console.log(
                  "DirectionsRenderer onUnmount directionsRenderer: ",
                  directionsRenderer
                );
              }}
            />
          )}
        </>
      )}
    </GoogleMap>
  );
});

export default MapView;
// <Marker
//   icon={markerAGreen}
//   position={curLoca}
// />
