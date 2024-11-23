import React from "react";
import { Navigate } from "react-router-dom";
import { useWallet } from "@suiet/wallet-kit";

const ProtectedRoutes = ({ children }) => {
  const { isConnected } = useWallet(); // Check wallet connection status

  // If the wallet is not connected, redirect to the home page
  if (!isConnected) {
    return <Navigate to="/" />;
  }

  // If connected, render the protected content
  return children;
};

export default ProtectedRoutes;
