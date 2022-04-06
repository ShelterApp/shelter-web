import React, { useEffect } from "react";
import useToggle from "hooks/useToggle";
import StyledInput from "./components/StyledInput";
import InputContainer from "./components/InputContainer";
import EyeIcon from "./components/EyeIcon";
// import WarningIcon from './components/WarningIcon';
import QuestionIcon from "./components/QuestionIcon";
import Label from "./components/Label";
import Hint from "./components/Hint";
import Italic from "./components/Italic";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import styles from "./styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MdCheckboxOutline from "react-ionicons/lib/MdCheckboxOutline";
import NativeSelect from "@material-ui/core/NativeSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enforceFormat, formatToPhone } from "asset/javascripts/input_phone";
import TextField from "@material-ui/core/TextField";
import $ from "jquery";
import clsx from "clsx";
import Select from "react-select";
// import 'react-select/dist/css/react-select.css';

interface optionType {
  label: string;
  value: any;
}

interface InputProps {
  label?: string | any;
  type: string;
  fullWidth?: boolean | undefined;
  placeholder?: string;
  value?: any;
  changeHandler?: Function;
  name: string;
  validate?: any;
  error?: any;
  hint?: string;
  show_info?: boolean | undefined;
  required?: boolean | undefined;
  checked?: boolean | false;
  options?: any | [];
  disabled?: boolean | false;
}

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "none",
    borderBottom: "1px solid #dddddd",
    boxShadow: "none"
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: "none"
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    paddingLeft: "0"
  })
};

const Input = React.memo((props: InputProps) => {
  let {
    label,
    type,
    fullWidth,
    placeholder,
    value,
    changeHandler,
    name,
    validate,
    // error,
    hint,
    show_info,
    required,
    checked,
    options,
    disabled
  } = props;
  const classes = styles();
  const [isShowPassword, toggle] = useToggle(false);
  const renderType = (type: string) => {
    switch (type) {
      case "password":
        return isShowPassword ? "text" : "password";
      case "string":
        return "string";
      case "number":
        return "number";
      case "date":
        return "date";
      case "time":
        return "time";
      default:
        return "text";
    }
  };
  const [currentValue, setCurrentValue] = React.useState("");

  const checkbox = () => {
    return (
      <InputContainer className={classes.rootCheckbox}>
        {type === "checkbox" && (
          <FormControlLabel
            key={name}
            control={
              <Checkbox
                checkedIcon={
                  <MdCheckboxOutline color="#6A46E5" fontSize="26px" />
                }
                name={name}
                checked={checked}
                onChange={e => {
                  if (typeof changeHandler !== "function") return null;
                  changeHandler(e.target.checked);
                }}
              />
            }
            label={<Label className={classes.labelCheckbox}>{label}</Label>}
          />
        )}
      </InputContainer>
    );
  };

  const selectInput = () => {
    return (
      <React.Fragment>
        {type === "select" && options && (
          <>
            <Label>{label}</Label>
            <NativeSelect
              value={value}
              onChange={e => {
                if (typeof changeHandler !== "function") return null;
                changeHandler(e.target.value);
              }}
              disableUnderline
              name={name}
              className={classes.rootSelect}
              inputProps={{ "aria-label": name }}
            >
              {options &&
                options.map((obj, i) => (
                  <option key={i} value={obj.value}>
                    {obj.label}
                  </option>
                ))}
            </NativeSelect>
          </>
        )}
      </React.Fragment>
    );
  };

  const select2Input = () => {
    return (
      <React.Fragment>
        {type === "select2" && options && (
          <>
            <Label>{label}</Label>
            <Select
              value={value}
              onChange={e => {
                if (typeof changeHandler !== "function") return null;
                changeHandler(e);
              }}
              name={name}
              className={classes.rootSelect2}
              placeholder={placeholder}
              options={options}
              styles={customStyles}
            />
          </>
        )}
      </React.Fragment>
    );
  };

  const normalInput = () => {
    return (
      <React.Fragment>
        <Label>
          {Boolean(required) && <Italic>* </Italic>}
          {label}
          {Boolean(show_info) && <QuestionIcon />}
        </Label>
        <InputContainer>
          {type === "textarea" ? (
            <TextareaAutosize
              className={classes.textarea}
              rowsMax={5}
              rowsMin={5}
              onChange={e => {
                if (typeof changeHandler !== "function") return null;
                changeHandler(e.target.value);
              }}
              value={value}
              placeholder={placeholder}
              name={name}
              ref={validate}
            />
          ) : type === "phonenumber" ? (
            <TextField
              className={clsx(classes.rootInput, classes.inputPhone)}
              name={name}
              placeholder={placeholder}
              value={value}
              inputProps={{
                maxLength: "14"
              }}
              InputProps={{
                disableUnderline: true
              }}
              inputRef={validate}
              fullWidth={fullWidth}
              onChange={e => {
                setCurrentValue(e.target.value);
                if (typeof changeHandler !== "function") return null;
                changeHandler(e.target.value);
              }}
            />
          ) : (
            <>
              <StyledInput
                name={name}
                type={renderType(type)}
                fullWidth={fullWidth}
                placeholder={placeholder}
                // error={Boolean(error)}
                disabled={disabled}
                value={value}
                inputRef={validate}
                onChange={e => {
                  setCurrentValue(e.target.value);
                  if (typeof changeHandler !== "function") return null;
                  changeHandler(e.target.value);
                }}
              />
              {type === "password" && !!currentValue && (
                <EyeIcon clickHandler={toggle} isEyeClose={isShowPassword} />
              )}
              <Hint>{hint}</Hint>
            </>
          )}
        </InputContainer>
      </React.Fragment>
    );
  };

  const timePickerInput = () => {
    return (
      <>
        <Label>{label}</Label>
        <div className={classes.rootInput}>
          <DatePicker
            selected={value}
            onChange={e => {
              if (typeof changeHandler !== "function") return null;
              changeHandler(e);
            }}
            name={name}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={5}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </div>
      </>
    );
  };

  const datePickerInput = () => {
    return (
      <>
        <Label>{label}</Label>
        <div className={classes.rootInput}>
          <DatePicker
            selected={value}
            onChange={e => {
              if (typeof changeHandler !== "function") return null;
              changeHandler(e);
            }}
            name={name}
            dateFormat="MM-dd-yyyy"
          />
        </div>
      </>
    );
  };

  const renderInput = () => {
    switch (type) {
      case "checkbox":
        return checkbox();
      case "select":
        return selectInput();
      case "select2":
        return select2Input();
      case "time":
        return timePickerInput();
      case "date":
        return datePickerInput();
      default:
        return normalInput();
    }
  };

  useEffect(() => {
    if (type === "phonenumber") {
      const inputElement = $(`input[name='${name}']`)[0];
      inputElement.addEventListener("keydown", enforceFormat);
      inputElement.addEventListener("keyup", formatToPhone);
    }
    // eslint-disable-next-line
  }, []);

  return <>{renderInput()}</>;
});

export default Input;
