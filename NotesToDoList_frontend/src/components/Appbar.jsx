import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";


export default function SimpleAppBar() {
  return (
    <AppBar position="static">
      <Toolbar component="div" sx={{backgroundColor: "black"}}>
        <Typography variant="h5" >
          Notițe
        </Typography>
      </Toolbar>
    </AppBar>
  );
}