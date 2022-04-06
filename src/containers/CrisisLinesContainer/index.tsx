import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import { CrisisLine } from "@shelter/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import CrisisLineItem from "components/CrisisLineItem";
import { reducerType } from "redux/reducers";
import { useSelector, useDispatch } from "react-redux";
import Alert from "components/Alert";
import { DELETE_CRISISLINE_REQUEST } from "redux/reducers/service/actionTypes";
interface CrisisLinesProps {
  openUrl: Function;
  crisis_lines: CrisisLine[];
  loadingMore: boolean;
  loadmoreFunction: Function;
  canLoadmore: boolean;
}

const CrisisLinesContainer = React.memo((props: CrisisLinesProps) => {
  const {
    crisis_lines,
    loadmoreFunction,
    canLoadmore,
    loadingMore,
    openUrl
  } = props;
  const classes = styles();
  const dispatch = useDispatch();
  const current_user = useSelector(
    (state: reducerType) => state.auth.current_user
  );
  const handleWindowScroll = () => {
    const bottomOfWindow =
      window.scrollY + window.innerHeight >= document.body.scrollHeight - 500;
    if (bottomOfWindow && !loadingMore && canLoadmore) {
      loadmoreFunction();
    }

    return;
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedLine, setSelectedLine] = useState();

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setSelectedLine(null);
  };

  const handleOpenAlert = id => {
    setOpenAlert(true);
    setSelectedLine(id);
  };

  const handleClickYes = () => {
    selectedLine && onDelete(selectedLine);
    handleCloseAlert();
  };

  const onDelete = id => {
    dispatch({
      type: DELETE_CRISISLINE_REQUEST,
      id: id
    });
  };

  return (
    <>
      <Container className={classes.root}>
        {crisis_lines.map((crisis_line, index) => (
          <CrisisLineItem
            key={index}
            crisis_line={crisis_line}
            isAdmin={current_user.isAdmin}
            openUrl={openUrl}
            handleOpenAlert={handleOpenAlert}
          />
        ))}
        {canLoadmore && (
          <Container className={classes.textCenter}>
            <CircularProgress
              style={{ width: 25, height: 25 }}
              className={classes.loadmore}
            />
          </Container>
        )}
        <Alert
          title={"Do you want to delete this Crisisline?"}
          open={openAlert}
          handleClose={handleCloseAlert}
          handleClickYes={handleClickYes}
        />
      </Container>
    </>
  );
});

export default CrisisLinesContainer;
