import React, { Suspense, lazy } from "react";

import { useAuth } from "../context/AuthContext";
import MenuAppBar from "./header/MenuAppBar";
//import { GatewayList } from "./gateway/GatewayList";
const GatewayList = lazy(() => import("./gateway/GatewayList"));

export const Home = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <MenuAppBar />
      {currentUser.email !== undefined && (
        <Suspense fallback={<div>Loading...</div>}>
          <GatewayList />
        </Suspense>
      )}
    </>
  );
};
