import http from "../http-common";

class GatewayDataService {
  getAll() {
    return http.get("/gateways");
  }

  get(email) {
    return http.get(`/gateways/${email}`);
  }

  create(data) {
    return http.post("/gateways", data);
  }

  update(id, data) {
    return http.put(`/gateways/${id}`, data);
  }

  delete(id) {
    return http.delete(`/gateways/${id}`);
  }

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

export default new GatewayDataService();
