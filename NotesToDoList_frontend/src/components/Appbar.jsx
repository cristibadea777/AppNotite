import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import {MenuItem, Select } from "@mui/material"

export default function SimpleAppBar( {setOptiuneNotiteArhivate} ) {

  const handleSelectChange = (event) => {
    setOptiuneNotiteArhivate(event.target.value)
  } 

  return (
    <AppBar position="static">

      <Toolbar component="div" sx={{backgroundColor: 'black'}}>

        <Select 
          variant="standard"
          disableUnderline = {true}
          defaultValue={false} 
          id = 'select-notite'
          labelId = 'label-select-notite'
          sx={{
            color: 'white', border: 'none', outline: 'none',
            "& .MuiSvgIcon-root": { color: "white"}, 
          }}
          onChange={ handleSelectChange } 
        >  
          <MenuItem value={false}>
            <Typography variant='h5' >
              Notițe Curente
            </Typography>
          </MenuItem>
          
          <MenuItem value={true}>
            <Typography variant='h5' >
              Notițe Arhivate
            </Typography>
          </MenuItem>
        </Select>
              
      </Toolbar>
    </AppBar>
  )
}