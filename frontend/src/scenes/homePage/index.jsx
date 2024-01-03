import { Box } from "@mui/material";
import NavBar from "scenes/navBar";
import UserAlert from "components/UserAlert";
import UserWidget from "scenes/widgets/UserWidget";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import CreatePostWidget from "scenes/widgets/CreatePostWidget";
import PostsWidget from "../widgets/PostsWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);

    return (
        <Box>
        <NavBar />
        <UserAlert />
        <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="0.5rem"
            justifyContent="space-between"
        >
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget userId={_id} picturePath={picturePath} />
            </Box>
            <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
            >
            {/* Component create post */}
            <CreatePostWidget picturePath={picturePath} />
            {/* end */}

            {/* Component mapping gettin all posts */}
            <PostsWidget userId={_id} />
            {/* end */}
            </Box>
            {/* Only on desktop */}
            {isNonMobileScreens && <Box flexBasis="26%"></Box>}
        </Box>
        </Box>
    );
};

export default HomePage;
