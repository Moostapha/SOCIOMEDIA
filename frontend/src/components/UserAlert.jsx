import { Alert, AlertTitle } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { clearUserAlert } from "state";
import Button from "@mui/material/Button";

export const UserAlert = () => {
  
  // Dispatching actions from the state reducer
  const dispatch = useDispatch();
  
  // selector sur lesquels on dispatch des actions de setUserAlert 
  // + actions dispatch d'autres components 
  const showAlert = useSelector((state) => state.showAlert);
  console.log('state de showAlert ',showAlert);
  const alertType = useSelector((state) => state.alertType);
  console.log("state de alertType ", alertType);
  const alertMsg = useSelector((state) => state.alertMsg);
  console.log("state de alertMsg ", alertMsg);
  // const error = useSelector((state) => state.error);
  // console.log("state de error ", error);

  // action Closing Alert auto + action button
  const handleClose = () => {
    dispatch(clearUserAlert());
  };
  // autoclosing au bout de 3 secondes
  setTimeout(handleClose, 3000);
  
  // rendu conditionnel ternaire
  return showAlert ? (
    <Alert
      severity={alertType}
      sx={{
        width: "80%",
        margin: "0 auto",
        fontSize: '2rem'
      }}
      spacing={2}
      variant="filled"
      action={
        <Button onClick={handleClose} color="inherit" size="small">
          FERMER
        </Button>
      }
    >
      <AlertTitle>
        <strong>{alertType}</strong>
      </AlertTitle>
      {alertMsg}
    </Alert>
  ) : null;
};
// TODO media queries small device pour userALAERT
export default UserAlert;
