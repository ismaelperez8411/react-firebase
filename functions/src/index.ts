import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";

import {
  addGateway,
  getAllGateways,
  updateGateway,
  deleteGateway,
  getAllGatewaysByEmail,
} from "./gatewayController";

import {
  addDevice,
  getAllDevicesByIdGateway,
  updateDevice,
  deleteDevice,
} from "./deviceController";

import { uploadFile, listFiles, deleteImage } from "./imagesController";

const app = express();
app.use(cors());

app.get("/", (req, res) =>
  res
    .status(200)
    .send("Gateways API-REST (using Cloud Functions from Firebase)")
);

// gateways handle
app.post("/gateways", addGateway);
app.get("/gateways", getAllGateways);
app.get("/gateways/:email", getAllGatewaysByEmail);
app.patch("/gateways/:gatewayId", updateGateway);
app.delete("/gateways/:gatewayId", deleteGateway);

// devices  list
app.post("/devices", addDevice);
app.get("/devices/:gatewayID", getAllDevicesByIdGateway);
app.put("/devices/:deviceId", updateDevice);
app.delete("/devices/:deviceId", deleteDevice);

// images  handle
app.delete("/images/:gatewayId/:imageName", deleteImage);
app.get("/images/:gatewayId", listFiles);
app.post("/upload", uploadFile);

exports.app = functions.https.onRequest(app);
