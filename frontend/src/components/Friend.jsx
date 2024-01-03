import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { useDispatch, useSelector, } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

// COMPONENT DISPLAY LOGGEDIN USER'S FRIENDLIST + CHECKING IF USER AUTHOR POST IS A FRIEND OR NOT 
// + ADD OR REMOVE THAT USER AUTHOR

const Friend = ({ friendId, firstName, lastName, subtitle, userPicturePath,}) => {
    
    // Redux + react-router-dom
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // state
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    // Friends Array from state user
    const friends = useSelector((state) => state.friends);               
    // Checking in this array if user is a friend or not display different icon
    const isFriend = friends.find((friend) => friend._id === friendId);  
    // Theme Color
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.primaryDark;
    const main = palette.primary.main;
    const medium = palette.primary.medium;

    // API call update friend List for loggedInUser | ctrler users/addRemoveFriend
    const patchFriend = async () => {
        const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}` },
            "Content-Type": "application/json",
        });
        // json response from the backend
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };

    return (
        <FlexBetween>
            
            {/* User Author du post avec lien sur son profil */}
                <FlexBetween gap="1rem">
                    <UserImage image={userPicturePath} size="55px" />
                    <Box
                        onClick={() => {
                            navigate(`/profile/${friendId}`);
                            navigate(0);
                        }}
                    >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                        "&:hover": {
                            color: palette.primary.light,
                            cursor: "pointer",
                        },
                        }}
                    >
                        {firstName} {lastName}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                    </Box>
                </FlexBetween>
            {/* END */}
            
            {/* ICON BUTTON REMOVE | ADD USER */}
                <IconButton
                    onClick={patchFriend}
                    sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
                >
                    {/* display kinda icon on condition isFriend (userAuthorId in PostWidget or other users in FriendsList) or not */}
                    {isFriend ? 
                        (<PersonRemoveOutlined sx={{ color: primaryDark }} />) : 
                        ( <PersonAddOutlined sx={{ color: primaryDark }} />)
                    }
                    {/* end */}
                </IconButton>
            {/* END */}
            
        </FlexBetween>
    );
};

// Usage in PostWidget
export default Friend;