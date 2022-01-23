import { createSlice } from "@reduxjs/toolkit";
import DeviceDataService from "../../services/device.service";
export const deviceSlice = createSlice({
  name: "device",
  initialState: {
    gatewayID: "",
    list: [],
    isLoading: true,
  },
  reducers: {
    devicesList: (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    },
    devicesDelete: (state, action) => {
      state.list = state.list.filter(({ id }) => id !== action.payload);
      state.isLoading = false;
    },
    devicesCreate: (state, action) => {
      state.list.push(action.payload.data);
      state.isLoading = false;
    },
  },
});

export default deviceSlice.reducer;

// Action creators are generated for each case reducer function
const { devicesList, devicesDeleteSuccess, devicesCreate } =
  deviceSlice.actions;

export const fetchDevices = (idGateway) => async (dispatch) => {
  try {
    await DeviceDataService.get(idGateway).then((response) =>
      dispatch(devicesList(response.data))
    );
  } catch (e) {
    return console.error(e.message);
  }
};

export const deleteDevice = (id) => async (dispatch) => {
  try {
    await DeviceDataService.delete(id).then((response) =>
      dispatch(devicesDeleteSuccess(id))
    );
  } catch (e) {
    return console.error(e.message);
  }
};

export const createDevice = (data) => async (dispatch) => {
  try {
    await DeviceDataService.create(data).then((response) =>
      dispatch(devicesCreate(response.data))
    );
  } catch (e) {
    return console.error(e.message);
  }
};
