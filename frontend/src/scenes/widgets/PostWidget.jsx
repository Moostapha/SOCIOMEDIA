import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from '@mui/icons-material';
import {
    Box, Divider, Typography, IconButton, useTheme
} from "@mui/material";
import FlexBetween from 'components/FlexBetween';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from 'state';

// COMPONENT DISPLAYING ONE POST CREATED WITH FUNCTIONNALITY ADD REMOVE LIKE 
// + DISPLAYS FRIEND COMPONENT WITH THE USER AUTHOR OF THIS POST + ADD REMOVE FRIEND + IS FRIEND OR NOT
// + DISPLAY COMMENTS LIST OR NOT

const PostWidget = ({
    postId,
    userAuthorId, // userId qui a créé ce post
    firstName,
    lastName,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {

    const dispatch = useDispatch();
    
    // State Opening comments list or not
    const[isComments, setIsComments] = useState(false);

    // state
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);

    // Likes du loggedInUser true or false cf Post Model likes entry
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    // Theme Color
    const { palette } = useTheme();
    // const primaryLight = palette.primary.light;
    // const primaryDark = palette.primary.primaryDark;
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    

    // Function changin number of likes ctler post/addRemovelikePost
    const patchLike = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
            method: "PATCH",
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
            },
            // Who likes the post
            body: JSON.stringify({ userId: loggedInUserId })
        });
        
        // Updated posts from the backend
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    }
    
    return (
        <WidgetWrapper m="2rem 0">
            
            {/* Friend Component displays userAthorId + possibilité de rajouter ou non l'auteur du post */}
                <Friend
                    friendId={userAuthorId}
                    firstName={firstName}
                    lastName={lastName}
                    subtitle={location}
                    userPicturePath={userPicturePath}
                />
                <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
                </Typography>
            {/* End */}

            {/* IMAGE DU POST picturePath du post ou pas */}
                {picturePath && (
                    <img
                        alt="postPicture"
                        width="100%"
                        height="auto"
                        style={{ borderRadius: "0.75rem", mt: "0.75rem" }}
                        src={`http://localhost:3001/assets/${picturePath}`}
                    />
                )}
            {/* END */}

            {/* ICONS + COMMENT SECTIONS */}
                <FlexBetween mt='0.25rem'>
                    <FlexBetween gap='1rem'>
                        
                        {/* Icon section */}
                            <FlexBetween gap='0.3rem'>
                                
                                {/* Like Button + type conditionnal if liked or not */}
                                    <IconButton onClick={patchLike}>
                                        { isLiked ? 
                                            (<FavoriteOutlined sx={{color:primary}} />): (<FavoriteBorderOutlined/>) 
                                        }
                                    </IconButton>
                                {/* End */}
                                
                                {/* Display like number */}
                                    <Typography>{likeCount}</Typography>
                                {/* End */}
                                
                                
                                {/* Comment section icon + comments number*/}
                                    <FlexBetween gap='0.3rem'>
                                        <IconButton onClick={() => setIsComments(!isComments)} >
                                            <ChatBubbleOutlineOutlined/>
                                        </IconButton>
                                        <Typography>{comments.lenght}</Typography>
                                    </FlexBetween>
                                {/* End */}
                                
                            </FlexBetween>
                        {/* End */}
                        
                        
                        
                        {/* Comments section */}
                            <FlexBetween gap='0.3rem'>
                                {/* Comment button  type conditionnal if liked or not */}
                                <IconButton onClick={patchLike}>
                                        { isLiked ? 
                                            (<FavoriteOutlined sx={{color:primary}} />): (<FavoriteBorderOutlined/>) 
                                        }
                                </IconButton>
                            </FlexBetween>
                        {/* End */}
                        
                    </FlexBetween>

                    <IconButton>
                        <ShareOutlined/>
                    </IconButton>

                </FlexBetween>
            {/* END */}
            
            {/* Display actual Post's comments with map() method */}
                {isComments &&(
                    <Box mt='0.5rem'>
                        {comments.map((comment, index) => (
                            <Box key={`${firstName}-${lastName}-${index}`}>
                                <Divider/>
                                <Typography sx={{color: main, m:'0.5rem 0', pl:'1rem'} }>
                                    {comment}
                                </Typography>
                            </Box>
                        ))}
                        <Divider/>
                    </Box>
                )}
            {/* END */}
        </WidgetWrapper>
    );
};

export default PostWidget;