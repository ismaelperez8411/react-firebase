const bucketName = "gs://exam-5facf.appspot.com"; //"gs://default-bucket"; //"gs://exam-5facf.appspot.com"; //Add your bucket name
const { Storage } = require("@google-cloud/storage");
import { Response } from "express";
const gcs = new Storage();
const bucket = gcs.bucket(bucketName);

type ImageFile = {
  dataURL: string;
  name: string;
  size: number;
  type: string;
};

type Request = {
  body: { images: ImageFile[]; idGateway: string };
  params: { gatewayId: string; imageName: string };
};

//we need to pass those parameters for this function
const uploadFile = async (req: Request, res: Response) => {
  //console.log("images sended 22", req.body);

  let errores: string[] = [];
  try {
    const { images, idGateway } = req.body;
    images.map((f) => {
      const imageBuffer = Buffer.from(f.dataURL.split(",")[1], "base64");
      var file = bucket.file(idGateway + "/" + f.name);
      file.save(
        imageBuffer,
        {
          metadata: { contentType: f.type },
          public: true,
          validation: "md5",
        },
        function (error: { toString: () => string }) {
          if (error) {
            errores.push(
              "Error: Unable to upload the image (" +
                f.name +
                ") [" +
                error.toString() +
                "]"
            );
          }
        }
      );
    });

    if (errores.length === 0) {
      res.status(200).send({
        status: "success",
        message: "images uploaded successfully",
        //data: downUrl,
      });
    } else {
      res.status(200).send({
        status: "warning",
        message: "images uploaded with throbles",
        //data: downUrl,
        errors: errores,
      });
    }
  } catch (errorEjec) {
    res.status(500).json(errorEjec.message);
  }
};

const deleteImage = async (req: Request, res: Response) => {
  const {
    params: { gatewayId, imageName },
  } = req;

  try {
    await bucket.file(gatewayId + "/" + imageName).delete();
    return res.status(200).json({
      status: "success",
      message: "images deleted successfully",
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const listFiles = async (req: Request, res: Response) => {
  const {
    params: { gatewayId },
  } = req;

  try {
    const [files] = await bucket.getFiles({ prefix: gatewayId });
    let returnFilesVals: any[] = [];
    files.forEach((file: any) => {
      returnFilesVals.push({
        id: file.metadata.generation,
        dataURL: file.metadata.mediaLink,
        name: file.metadata.name,
      });
    });
    return res.status(200).json(returnFilesVals);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export { uploadFile, listFiles, deleteImage };
