import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "components/appbar/appbar";
import Drawer from "components/drawer/drawer";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser, addLabel } from "store";
import LabelDialog from "components/label-dialog/labelDialog";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const labels = useSelector((state) => state.notesReducer.labels);
  const userId = useSelector((state) => state.authReducer.user.userId);
  const [isOpenLabelDialog, setIsOpenLabelDialog] = useState(false);

  const handleCloseLabelDialog = () => {
    setIsOpenLabelDialog(false);
  };

  const signOutHandler = () => {
    dispatch(signOutUser());
  };

  const openDialogHandler = () => {
    setIsOpenLabelDialog(true);
  };

  const addLabelHandler = (label) => {
    dispatch(addLabel({ userId, label }));
  };

  return (
    <div>
      <AppBar handleSignOut={signOutHandler} />
      <Drawer handleDialog={openDialogHandler} labels={labels} />
      <LabelDialog
        open={isOpenLabelDialog}
        handleClose={handleCloseLabelDialog}
        labels={labels}
        handleLabelAdd={addLabelHandler}
      />
      <div>{children}</div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
