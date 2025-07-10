"use client";

import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const intialState = { from: null, to: null };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(intialState);

  const resetRange = () => {
    setRange(intialState);
  };

  const value = {
    range,
    setRange,
    resetRange,
  };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error(
      "useReservationContext must be used within a ReservationProvider",
    );
  }
  return context;
}

export { ReservationContext, ReservationProvider, useReservation };
