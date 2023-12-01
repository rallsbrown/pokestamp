import React from "react";
import { PokeContext } from "./PokeContext";

export const usePokeContext = () => {
  return React.useContext(PokeContext);
};
