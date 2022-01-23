import http from "../http-common";

class ImagesDataService {
  uploadImage(data) {
    return http.post("/upload", data).then((res) => {
      console.log(res.statusText);
    });
  }

  getImages(id) {
    return http.get(`/images/${id}`);
  }

  deleteImage(imageName) {
    return http.delete(`/images/${imageName}`);
  }
}

export default new ImagesDataService();
