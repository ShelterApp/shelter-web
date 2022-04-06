import React, { lazy } from "react";

import { GET_SERVICE_REQUEST } from "redux/reducers/ServiceDetail/actionTypes";
import { push, goBack } from "connected-react-router";

import { reducerType } from "redux/reducers";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ServiceProps } from "common/";
import { ICoords } from "redux/reducers/service";

import HeaderBarSub from "components/HeaderBarSub";
import Loading from "components/Loading";
import ModalFlag from "components/ModalFlag";
import ModalReport from "components/ModalReport";
import ServiceDetailContainer from "containers/ServiceDetailContainer";
import {
  CREATE_FEEDBACK_SERVICE_REQUEST,
  CREATE_FEEDBACK_REQUEST
} from "redux/reducers/feedback/actionTypes";
import { useTranslation } from "react-i18next";

const GridFullHeight = lazy(() => import("components/GridFullHeight"));
const GridFormContainer = lazy(() => import("components/GridFormContainer"));

interface ServiceDetailProps {
  dispatch: Dispatch;
  data: ServiceProps;
  loading: boolean;
  match: any;
  currentLocation: ICoords;
  services: ServiceProps[];
}

const mapStateToProps = (state: reducerType) => {
  return {
    data: state.serviceDetail.data,
    loading: state.service.loading,
    currentLocation: state.service.currentLocation,
    services: state.service.data
  };
};

const ServiceDetail = React.memo((props: ServiceDetailProps) => {
  const { dispatch, loading, data, match, currentLocation } = props;
  const [openFlag, setOpenFlag] = React.useState(false);
  const [openReport, setOpenReport] = React.useState(false);
  const translate = useTranslation().t;
  const [formFlag, setFormFlag] = React.useState({});
  const [serviceNameFlag, setServiceNameFlag] = React.useState("");
  React.useEffect(() => {
    if (!match.params.id) return;
    dispatch({
      type: GET_SERVICE_REQUEST,
      id: match.params.id
    });
    // eslint-disable-next-line
  }, []);

  const openUrl = url => {
    dispatch(push(url));
  };

  const goBackUrl = url => {
    sessionStorage.setItem("@shelterGoBack", JSON.stringify(true));
    dispatch(goBack());
  };

  const onClickFlag = service => {
    setFormFlag({
      type: "SERVICE",
      service: service.id,
      subject: service.name || "Shelter Service"
    });
    setServiceNameFlag(service.name);
    setOpenFlag(true);
  };

  const onClickReport = service => {
    setFormFlag({
      type: "SERVICE",
      service: service.id,
      subject: service.name
    });
    setOpenReport(true);
  };

  const submitFormReport = data => {
    dispatch({
      type: CREATE_FEEDBACK_REQUEST,
      form: {
        ...data,
        ...formFlag
      },
      message: translate("SENT_FEEDBACK_SUCCESSFULLY")
    });
    setOpenReport(false);
  };

  const submitForm = data => {
    dispatch({
      type: CREATE_FEEDBACK_SERVICE_REQUEST,
      form: {
        ...data,
        ...formFlag
      },
      message: translate("SENT_FEEDBACK_SUCCESSFULLY")
    });
    setOpenFlag(false);
  };

  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight container>
          <HeaderBarSub openUrl={goBackUrl} favorite serviceId={data.id} />
          {loading ? (
            <Loading />
          ) : (
            <>
              <ServiceDetailContainer
                currentLocation={currentLocation}
                onClickFlag={onClickFlag}
                onClickReport={onClickReport}
                data={data}
                openUrl={openUrl}
              />
            </>
          )}
          <ModalFlag
            serviceNameFlag={serviceNameFlag}
            currentLocation={currentLocation}
            submitForm={submitForm}
            open={openFlag}
            setOpen={setOpenFlag}
          />
          <ModalReport
            submitForm={submitFormReport}
            open={openReport}
            setOpen={setOpenReport}
          />
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(ServiceDetail);
