import { createSlice } from "@reduxjs/toolkit";

// INITIAL STATE
const initialState = {
    showAlert: false,
    alertType: null,
    alertMsg: null,
};


export const userAlertSlice = createSlice({
    name: 'userAlert',
    initialState,
    reducers: {
        
        setUserAlert: (state, action) => {
            state.showAlert = action.payload.showAlert;
            state.alertType = action.payload.alertType;
            state.alertMsg = action.payload.alertMsg;
        },
        
        clearUserAlert: () => initialState,

        // clearUserAlert: (state) => {
        //     state.showAlert= false ;
        //     state.alertType = null;
        //     state.alertMsg = null;
        // },
        
    },
    
});

// export the reducer as the default export and actions as named export

// actions
export const { setUserAlert, clearUserAlert } = userAlertSlice.actions;
// reducer
export default userAlertSlice.reducer;

// Fonction userAlert qui display l'alert en fonction du succés ou de l'erreur
// export const userAlert = (error) => {
//     if(error) {
//         return dispatch()
//     }
// }
// export the reducer as the default export and actions as named export

//clearUserAlert: (state, action) => {
    //(state) => state = initialState;
    // state.open = false;
    // state.open = state.open === false;
    // state.alertType = action.payload.alertType === null;
    // state.alertMsg = action.payload.alertMsg === null;
//}