import React, { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import imgLoading from "asset/img/loading.gif";
import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector, useDispatch } from "react-redux";
import { reducerType } from "redux/reducers";
import {
  GET_SERVICES_REDUCER,
  GET_CRITICAL_HEADER
} from "redux/reducers/service/actionTypes";
import { searchCityZip } from "api/services/searchService";
import { addFilter, removeFilter } from "common/";

interface SearchBarProps {
  isOpenSearch: boolean;
  clickOpenSearch: Function;
}

const SearchBar = React.memo((props: SearchBarProps) => {
  const dispatch = useDispatch();
  const queryData: any = useSelector(
    (state: reducerType) => state.service.queryData
  );
  const classes = styles();
  const { clickOpenSearch, isOpenSearch } = props;
  const [cities, setCities] = useState([]);
  const [zips, setZips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const currentLocation = useSelector(
    (state: reducerType) => state.service.currentLocation
  );
  const hasData = cities.length > 0 || zips.length > 0;
  const isHaveCurrentLocation =
    !!currentLocation &&
    currentLocation.latitude !== 0 &&
    currentLocation.longitude !== 0;

  const onChange = text => {
    setValue(text);
    if (text) {
      setLoading(true);
    } else {
      setCities([]);
      setZips([]);
      setLoading(false);
    }
  };

  const useDebounce = (_value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(_value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(_value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }, [_value, delay]);

    return debouncedValue;
  };

  const debouncedSearchTerm = useDebounce(value, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchCityZip(debouncedSearchTerm).then(data => {
        data && data.cities && setCities(data.cities);
        data && data.zips && setZips(data.zips);
        setLoading(false);
      });
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (isOpenSearch) {
      let _val = JSON.parse(sessionStorage.getItem("@shelter_location_value"));
      if (_val) {
        setValue(_val);
      }
      console.log("-=-=-=-=-=-=");
    }
  }, [isOpenSearch]);

  const onClear = () => {
    setValue("");
    sessionStorage.removeItem("@shelter_location_value_chatbox");
    sessionStorage.removeItem("@shelter_location_value");
    sessionStorage.removeItem("@shelter_locationMapview");
    let _query = queryData;
    console.log(_query);
    _query = removeFilter(_query, "zip");
    _query = removeFilter(_query, "state");
    _query = removeFilter(_query, "city");
    console.log(_query);
    dispatch({
      type: GET_SERVICES_REDUCER,
      params: _query
    });

    dispatch({
      type: GET_CRITICAL_HEADER,
      params: _query
    });
  };

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    clickOpenSearch(open);
  };

  const setCurrentLocation = () => {
    setValue("Current Location");
    sessionStorage.setItem("@shelter_block_location", JSON.stringify(false));
    sessionStorage.setItem(
      "@shelter_location_value",
      JSON.stringify("Current Location")
    );

    let _query = queryData;
    _query = removeFilter(_query, "zip");
    _query = removeFilter(_query, "state");
    _query = removeFilter(_query, "city");

    dispatch({
      type: GET_SERVICES_REDUCER,
      params: _query
    });

    dispatch({
      type: GET_CRITICAL_HEADER,
      params: _query
    });

    clickOpenSearch(false);
    sessionStorage.setItem(
      "@shelter_locationMapview",
      JSON.stringify({
        lat: currentLocation.latitude,
        lng: currentLocation.longitude
      })
    );
  };

  const setLocation = (text, filter, state = null, location = null) => {
    sessionStorage.setItem("@shelter_block_location", JSON.stringify(false));
    sessionStorage.setItem("@shelter_location_value", JSON.stringify(text));
    sessionStorage.setItem(
      "@shelter_location_value_chatbox",
      JSON.stringify(text)
    );

    let _query = queryData;
    _query = removeFilter(_query, "zip");
    _query = removeFilter(_query, "state");
    _query = removeFilter(_query, "city");
    _query = addFilter(_query, filter, text);

    if (state) {
      _query = addFilter(_query, "state", state);
    }

    dispatch({
      type: GET_SERVICES_REDUCER,
      params: _query
    });

    dispatch({
      type: GET_CRITICAL_HEADER,
      params: _query
    });

    clickOpenSearch(false);
    sessionStorage.setItem(
      "@shelter_locationMapview",
      JSON.stringify({
        lat: location.coordinates[1],
        lng: location.coordinates[0]
      })
    );
  };

  const list = () => (
    <div className={clsx(classes.fullList)}>
      <List className={clsx(classes.rootList, classes.shrink0)}>
        <ListItem className={classes.rootListItem}>
          <Typography variant="h6" className={classes.title}>
            Choose City/Zip for Services
          </Typography>
          <IconButton
            onClick={toggleDrawer(false)}
            className={classes.btnClose}
          >
            <CancelIcon />
          </IconButton>
        </ListItem>
      </List>
      <List className={clsx(classes.pb0, classes.shrink0)}>
        <ListItem className={clsx(classes.rootListItem, classes.borderBot)}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={value}
              onChange={e => onChange(e.target.value)}
              placeholder="Search City Name or Zip Code"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
            <div className={classes.loadingIcon}>
              {loading && (
                <img src={imgLoading} alt="..." width={30} height={30} />
              )}
            </div>
          </div>
          <div className={classes.clearIcon} onClick={() => onClear()}>
            {value && (
              <IconButton className={classes.p0}>
                <CloseIcon />
              </IconButton>
            )}
          </div>
        </ListItem>
        {isHaveCurrentLocation && (
          <ListItem
            onClick={setCurrentLocation}
            className={clsx(classes.rootListItem, classes.borderBot)}
          >
            <p className={classes.location}>Current Location</p>
          </ListItem>
        )}
      </List>
      {hasData && (
        <List className={clsx(classes.pt0, classes.listOp)}>
          {cities.map(city => (
            <ListItem
              key={city.id}
              onClick={() =>
                setLocation(city.name, "city", city.state, city.location)
              }
              className={clsx(classes.rootListItem, classes.borderBot)}
            >
              <p className={classes.location}>{city.search}</p>
            </ListItem>
          ))}
          {zips.map(zip => (
            <ListItem
              key={zip.id}
              onClick={() => setLocation(zip.code, "zip", null, zip.location)}
              className={clsx(classes.rootListItem, classes.borderBot)}
            >
              <p className={classes.location}>{zip.code}</p>
            </ListItem>
          ))}
        </List>
      )}
      {value !== "" && value !== "Current Location" && !loading && !hasData && (
        <List>
          <ListItem className={classes.rootListItem}>
            <p className={classes.noMatch}>
              <i>
                No matching results found. Please enter a diffenrent location.
              </i>
            </p>
          </ListItem>
        </List>
      )}
    </div>
  );

  return (
    <React.Fragment key={"bottom"}>
      <Drawer
        anchor={"bottom"}
        open={isOpenSearch}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </React.Fragment>
  );
});

export default SearchBar;
