import React from "react";
import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { listItems } from "components/drawer/drawerList";
import { useStyles } from "components/drawer/drawer.style";

const Drawer = () => {
  const isOpenDrawer = useSelector((state) => state.toggleReducer.isOpenDrawer);
  const classes = useStyles();
  return (
    <MuiDrawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isOpenDrawer}
    >
      <List>
        {listItems.map((item) => (
          <ListItem button key={uuid()}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </ListItem>
        ))}
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
