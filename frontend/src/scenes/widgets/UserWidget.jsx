import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
// Custom components imports
import UserImage from "components/UserImage.jsx";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
// Hooks
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Component userWidget with parameters pour les infos du user colonne gauche dans HomePage

const UserWidget = ({ userId, picturePath }) => {
  
  console.log('picturePath', picturePath);
  // Initial local state (in this component) with useState to grab the user from the server (backend)
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const token = useSelector((state) => state.token);

  // Styling
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // API call to get loggeduser infos
  const getUser = async () => {
      
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Si pas d'erreur récupération des user infos
      //if (response.ok) {
        const data = await response.json();
        setUser(data);
        console.log('userData',data);
      //} 
    
  };

  // useEffect
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/* LIGNE 1 */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.dark,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} ami</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      {/* FIN */}

      <Divider />

      {/* LIGNE 2 */}
      <Box p="1rem 0">
        <Box display="flex" alignitems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignitems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>
      {/* FIN */}

      <Divider />

      {/* LIGNE 3 */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Vues de votre profil</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Vos impressions sur posts</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
      {/* FIN */}

      <Divider />

      {/* LIGNE 4 */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        {/* TWITTER */}
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        {/* LINKEDIN */}
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
      {/* FIN */}
    </WidgetWrapper>
  );
};

export default UserWidget;
