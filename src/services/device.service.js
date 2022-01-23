import http from "../http-common";

class DeviceDataService {
  get(idGateway) {
    return http.get(`/devices/${idGateway}`);
  }

  create(data) {
    return http.post("/devices", data);
  }

  update(id, data) {
    return http.put(`/devices/${id}`, data);
  }

  delete(id) {
    return http.delete(`/devices/${id}`);
  }
}

export default new DeviceDataService();
