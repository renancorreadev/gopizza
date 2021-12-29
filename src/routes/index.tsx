import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserStackRoutes } from "./users.stack.routes";

export function Routes() {
  return (
    <NavigationContainer>
      <UserStackRoutes />
    </NavigationContainer>
  );
}
