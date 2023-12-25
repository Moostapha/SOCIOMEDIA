import React from 'react'
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { Alert, AlertTitle } from "@mui/material";
// state imports
import { useSelector, useDispatch } from "react-redux";
import { clearUserAlert } from "state";

export const SnackBar = () => {
    
    const dispatch = useDispatch();
    const showAlert = useSelector((state) => state.showAlert);
    const alertType = useSelector((state) => state.alertType);
    const alertMsg = useSelector((state) => state.alertMsg);
    
    // action Closing Alert
    const handleClose = () => {
        dispatch(clearUserAlert());
        console.log("click");
    };
    
    return showAlert? (
        // <Snackbar
        //     severity = {alertType}
        //     autoHideDuration={4000}
        //     onClose={handleClose}
        //     message= {<strong>{alertMsg}</strong>}
        //     action={
        //         <Button onClick={handleClose} color="inherit" size="small">
        //         CLOSE
        //         </Button>
        //     } 
        // />

        <Snackbar autoHideDuration={6000} onClose={handleClose}>
            <Alert 
                action={
                <Button onClick={handleClose} color="inherit" size="small">
                    CLOSE
                </Button>
                } 
                severity={alertType} 
                sx={{ width: "100%" }}>
                <AlertTitle>
                    <strong>{alertType}</strong>
                    </AlertTitle>
                {alertMsg}
                </Alert>
        </Snackbar>
    ) : null ;
};

export default SnackBar;