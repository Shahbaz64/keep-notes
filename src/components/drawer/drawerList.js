import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

export const listItems = [
  {
    icon: <LightbulbOutlinedIcon />,
    text: "Notes",
    path: "/home",
  },
  {
    icon: <ModeEditOutlinedIcon />,
    text: "Edit Labels",
  },
  {
    icon: <DeleteOutlinedIcon />,
    text: "Bin",
    path: "/bin",
  },
];
