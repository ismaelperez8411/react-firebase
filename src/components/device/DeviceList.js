import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Alert, AlertTitle, LinearProgress } from "@mui/material";
import { DeviceAddInlineFrm } from "./DeviceAddInlineFrm";
import { DeviceItem } from "./DeviceItem";
import DeviceDataService from "../../services/device.service";

export const DeviceList = ({ idGateway }) => {
  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState([]);
  const getDevices = async () => {
    setLoading(true);
    await DeviceDataService.get(idGateway).then((response) => {
      setDevices(response.data);
      setLoading(false);
      return devices;
    });
  };

  const deleteDeviceFunct = async (id) => {
    DeviceDataService.delete(id).then((response) => {
      setDevices(devices.filter(({ id }) => id !== response.data.data.id));
    });
  };

  const changeDeviceState = async (id, status) => {
    DeviceDataService.update(id, { status: status }).then((response) => {
      setDevices(
        devices.map((device) => {
          if (device.id === response.data.data.id)
            device.status = response.data.data.status;
          return device;
        })
      );
    });
  };

  const createDeviceFunc = async ({ seller, created, status }) => {
    setLoading(true);
    let newUIDval = 1;
    devices.forEach((dev) => {
      newUIDval = newUIDval < dev.uid + 1 ? dev.uid + 1 : newUIDval;
    });
    const data = {
      uid: newUIDval,
      seller: seller,
      created_date: created,
      status: status,
      gatewayID: idGateway,
    };
    DeviceDataService.create(data).then((response) => {
      setDevices([...devices, response.data.data]);
      setLoading(false);
    });
  };

  useEffect(() => {
    getDevices();
    return () => {};
  }, []);

  return (
    <>
      {loading && <LinearProgress color="secondary" />}

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            {devices.length < 10 && (
              <DeviceAddInlineFrm
                create={createDeviceFunc}
                active={devices.length > 9}
              />
            )}
            {devices.length > 9 && (
              <TableRow>
                <TableCell colSpan="5">
                  <Alert severity="info" sx={{ width: "100%" }}>
                    <AlertTitle>Info</AlertTitle>
                    only 10 devices allowed <strong>check it out!</strong>
                  </Alert>
                </TableCell>
              </TableRow>
            )}
            {devices.length > 0 && (
              <TableRow>
                <TableCell>UID</TableCell>
                <TableCell align="left">Vendor </TableCell>
                <TableCell align="center">Creation Date</TableCell>
                <TableCell align="center">Online</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            )}
          </TableHead>
          {devices.length > 0 && (
            <TableBody>
              {devices.map((row) => (
                <DeviceItem
                  key={row.id}
                  device={row}
                  deleteFunc={deleteDeviceFunct}
                  updateStatus={changeDeviceState}
                />
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};
