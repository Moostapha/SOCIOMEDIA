import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import  { setPosts } from "state";
import PostWidget from "./PostWidget";

// Liste de component PostWidget (map())
const PostsWidget = ({ userAuthorId, isProfile = false }) => {
    
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    
    // API call to GET all posts => controller getFeedPosts
    const getAllPosts = async () => {
        const response = await fetch('http://localhost:3001/posts', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}`},
        });
        // json response getAllPosts
        const data = await response.json();
        console.log("getFeedPosts", data);
        dispatch(setPosts({ posts: data }));
    }
    
    // API call to GET user posts => controller geUserPosts
    const getUserPosts = async () => {
        const response = await fetch(`http://localhost:3001/posts/${userAuthorId}/userposts`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}`},
        });
        // json response getUserPosts
        const data = await response.json();
        console.log('getUserPosts', data);
        dispatch(setPosts({ posts: data }));
    } 
    
    useEffect(() => {
        // Si profile du loggedInUser
        if (isProfile) {
            getUserPosts();
        } else {
            getAllPosts();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <>
            {posts.map(
                ({
                    _id,
                    userAuthorId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) => (
                    <PostWidget 
                        key={_id}
                        postId={_id}
                        userAuthorId={userAuthorId}
                        firstName={firstName}
                        lastName={lastName}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    )
};

export default PostsWidget;