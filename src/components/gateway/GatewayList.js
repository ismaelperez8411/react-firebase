import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import {
  Alert,
  AlertTitle,
  Backdrop,
  Button,
  CircularProgress,
  Collapse,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../context/AuthContext";
import { Gateway } from "./Gateway";
import { GatewayAddFrm } from "./GatewayAddFrm";
//import { ImageUpload } from "../image/ImageUpload.js";

import { useDispatch, useSelector } from "react-redux";
//import GatewayDataService from "../../services/gateway.service";

import {
  fetchGateways,
  deleteGateway,
  createGateway,
} from "../../redux/actions/gatewaySlice";
import ImageComponent from "../image/ImageComponent";

const GatewayList = () => {
  const [open, setOpen] = React.useState(false);
  const { list, isLoading, msg, status } = useSelector(
    (state) => state.gateway
  );
  const dispatch = useDispatch();

  //const gatewayInfo = useSelector((state) => state.gatewaysData.data);

  const [addModal, setAddModal] = useState(false);
  const toggleShow = () => setAddModal(!addModal);

  const [openImageUpload, setOpenImageUpload] = useState(false);
  const toggleShowImageUpload = (id) => {
    setIdGatewaySelected(id);
    setOpenImageUpload(!openImageUpload);
  };

  const { currentUser } = useAuth();

  const [idGatewaySelected, setIdGatewaySelected] = useState(-1);

  const deleteGatewayFunct = async (id) => {
    dispatch(deleteGateway(id)).then((res) => {
      setOpen(true);
    });
  };

  const createGatewayFunc = async ({ name, ipv4 }) => {
    if (name === "" || ipv4 === "") return;

    dispatch(
      createGateway({
        name: name,
        ipv4: ipv4,
        email: currentUser.email,
      })
    ).then((res) => {
      setOpen(true);
    });
  };
  useEffect(() => {
    dispatch(fetchGateways(currentUser.email));
    return () => {};
  }, [dispatch]);

  return (
    <Container component="main" maxWidth="lg">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {openImageUpload && (
        <ImageComponent
          open={openImageUpload}
          toggleShow={toggleShowImageUpload}
          idGateway={idGatewaySelected}
          style={{ minWindth: 300 }}
        />
      )}

      <div style={styles.gatewayListGeneralStyle}>
        <div className="card">
          <div className="card-header" style={styles.orderHeadTitleBlock}>
            <h1>Gateway List</h1>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={toggleShow}
            >
              Add Gateway
            </Button>
          </div>

          <Collapse in={open}>
            <Alert
              severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <AlertTitle>{status}</AlertTitle>
              {msg}— <strong>check it out!</strong>
            </Alert>
          </Collapse>

          {addModal && (
            <GatewayAddFrm
              create={createGatewayFunc}
              basicModal={addModal}
              setBasicModal={setAddModal}
              toggleShow={toggleShow}
            />
          )}

          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={styles.thead}>
                  <TableCell />
                  <TableCell>IPv4</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((gateway) => (
                  <Gateway
                    key={gateway.id}
                    gateway={gateway}
                    deleteGateway={deleteGatewayFunct}
                    openImageUpload={toggleShowImageUpload}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Container>
  );
};

export default GatewayList;

const styles = {
  gatewayListGeneralStyle: {
    marginTop: "100px",
  },
  orderHeadTitleBlock: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnAddNewGateClass: {
    padding: "0.5rem",
    height: "max-content",
  },
  thead: { boxShadow: "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset" },
};
