import PropTypes from "prop-types";
import React, { useState } from "react";
import { addLabel } from "store";
import Drawer from "components/drawer/drawer";
import AppBar from "components/appbar/appbar";
import { useDispatch, useSelector } from "react-redux";
import LabelDialog from "components/label-dialog/labelDialog";
import SideBar from "components/drawer/side-bar/sideIconBar";
import userHelper from "utils/helpers/user.helper";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const labels = useSelector((state) => state.notesReducer.labels);
  const userId = useSelector((state) => state.authReducer.user.userId);
  const [isOpenLabelDialog, setIsOpenLabelDialog] = useState(false);

  const handleCloseLabelDialog = () => {
    setIsOpenLabelDialog(false);
  };

  const signOutHandler = () => {
    userHelper.SIGNOUTUSER();
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
      <SideBar handleDialog={openDialogHandler} />
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
