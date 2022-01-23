import { Response } from "express";
import { db } from "./config/firebase";

type DeviceType = {
  gatewayID: string;
  seller: string;
  status: boolean;
  uid: number;
  created_date: string;
};

type Request = {
  body: DeviceType;
  params: { gatewayID: string; uid: number; deviceId: string };
};

const addDevice = async (req: Request, res: Response) => {
  const { gatewayID, seller, status, uid, created_date } = req.body;
  try {
    const entry = db.collection("device").doc();
    const entryObject = {
      id: entry.id,
      seller: seller,
      status: status,
      uid: uid,
      gatewayID: gatewayID,
      created_date: created_date,
    };
    entry.set(entryObject);
    res.status(200).send({
      status: "success",
      message: "device added successfully",
      data: entryObject,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getAllDevicesByIdGateway = async (req: Request, res: Response) => {
  const { gatewayID } = req.params;
  console.log("aact-n", gatewayID, req.params);
  try {
    const allEntries: DeviceType[] = [];

    const querySnapshot = await db
      .collection("device")
      .where("gatewayID", "==", gatewayID)
      .get();
    querySnapshot.forEach((doc: any) =>
      allEntries.push({ ...doc.data(), id: doc.id })
    );
    return res.status(200).json(allEntries);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateDevice = async (req: Request, res: Response) => {
  const {
    body: { status: updstate },
    params: { deviceId },
  } = req;

  try {
    const entry = db.collection("device").doc(deviceId);
    const currentData = (await entry.get()).data() || {};
    const entryObject = {
      status: updstate,
      seller: currentData.seller,
      id: currentData.id,
      created_date: currentData.created_date,
      gatewayID: currentData.gatewayID,
      uid: currentData.uid,
    };

    console.log("estado", updstate, entryObject);

    await entry.set(entryObject).catch((error: any) => {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    });

    return res.status(200).json({
      status: "success",
      message: "device updated successfully",
      data: entryObject,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteDevice = async (req: Request, res: Response) => {
  const { deviceId } = req.params;

  try {
    const entry = db.collection("device").doc(deviceId);

    await entry.delete().catch((error: any) => {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    });

    return res.status(200).json({
      status: "success",
      message: "device deleted successfully",
      data: { id: deviceId },
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export { addDevice, getAllDevicesByIdGateway, updateDevice, deleteDevice };
