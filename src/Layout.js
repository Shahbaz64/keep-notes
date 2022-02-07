import AppBar from "components/appbar/appbar";
import Drawer from "components/drawer/drawer";
import InputBar from "components/add-note/input-bar/inputBar";
import InputForm from "components/add-note/input-form/inputForm";
import LabelDialog from "components/label-dialog/labelDialog";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser, showLabelDialog, addNote, addLabel } from "store";

const drawerWidth = 240;

const useStyles = makeStyles({
  shiftTextLeft: {
    marginLeft: "0px",
  },
  shiftTextRight: {
    marginLeft: drawerWidth,
  },
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const labels = useSelector((state) => state.notesReducer.labels);
  const userId = useSelector((state) => state.notesReducer.userId);
  const isOpenDrawer = useSelector((state) => state.toggleReducer.isOpenDrawer);
  const isOpenLabelDialog = useSelector(
    (state) => state.toggleReducer.isOpenLabelDialog
  );
  const isOpenInputBar = useSelector(
    (state) => state.toggleReducer.isOpenInputBar
  );

  const signOutHandler = () => {
    dispatch(signOutUser());
  };

  const openDialogHandler = () => {
    dispatch(showLabelDialog());
  };

  const addNotesHandler = (title, text, color, labels) => {
    dispatch(addNote({ userId, title, text, color, labels }));
  };

  const addLabelHandler = (label) => {
    dispatch(addLabel({ userId, label }));
  };

  return (
    <div>
      <AppBar handleSignOut={signOutHandler} />
      <Drawer handleDialog={openDialogHandler} labels={labels} />
      <div
        className={
          isOpenDrawer ? classes.shiftTextRight : classes.shiftTextLeft
        }
      >
        {isOpenInputBar ? (
          <InputBar />
        ) : (
          <InputForm handleAddNote={addNotesHandler} />
        )}
      </div>
      <LabelDialog
        open={isOpenLabelDialog}
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
