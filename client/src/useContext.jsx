import React from "react";
import { PokeContext } from "./PokeContext";

export const useContext = () => {
  return React.useContext(PokeContext);
};
