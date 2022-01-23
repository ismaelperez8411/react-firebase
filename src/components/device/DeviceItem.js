import { TableCell } from "@mui/material";
import { Stack } from "@mui/material";
import { IconButton } from "@mui/material";
import { Switch } from "@mui/material";
import { TableRow } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";

export const DeviceItem = ({ device, deleteFunc, updateStatus }) => {
  return (
    <TableRow
      key={device.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {device.uid}
      </TableCell>
      <TableCell align="left">{device.seller}</TableCell>
      <TableCell align="center">{device.created_date}</TableCell>
      <TableCell align="center">
        <Switch
          checked={device.status}
          onChange={(e) => {
            updateStatus(device.id, e.target.checked);
          }}
        />
      </TableCell>
      <TableCell align="center">
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <Tooltip title="Delete Device">
            <IconButton
              color="error"
              onClick={() => {
                deleteFunc(device.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
