import { Response } from "express";
import { db } from "./config/firebase";

type DeviceType = {
  gatewayID: string;
  seller: string;
  status: boolean;
  uid: number;
  created_date: string;
};

type GatewayType = {
  name: string;
  ipv4: string;
  email: string;
  id: string;
};

type Request = {
  body: GatewayType;
  params: { gatewayId: string; email: string };
};

const addGateway = async (req: Request, res: Response) => {
  const { name, ipv4, email } = req.body;
  try {
    const entry = db.collection("gateway").doc();
    const entryObject = {
      id: entry.id,
      name: name,
      ipv4: ipv4,
      email: email,
    };
    entry.set(entryObject);
    res.status(200).send({
      status: "success",
      message: "gateway added successfully",
      data: entryObject,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getAllGateways = async (req: Request, res: Response) => {
  try {
    const allEntries: GatewayType[] = [];
    const querySnapshot = await db.collection("gateway").get();
    querySnapshot.forEach((doc: any) =>
      allEntries.push({ ...doc.data(), id: doc.id })
    );
    return res.status(200).json(allEntries);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAllGatewaysByEmail = async (req: Request, res: Response) => {
  const {
    params: { email },
  } = req;

  try {
    const allEntries: GatewayType[] = [];

    const querySnapshot = await db
      .collection("gateway")
      .where("email", "==", email)
      .get();
    querySnapshot.forEach((doc: any) =>
      allEntries.push({
        ...doc.data(),
        id: doc.id,
        devices: getDevices(doc.id).then((res) => res),
      })
    );
    return res.status(200).json(allEntries);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const getDevices = async (gatewayId: string) => {
  const allEntries: DeviceType[] = [];
  const querySnapshot = await db
    .collection("gateway")
    .doc(gatewayId)
    .collection("device")
    .get();
  querySnapshot.forEach((doc: any) =>
    allEntries.push({ ...doc.data(), id: doc.id })
  );
  console.log(allEntries);
  return allEntries;
};
/*const getSpecificGatewayWidthDevices = async (req: Request, res: Response) => {
  const {
    params: { gatewayId },
  } = req;

  const allEntries: DeviceType[] = [];
  const querySnapshot = await db
    .collection("gateway")
    .doc(gatewayId)
    .collection("device")
    .get();
  querySnapshot.forEach((doc: any) =>
    allEntries.push({ ...doc.data(), id: doc.id })
  );

  console.log(allEntries);
};*/

const updateGateway = async (req: Request, res: Response) => {
  const {
    body: { name, ipv4 },
    params: { gatewayId },
  } = req;

  try {
    const entry = db.collection("gateway").doc(gatewayId);
    const currentData = (await entry.get()).data() || {};
    const entryObject = {
      name: name || currentData.name,
      ipv4: ipv4 || currentData.ipv4,
    };

    await entry.set(entryObject).catch((error) => {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    });

    return res.status(200).json({
      status: "success",
      message: "gateway updated successfully",
      data: entryObject,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteGateway = async (req: Request, res: Response) => {
  const { gatewayId } = req.params;

  try {
    const entry = db.collection("gateway").doc(gatewayId);

    await entry.delete().catch((error) => {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    });

    return res.status(200).json({
      status: "success",
      message: "gateway deleted successfully",
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export {
  addGateway,
  getAllGateways,
  getAllGatewaysByEmail,
  updateGateway,
  deleteGateway,
};
