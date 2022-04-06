import React, { useState } from "react";
import { ServiceProps } from "common/";
import styles from "./styles";
import clsx from "clsx";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { tranformSchedulesForm } from "common/helpers";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import SubmitButton from "components/Button";
import { useTranslation } from "react-i18next";
import Checkbox from "@material-ui/core/Checkbox";
import MdCheckboxOutline from "react-ionicons/lib/MdCheckboxOutline";

interface MSServiceProps {
  data: ServiceProps;
  openUrl: Function;
  onDelete: Function;
  handleOpenAlert: Function;
  approval?: boolean | false;
  handleCheck?: Function;
}

const MSService = React.memo((props: MSServiceProps) => {
  const { data, openUrl, handleOpenAlert, approval } = props;
  const translate = useTranslation().t;
  const {
    name,
    description,
    contactEmail,
    address1,
    city,
    state,
    zip,
    phone,
    website,
    type,
    serviceSummary,
    category,
    age,
    schedules,
    isApproved,
    id,
    isContact,
    userEmail
  } = data;
  const address = { address1, city, state, zip };
  const lastAddress = Object.keys(address).map(ad => `${address[ad]}`);
  const lastSchedules = schedules && tranformSchedulesForm(schedules);

  const classes = styles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };
  const [isCheck, setIsCheck] = useState(false);
  const handleCheck = () => {
    setIsCheck(!isCheck);
    props.handleCheck && props.handleCheck(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    handleOpenAlert(data.id);
  };

  const handleEdit = () => {
    setAnchorEl(null);
    openUrl(`/services/${data.id}/edit`);
  };

  return (
    <>
      <div className={classes.borderItem}>
        <div className={classes.name}>
          <p>{name}</p>
          {approval ? (
            <Checkbox
              className={classes.p0}
              checkedIcon={
                <MdCheckboxOutline color="#6A46E5" fontSize="26px" />
              }
              name={""}
              checked={isCheck}
              onChange={e => {
                if (typeof handleCheck !== "function") return null;
                handleCheck();
              }}
            />
          ) : (
            <div onClick={handleClick}>
              <MoreHorizIcon fontSize="small" />
            </div>
          )}
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit}>Edit Service</MenuItem>
            <MenuItem onClick={handleDelete}>Delete Service</MenuItem>
          </Menu>
        </div>
        {!!userEmail && <p>Added By: {userEmail}</p>}
        <p>Address: {lastAddress.join(", ")}</p>
        <p>Phone: {phone}</p>
        <p>Email: {contactEmail}</p>
        <p>Website: {website}</p>
        <p>Services: {type.join(", ")}</p>
        <p>Service Type: {serviceSummary}</p>
        <p>Categories: {category.join(", ")}</p>
        <p>Age Group: {age}</p>
        {lastSchedules.length > 0 && (
          <>
            <p>Schedule:</p>
            {lastSchedules.map((s, idx) => (
              <p key={idx}>
                <span className={classes.w30}>{s.title}</span>
                <span className={classes.w70}>{s.date}</span>
              </p>
            ))}
          </>
        )}
        {isContact && <p>Please contact this service for hours</p>}
        <br />
        <p>Comment: {description}</p>
        {!approval && (
          <p
            className={clsx({
              [classes.textApproved]: isApproved,
              [classes.textNotApproved]: !isApproved
            })}
          >
            {translate(
              isApproved
                ? "THIS_SERVICE_IS_APPROVED"
                : "THIS_SERVICE_IS_NOT_APPROVED"
            )}
          </p>
        )}
        <Grid
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
          container
          spacing={1}
          direction="row"
        >
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <ButtonGroup fullWidth>
              <SubmitButton
                variant="contained"
                onClick={() => openUrl(`/services/${data.id}/edit`)}
              >
                {translate("EDIT_SERVICE")}
              </SubmitButton>
            </ButtonGroup>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <ButtonGroup fullWidth>
              <SubmitButton
                onClick={() => handleOpenAlert(data.id)}
                variant="contained"
                className={classes.bgRed}
              >
                {translate("DELETE_SERVICE")}
              </SubmitButton>
            </ButtonGroup>
          </Grid>
        </Grid>
      </div>
    </>
  );
});

export default MSService;
