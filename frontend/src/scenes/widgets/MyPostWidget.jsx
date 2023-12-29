import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  
} from "@mui/material";
import Dropzone from "react-dropzone";
// Custom Components
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
// State Management
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import FlexBetween from "components/FlexBetween";

const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    // Etat initial
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    // Theme colors
    const { palette } = useTheme();
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
    // MediaQuery
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    
    // Function creating a post from the front with API call to the server
    const createPost = async () => {
    
    // 1) Capture des entrées avec formData
    const formData = new FormData();
    formData.append("userId", _id);         // Clé userId de User.js 
    formData.append("description", post);
    // Image postée par le user
    if (image) {
    // Stockage dans le server express clé picture dans multerFileStorage middleware
        formData.append("picture", image);
        formData.append("picturePath", image.name);
    }

    // 2) API CALL qui doit renvoyer la liste des old posts et le new one
    const response = await fetch("http://localhost:3001/posts/createPost", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
    });
    console.log("response from createPost: ", response);
    
    // 3) Forme json de la réponse logic ctrler createPost
    const posts = await response.json();
    console.log("response posts json: ", posts);

    // 4) Liste des posts updated avec le new post created cf ctler createPost
    dispatch(setPosts({ posts }));

    // 5) reset states empty form
    setImage(null);
    setPost("");
};

    return (
    <WidgetWrapper>
        
        {/* Champ Formulaire création de post */}
        <FlexBetween gap="1.5rem">
            <UserImage image={picturePath} />
            <InputBase
            placeholder="Quoi de neuf ?"
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "2rem",
                padding: "1rem 2rem",
            }}
            />
        </FlexBetween>
        
        {/* Si image clickée faire apparaitre Box*/}
        {isImage && (
            <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
            >
                {/* file dropping */}
                <Dropzone
                    acceptedFiles=".jpg, .jpeg, .png"
                    multiple={false} // just one file at a time
                    onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                >
                    {({ getRootProps, getInputProps }) => (
                    <FlexBetween>
                        <Box
                            {...getRootProps()}
                            border={`2px dashed ${palette.primary.main}`}
                            p="1rem"
                            width="100%"
                            sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                            <input {...getInputProps()} />
                            
                            {/* si no image*/}
                            {!image ? (
                                <p>Ajouter une image...</p>
                            ) : (
                                <FlexBetween>
                                <Typography>{image.name}</Typography>
                                <EditOutlined />
                                </FlexBetween>
                            )}
                        </Box>
                        
                        {/* si image rendu icone trash */}
                        {image && (
                            <IconButton
                                onClick={() => setImage(null)}
                                sx={{ width: '15%' }}
                            >
                                <DeleteOutlined/>
                            </IconButton>
                        )}
                    </FlexBetween>
                    )}
                </Dropzone>
            </Box>
        )}

        <Divider sx={{ margin: '1.25rem 0'}}/>
        
        {/* ICONS */}
        <FlexBetween>

            <FlexBetween onClick={() => setIsImage(!isImage)} gap='0.25rem'>
                <ImageOutlined sx={{ color: mediumMain}}/>
                <Typography
                    color={mediumMain}
                    sx={{ '&:hover': { cursor: 'pointer', color: medium}}}
                >Image</Typography>
            </FlexBetween>
        
        
            {/* RESPONSIVE ICONS */}
            {isNonMobileScreens ? (
                // desktop display
                <>
                    <FlexBetween gap='0.25rem'>
                        <GifBoxOutlined sx={{ color: mediumMain}}/>
                        <Typography sx={{ color: mediumMain}}>Clip</Typography>
                    </FlexBetween>

                    <FlexBetween gap='0.25rem'>
                        <AttachFileOutlined sx={{ color: mediumMain}}/>
                        <Typography sx={{ color: mediumMain}}>Attachement</Typography>
                    </FlexBetween>

                    <FlexBetween gap='0.25rem'>
                        <MicOutlined sx={{ color: mediumMain}}/>
                        <Typography sx={{ color: mediumMain}}>Audio</Typography>
                    </FlexBetween>
                </>
                ) : 
                // Mobile display
                (
                    <>
                    <FlexBetween gap='0.25rem'>
                        <MoreHorizOutlined sx={{ color: mediumMain}}/>
                    </FlexBetween>
                </>
                )
            }
            
            {/* BTN CREATE POST */}
            <Button
                disabled={!post}
                onClick={createPost}
                sx={{
                    color: palette.background.alt,
                    backgroundColor: palette.primary.main,
                    borderRadius: '3rem'
                }}
            >
                POST
            </Button>
        </FlexBetween>
    </WidgetWrapper>
    );
};

export default MyPostWidget;
