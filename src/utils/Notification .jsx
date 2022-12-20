import React from "react";
import Snackbar from "@mui/material/Snackbar";
import  Alert  from "@mui/material/Alert";

// const useStyles = styled((theme) => ({
//   root: {
//     top: theme.spacing(7),
//   },
// }));

const Notification = (props) => {
  const { notify, setNotify } = props;
  //const classes = useStyles();

  const handleClose = (event, reason) => {
    if(reason === "clickaway"){
        return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };
  return (
    <Snackbar
      //className={classes.root}
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert severity="success" onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;