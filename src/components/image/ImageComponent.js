import React, { useState, useEffect } from "react";
import { RMIUploader } from "@dieyne/react-images-uploader";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import ImagesDataService from "../../services/image.service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //width: 400,
  bgcolor: "background.paper",
  //border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "5px",
  //padding: "1em !important",
  p: 4,
};

const ImageComponent = ({ idGateway, open, toggleShow }) => {
  const [visible, setVisible] = useState(false);

  const [uploaded, setUploaded] = useState(false);
  //const [loaded, setLoaded] = useState(0);

  const [dataSources, setDataSources] = useState([]);

  const hideModal = () => {
    setVisible(false);
  };
  const onUpload = (data) => {
    const filesArr = [];
    data.forEach((fileUp) => {
      filesArr.push({
        name: fileUp.file.name,
        size: fileUp.file.size,
        type: fileUp.file.type,
        dataURL: fileUp.dataURL,
      });
    });
    ImagesDataService.uploadImage({
      images: filesArr,
      idGateway: idGateway,
    }).then((res) => {
      //getImagesSources();
      setUploaded(!uploaded);
    });
    // aqui escribir el codigo para el manejo de errores y recarga de imagenes en el componente
  };
  const onSelect = (data) => {
    alert("llego");
    //console.log("Select files", data);
  };
  const onRemove = (id) => {
    setDataSources(
      dataSources.filter((img) => {
        if (img.id !== id) return img;
        else {
          ImagesDataService.deleteImage(img.name);
          return null;
        }
      })
    );
  };

  const getImagesSources = () => {
    ImagesDataService.getImages(idGateway).then((res) => {
      console.log(res);
      setDataSources(res.data);
    });
  };

  useEffect(() => {
    getImagesSources();
    return () => {
      //limpieza
    };
  }, [uploaded]);

  return (
    <Modal
      open={open}
      onClose={toggleShow}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Handle Images
        </Typography>
        {dataSources && (
          <RMIUploader
            isOpen={visible}
            hideModal={hideModal}
            onSelect={onSelect}
            onUpload={onUpload}
            onRemove={onRemove}
            dataSources={dataSources}
          />
        )}
      </Box>
    </Modal>
  );
};

export default ImageComponent;
