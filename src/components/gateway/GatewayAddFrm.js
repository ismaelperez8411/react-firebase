import { useState } from "react";
import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export const GatewayAddFrm = ({
  create,
  basicModal,
  setBasicModal,
  toggleShow,
}) => {
  const [name, setName] = useState("");
  const [ipv4, setIpv4] = useState("");

  const [errorIP, setIPError] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const ValidateIPaddress = (ipaddress) => {
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ipaddress
      )
    ) {
      return true;
    }
    setIPError(true);
    return false;
  };

  return (
    <Dialog open={basicModal} onClose={toggleShow}>
      <DialogTitle>Gateway Form</DialogTitle>
      <DialogContent>
        <TextField
          error={errorName}
          margin="normal"
          required
          fullWidth
          label="Name"
          name="name"
          autoFocus
          onChange={(e) => {
            setErrorName(false);
            setName(e.target.value);
          }}
          placeholder="Type a name"
        />
        <TextField
          error={errorIP}
          margin="normal"
          required
          fullWidth
          label="IPv4"
          id="ipv4"
          autoFocus
          onChange={(e) => {
            setIPError(false);
            setIpv4(e.target.value);
          }}
          helperText="###:###:###:###"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleShow}>Cancel</Button>
        <Button
          onClick={() => {
            if (name.trim() === "") {
              setErrorName(true);
              return;
            }
            if (ValidateIPaddress(ipv4)) {
              create({ name: name, ipv4: ipv4 });
              setName("");
              setIpv4("");
              toggleShow();
            }
          }}
        >
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/*const styles = {
  addCard: {
    display: "flex",
    justifyContent: "center",
    textAlign: "left",
    border: "1px solid blue",
    padding: "1rem",
    margin: "1rem 5rem",
  },
};*/
