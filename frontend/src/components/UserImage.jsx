import { Box } from "@mui/material";

// Stylin, Profile image
const UserImage = ({ image, size='60px'}) => {
    <Box width={size} height={size}>
        <img
            alt="user profile"
            style={{ objectFit: "cover", borderRadius: "50%" }}
            width={size}
            height={size}
            src={`http://localhost:3001/assets/${image}`}
        />
    </Box>;
}

// reusable component
export default UserImage;