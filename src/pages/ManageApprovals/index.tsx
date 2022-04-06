import React, { useState, useEffect } from "react";
import { push } from "connected-react-router";
import { reducerType } from "redux/reducers";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import HeaderBarSub from "components/HeaderBarSub";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import GridFullHeight from "components/GridFullHeight";
import GridFormContainer from "components/GridFormContainer";
import {
  GET_SERVICES_REDUCER,
  DELETE_SERVICE_REQUEST
} from "redux/reducers/service/actionTypes";
import Loading from "components/Loading";
import MSService from "containers/MSServiceContainer";
import { ServiceProps, searchByName } from "common/";
import Alert from "components/Alert";
import { ServiceType } from "@shelter/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import PButton from "components/Button";
import { approveServices, removeServices } from "api/services/updateShelter";

const tranformType = res => {
  return Object.keys(ServiceType).reduce((previ, currentValue) => {
    const found = res.filter(
      re => re.type && re.type.includes(ServiceType[currentValue])
    );
    return {
      ...previ,
      [currentValue]: found
    };
  }, {});
};

interface ManageApprovalsProps {
  dispatch: Dispatch;
  loading: boolean;
  services: ServiceProps[];
  loadingMore: boolean;
}

const mapStateToProps = (state: reducerType) => {
  return {
    loading: state.service.loading,
    services: state.service.data
  };
};
const initIDs = () => {
  return Object.keys(ServiceType).reduce((previ, currentValue) => {
    return {
      ...previ,
      [currentValue]: []
    };
  }, {});
};

const ManageApprovals = React.memo((props: ManageApprovalsProps) => {
  const { dispatch, loading, services } = props;
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedService, setSelectedService] = useState();
  const [idsSelected, setIdsSelected] = useState(initIDs());
  const [groupServices, setGroupServices] = useState(initIDs);
  const [tempGroupServices, setTempGroupServices] = useState(initIDs);
  const classes = styles();

  const openUrl = url => {
    dispatch(push(url));
  };

  useEffect(() => {
    const obj = {
      filter: "isApproved",
      isApproved: false
    };

    dispatch({
      type: GET_SERVICES_REDUCER,
      params: obj,
      notApproved: true
    });
    // eslint-disable-next-line
  }, []);

  const onDelete = id => {
    dispatch({
      type: DELETE_SERVICE_REQUEST,
      id: id
    });
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setSelectedService(null);
  };

  const handleOpenAlert = id => {
    setOpenAlert(true);
    setSelectedService(id);
  };

  const handleClickYes = () => {
    selectedService && onDelete(selectedService);
    handleCloseAlert();
  };

  const handleCheck = (type, id) => {
    let _value = idsSelected[type];
    if (_value.includes(id)) {
      _value = [..._value].filter(x => x !== id);
    } else {
      _value = [..._value, id];
    }
    setIdsSelected({
      ...idsSelected,
      [type]: _value
    });
  };

  const handleApproveServices = async type => {
    if (idsSelected[type].length > 0) {
      await approveServices({
        services: idsSelected[type]
      });
      window.location.reload();
    }
  };

  const handleApproveAllServices = async type => {
    if (groupServices[type].length > 0) {
      await approveServices({
        services: groupServices[type].map(s => s.id)
      });
      window.location.reload();
    }
  };

  const handleDeleteSelected = async type => {
    if (idsSelected[type].length > 0) {
      await removeServices({
        services: idsSelected[type]
      });
      window.location.reload();
    }
  };

  const handleSearch = keyword => {
    const res = searchByName(keyword, services);
    setGroupServices(tranformType(res));
  };

  const handleCloseSearch = () => {
    setGroupServices(tempGroupServices);
  };

  useEffect(() => {
    setGroupServices(tranformType(services));
    setTempGroupServices(tranformType(services));
  }, [services]);

  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight container>
          <HeaderBarSub
            backUrl={"/"}
            openUrl={openUrl}
            name="Manage Approvals"
            handleCloseSearch={handleCloseSearch}
            handleSearch={handleSearch}
            isSearch
          />
          <Container className={classes.root}>
            {loading ? (
              <Loading />
            ) : (
              <>
                {Object.keys(ServiceType).map((type, index) => (
                  <Container key={index} className={classes.group}>
                    <p className={classes.title}>{type}</p>
                    {groupServices[type].map(s => (
                      <MSService
                        handleOpenAlert={handleOpenAlert}
                        data={s}
                        key={s.id}
                        onDelete={onDelete}
                        openUrl={openUrl}
                        approval={true}
                        handleCheck={id => handleCheck(type, id)}
                      />
                    ))}
                    <Grid
                      style={{ paddingTop: "10px", paddingBottom: "10px" }}
                      container
                      spacing={1}
                      direction="row"
                    >
                      <Grid item xs={4} sm={4} md={4} lg={4}>
                        <ButtonGroup fullWidth>
                          <PButton
                            className={classes.btnAction}
                            variant="contained"
                            onClick={() => handleApproveServices(type)}
                            disabled={groupServices[type].length === 0}
                          >
                            Approve Selected
                          </PButton>
                        </ButtonGroup>
                      </Grid>
                      <Grid item xs={4} sm={4} md={4} lg={4}>
                        <ButtonGroup fullWidth>
                          <PButton
                            className={classes.btnAction}
                            variant="contained"
                            onClick={() => handleApproveAllServices(type)}
                            disabled={groupServices[type].length === 0}
                          >
                            Approve All
                          </PButton>
                        </ButtonGroup>
                      </Grid>
                      <Grid item xs={4} sm={4} md={4} lg={4}>
                        <ButtonGroup fullWidth>
                          <PButton
                            className={classes.btnAction}
                            variant="contained"
                            onClick={() => handleDeleteSelected(type)}
                            disabled={groupServices[type].length === 0}
                          >
                            Delete Selected
                          </PButton>
                        </ButtonGroup>
                      </Grid>
                    </Grid>
                  </Container>
                ))}
                <Alert
                  title={"Do you want to delete this service?"}
                  open={openAlert}
                  handleClose={handleCloseAlert}
                  handleClickYes={handleClickYes}
                />
              </>
            )}
          </Container>
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(ManageApprovals);
