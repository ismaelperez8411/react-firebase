import { createSlice } from "@reduxjs/toolkit";
import GatewayDataService from "../../services/gateway.service";

export const gatewaySlice = createSlice({
  name: "gateway",
  initialState: {
    list: [],
    isLoading: true,
    msg: "",
    status: "success",
  },
  reducers: {
    gatewaysList: (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
      state.msg = "";
      state.status = "success";
    },
    gatewaysDelete: (state, action) => {
      state.list = state.list.filter(({ id }) => id !== action.payload.id);
      state.isLoading = false;
      state.msg = action.payload.message;
      state.status = action.payload.status;
    },
    gatewaysCreate: (state, action) => {
      state.list.push(action.payload.data);
      state.isLoading = false;
      state.msg = action.payload.message;
      state.status = action.payload.status;
    },
  },
});

export default gatewaySlice.reducer;

// Action creators are generated for each case reducer function
const { gatewaysList, gatewaysDelete, gatewaysCreate } = gatewaySlice.actions;

export const fetchGateways = (email) => async (dispatch) => {
  try {
    await GatewayDataService.get(email).then((response) =>
      dispatch(gatewaysList(response.data))
    );
  } catch (e) {
    return console.error(e.message);
  }
};

export const deleteGateway = (id) => async (dispatch) => {
  try {
    await GatewayDataService.delete(id).then((response) =>
      dispatch(gatewaysDelete({ id: id, ...response.data }))
    );
  } catch (e) {
    return console.error(e.message);
  }
};

export const createGateway = (data) => async (dispatch) => {
  try {
    await GatewayDataService.create(data).then((response) =>
      dispatch(gatewaysCreate(response.data))
    );
  } catch (e) {
    return console.error(e.message);
  }
};
