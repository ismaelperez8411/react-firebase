import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
  Stack,
  Tooltip,
  Divider,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Info, PhotoCamera } from "@mui/icons-material";
import { DeviceList } from "../device/DeviceList";
/*import { ImageListBlock } from "../image/ImageListBlock";
import ImageComponent from "../image/ImageComponent";*/

export const Gateway = ({ gateway, deleteGateway, openImageUpload }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        style={styles.tabWithoutBorder}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {gateway.ipv4}
        </TableCell>
        <TableCell align="left">{gateway.name}</TableCell>
        <TableCell align="right">
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Tooltip title="Show / Handle Image Gallery">
              <IconButton
                color="secondary"
                onClick={() => {
                  openImageUpload(gateway.id);
                }}
              >
                <PhotoCamera />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Gateway">
              <IconButton
                color="error"
                onClick={() => {
                  deleteGateway(gateway.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Devices
              </Typography>
              {open && <DeviceList idGateway={gateway.id} />}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const styles = {
  tabWithoutBorder: {
    boxShadow: "none",
  },
};
