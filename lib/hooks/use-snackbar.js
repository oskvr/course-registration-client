import { Alert, Snackbar } from "@mui/material";
import React from "react";

const snackbarContext = React.createContext();

export function SnackbarProvider(props) {
  const [alert, setAlert] = React.useState({
    message: "",
    severity: "success",
    duration: 4000,
  });
  const [isOpen, setIsOpen] = React.useState(false);

  function addAlert(
    message,
    settings = { severity: "success", duration: 6000 }
  ) {
    setAlert({
      ...alert,
      message,
      severity: settings.severity,
      duration: settings.duration,
    });
    setIsOpen(true);
  }
  function closeSnackbar() {
    setIsOpen(false);
  }
  return (
    <snackbarContext.Provider value={{ addAlert }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isOpen}
        onClose={closeSnackbar}
        autoHideDuration={alert.duration ?? 4500}
      >
        <Alert variant="filled" severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
      {props.children}
    </snackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = React.useContext(snackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a snackbarProvider");
  }
  return context;
}
