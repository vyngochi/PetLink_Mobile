import React from "react";
import { View } from "react-native";
import GuestProfile from "../guest/profile";

export default function profile() {
  const isLogged = true;

  if (isLogged) {
    return <GuestProfile />;
  }

  return <View></View>;
}
