import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
// STATE MANAGEMENT
// State initial stocké dans le global state pour accés dans toute l'application

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    showAlert: false,
    alertType: null,
    alertMsg: null,
    // error: false
};

// Fonction modifiant le state global avec createSlice prenant comme params
// un nom | un state initial (à modifier) | reducer ou objet listant les actions à faire

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        
        // darkmode | lightmode => si le state est light? on met dark, sinon on met light
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        
        // Login modifie état du user + token en chargeant le user et son token
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        
        // Logout reset user et token
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        
        // Friends List of user
        setFriends: (state, action) => {
            // si user existe et est connecté
            if (state.user) {
                state.user.friends = action.payload.friends
            } else {
                console.error("user friends n'existent pas :(")
            }
        },
        
        // Posts
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        
        // Post updatedPost
        setPost: (state, action) => {
            
            // Boucle sur la liste de post
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post_id) return action.payload.post;
                return post;
            });
            
            state.posts = updatedPosts;
        },
        
        // Alerts notifs for users
        setUserAlert: (state, action) => {
            state.showAlert = action.payload.showAlert;
            state.alertType = action.payload.alertType;
            state.alertMsg = action.payload.alertMsg;
        },
        
        clearUserAlert: (state) => {
            state.showAlert= false ;
            state.alertType = null;
            state.alertMsg = null;
        },
    }
})

// UserAlerts
const dispatch = useDispatch
export const errorAlert = () => {
    return dispatch(
        setUserAlert({
            showAlert: true,
            alertType: "error",
            alertMsg: "Une erreur s'est produite"
        })
    );
};

export const successAlert = () => {
    dispatch(
        setUserAlert({
            showAlert: true,
            alertType: "success",
            alertMsg: "Réussi !!!",
        })
    );
};

// actions
export const {
    setMode,
    setLogin,
    setLogout,
    setFriends,
    setPosts,
    setPost,
    setUserAlert,
    clearUserAlert

} = authSlice.actions;

// reducer
export default authSlice.reducer;


