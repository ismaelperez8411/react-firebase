import { configureStore } from "@reduxjs/toolkit";
import gatewayReducer from "./actions/gatewaySlice";
//import deviceReducer from "./actions/deviceSlice";
export default configureStore({
  reducer: {
    gateway: gatewayReducer,
  },
});
