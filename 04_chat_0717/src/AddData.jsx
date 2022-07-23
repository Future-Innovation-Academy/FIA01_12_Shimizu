import "./App.css";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const AddData = ({
  date,
  time,
  temperature,
  addData,
  handleClose,
  handleInputChangeDate,
  handleInputChangeTime,
  handleInputChangeTemperature,
}) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="date"
            type="date"
            fullWidth
            variant="standard"
            onChange={handleInputChangeDate}
            value={date}
          />
          <TextField
            autoFocus
            margin="dense"
            id="time"
            type="time"
            fullWidth
            variant="standard"
            onChange={handleInputChangeTime}
            value={time}
          />
          <TextField
            autoFocus
            margin="dense"
            id="temperature"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleInputChangeTemperature}
            value={temperature}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addData}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AddData;
