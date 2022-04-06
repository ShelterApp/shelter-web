import React from "react";
import GridFullHeight from "components/GridFullHeight";
import loading from "asset/img/loading.svg";

export default function Loading() {
  return (
    <GridFullHeight
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ height: "90vh" }}
    >
      <img width={50} height={50} src={loading} alt="loading" />
    </GridFullHeight>
  );
}
