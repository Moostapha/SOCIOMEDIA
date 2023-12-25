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
        
    },
    
});

// export the reducer as the default export and actions as named export

// actions
export const { setUserAlert, clearUserAlert } = userAlertSlice.actions;
// reducer
export default userAlertSlice.reducer;

//clearUserAlert: (state, action) => {
    //(state) => state = initialState;
    // state.open = false;
    // state.open = state.open === false;
    // state.alertType = action.payload.alertType === null;
    // state.alertMsg = action.payload.alertMsg === null;
//}