import { Service as IServiceProps } from "@shelter/core";

export const PageSize: number = 100;

export const tranformSelected = selected => {
  if (selected) {
    switch (selected) {
      case "Youth/Kids":
        return "KIDS";
      case "LGBT+":
        return "LGBT";
      default:
        return selected.toUpperCase();
    }
  }
};

export const convertSelected = selected => {
  if (selected) {
    switch (selected) {
      case "KIDS":
        return "Youth/Kids";
      case "LGBT":
        return "LGBT+";
      default:
        return selected;
    }
  }
  return "All";
};

export interface QueryServiceProps {
  direction?: string;
  filter?: string;
  isApproved?: boolean;
  isOpen?: boolean;
  limit?: number;
  skip?: number;
  search?: string;
  sort?: string;
  type?: string;
  q?: string;
  nearCoordinate?: string;
  currentCoordinate?: string;
  userTimezone?: number;
  category?: string;
  isCriticalHeader?: boolean;
}
const currentLocation = sessionStorage.getItem("@shelter_current_location");

const category = JSON.parse(sessionStorage.getItem("@shelter_category"));
const isTopKudos = Boolean(
  JSON.parse(sessionStorage.getItem("@shelter_isTopKudos"))
);
export interface ServiceProps extends IServiceProps {
  distance: number;
}

const _initQuery = () => {
  let _query: QueryServiceProps = {
    direction: "desc",
    filter: "type,isApproved",
    isApproved: true,
    limit: PageSize,
    skip: 0,
    search:
      "name, description, serviceSummary, address1, address2, phone, userEmail, contactEmail"
  };

  if (currentLocation && currentLocation !== "undefined") {
    _query = addFilter(
      _query,
      "nearCoordinate",
      `${JSON.parse(currentLocation).longitude}|${
        JSON.parse(currentLocation).latitude
      }`
    );
    _query = addFilter(
      _query,
      "currentCoordinate",
      `${JSON.parse(currentLocation).longitude}|${
        JSON.parse(currentLocation).latitude
      }`
    );
  } else {
    _query = removeFilter(_query, "nearCoordinate");
    _query = removeFilter(_query, "currentCoordinate");
  }

  if (category && tranformSelected(category) !== "ALL") {
    _query = addFilter(_query, "category", tranformSelected(category));
  } else {
    _query = removeFilter(_query, "category");
  }

  if (currentLocation) {
    if (isTopKudos) {
      _query.sort = "likes";
    } else {
      delete _query.sort;
    }
  }

  return _query;
};

export const addFilter = (query, name, value) => {
  let _filter = query.filter
    .split(",")
    .filter(x => x !== name)
    .join(",");
  let _query = {
    ...query,
    filter: `${_filter},${name}`,
    [name]: value
  };

  return _query;
};

export const removeFilter = (query, name) => {
  let _filter = query.filter
    .split(",")
    .filter(x => x !== name)
    .join(",");
  let _query = {
    ...query,
    filter: _filter
  };

  delete _query[name];

  return _query;
};

export const initQuery: QueryServiceProps = _initQuery();

const _initQuerySearch = () => {
  var _query: QueryServiceProps = {
    filter: "isApproved",
    isApproved: true,
    limit: PageSize,
    skip: 0,
    search: "name,address1,address2,city,state,zip,serviceSummary,category,age"
  };

  if (currentLocation && currentLocation !== "undefined") {
    _query = addFilter(
      _query,
      "nearCoordinate",
      `${JSON.parse(currentLocation).longitude}|${
        JSON.parse(currentLocation).latitude
      }`
    );
    _query = addFilter(
      _query,
      "currentCoordinate",
      `${JSON.parse(currentLocation).longitude}|${
        JSON.parse(currentLocation).latitude
      }`
    );
  } else {
    _query = removeFilter(_query, "nearCoordinate");
    _query = removeFilter(_query, "currentCoordinate");
  }

  return _query;
};

export const initQuerySearch: QueryServiceProps = _initQuerySearch();
