import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import styles from "../styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import IconButton from "@material-ui/core/IconButton";
import { Service } from "@shelter/core";

interface InputBedsProps {
  data: Service;
  updateBeds: Function;
  alertErrors: Function;
}

const InputBeds = React.memo((props: InputBedsProps) => {
  const classes = styles();
  const { data, updateBeds, alertErrors } = props;
  const [availableBeds, setAvailableBeds] = useState<number>(
    data.availableBeds || 0
  );
  const onChange = e => {
    if (e) {
      setAvailableBeds(Number(e));
      return;
    }
    setAvailableBeds(0);
  };
  const increase = () => {
    setAvailableBeds(availableBeds + 1);
  };
  const decrease = () => {
    availableBeds > 0 && setAvailableBeds(availableBeds - 1);
  };

  useEffect(() => {
    if (availableBeds !== data.availableBeds) {
      if (data.totalBeds < availableBeds) {
        setAvailableBeds(data.availableBeds || 0);
        alertErrors();
      } else {
        updateBeds({ id: data.id, total: availableBeds });
      }
    }
    // eslint-disable-next-line
  }, [availableBeds]);

  return (
    <div className={classes.root}>
      <label className={classes.name}>{data.name}</label>
      <div className={classes.action}>
        <TextField
          type="number"
          className={classes.inputBed}
          InputProps={{
            disableUnderline: true
          }}
          value={availableBeds.toString()}
          onChange={e => onChange(e.target.value)}
        />
        <IconButton className={classes.p0} onClick={() => increase()}>
          <AddCircleIcon className={classes.icon} />
        </IconButton>
        <IconButton className={classes.p0} onClick={() => decrease()}>
          <RemoveCircleIcon className={classes.icon} />
        </IconButton>
      </div>
    </div>
  );
});

export default InputBeds;
