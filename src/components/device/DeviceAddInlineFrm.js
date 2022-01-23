import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Switch,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";

export const DeviceAddInlineFrm = ({ create, active }) => {
  const [seller, setSeller] = useState("");
  const [created, setCreated] = useState("2022-01-01");
  const [status, setStatus] = useState(false);
  const [errorVendor, setErrorVendor] = useState(false);

  const handleChange = (newValue) => {
    setCreated(newValue);
  };

  return (
    <>
      <TableRow style={styles.addDeviceForm}>
        <TableCell align="right">NEW</TableCell>
        <TableCell align="left">
          <TextField
            id="inp-vendor"
            label="Vendor"
            placeholder="Type a vendor"
            value={seller}
            onChange={(e) => {
              setSeller(e.target.value);
              setErrorVendor(false);
            }}
            required
            sx={{ width: "100%" }}
            error={errorVendor}
          />
        </TableCell>
        <TableCell align="center">
          <TextField
            id="inp-created"
            label="Creation Date"
            type="date"
            value={created}
            onChange={(e) => handleChange(e.target.value)}
          />
        </TableCell>
        <TableCell align="center">
          <Switch onChange={(e) => setStatus(e.target.checked)} />
        </TableCell>
        <TableCell align="center">
          <Tooltip title="Add Device">
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={(e) => {
                if (seller.trim() === "") {
                  setErrorVendor(true);
                  return;
                }
                create({ seller, created, status });
                setSeller("");
              }}
              color="success"
            >
              Add Device
            </Button>
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  );
};

const styles = {
  addDeviceForm: {
    background: "rgb(232 232 233)",
    boxShadow: "rgb(100 100 111 / 20%) 0px 7px 29px 0px",
  },
};
