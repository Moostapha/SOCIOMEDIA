import { Box } from "@mui/material";

// Stylin, Profile image
const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user profile"
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

// reusable component in UserWidget.jsx
export default UserImage;
