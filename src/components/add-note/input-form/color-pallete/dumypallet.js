// import React from "react";
// import { nanoid } from "nanoid";
// import PropTypes from "prop-types";
// import { Grid, Tooltip, Box } from "@mui/material";
// import { lightBgColors } from "components/add-note/input-form/color-pallete/lightBgColors";
// import { darkBgColors } from "components/add-note/input-form/color-pallete/bgColors";
// import InvertColorsOffOutlinedIcon from "@mui/icons-material/InvertColorsOffOutlined";
// import {
//   useStyles,
//   style,
// } from "components/add-note/input-form/color-pallete/colorPallete.style";
// import { useSelector } from "react-redux";

// const ColorPallete = ({ getColor }) => {
//   const classes = useStyles();
//   const mode = useSelector((state) => state.toggleReducer.mode);

//   return (
//     <Grid container direction="row">
//       <Tooltip title="Default">
//         <Box
//           onClick={() => getColor("#FFFFFF")}
//           className={classes.avatar}
//           sx={{ ...style.box }}
//         >
//           <InvertColorsOffOutlinedIcon fontSize="small" />
//         </Box>
//       </Tooltip>
//       {(mode ? darkBgColors : lightBgColors).map((bgColor) => {
//         return (
//           <Tooltip key={nanoid()} title={bgColor.title}>
//             <Box
//               onClick={() => getColor(bgColor.color)}
//               sx={{
//                 ...style.box,
//                 backgroundColor: `${bgColor.color}`,
//               }}
//             ></Box>
//           </Tooltip>
//         );
//       })}
//     </Grid>
//   );
// };

// ColorPallete.propTypes = {
//   getColor: PropTypes.func.isRequired,
// };

// export default ColorPallete;
