import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext.jsx";
import { MenuProvider } from "./context/MenuContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
       <MenuProvider>
       <App />
       </MenuProvider>
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>
);