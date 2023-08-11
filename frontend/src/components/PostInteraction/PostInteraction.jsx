import styles from "./PostInteraction.module.css";
import { useState } from 'react';
import backend from '../../api/backend';
import { getUserId } from "../../validation/jwt";

import heartInactive from "./icons/heartInactive.png";
import heartActive from "./icons/heartActive.png";
import reply from "./icons/reply.png";
import deleteIcon from "./icons/delete.png";
import PostReplies from "../PostReplies/PostReplies";


function PostInteraction({ post, setShouldRefresh }) {
    const userId = getUserId();
    const [isLiked, setIsLiked] = useState(post.likes.includes(userId));
    const [likeCount, setLikeCount] = useState(post.likes.length);
    const [showReplies, setShowReplies] = useState(false);
    const [refreshRepliesToggle, setRefreshRepliesToggle] = useState(false);
    const [repliesCount, setRepliesCount] = useState(post.replies.length);


    const handleReplyPosted = () => {
        setRefreshRepliesToggle(prevState => !prevState);
        setRepliesCount(repliesCount + 1);
    }


    const handleLikeClick = async () => {
        const token = localStorage.getItem('auth-token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        try {
            if (isLiked) {
                await backend.post(`/unlikePost/${post._id}`, {}, config);
                setIsLiked(false);
                setLikeCount(likeCount - 1);
            } else {
                await backend.post(`/likePost/${post._id}`, {}, config);
                setIsLiked(true);
                setLikeCount(likeCount + 1);
            }
        } catch (error) {
            console.error("Error toggling like state:", error);
        }
    }

    const handleDeleteClick = async () => {
        const confirmation = window.confirm("Are you sure you want to delete this post?");
    
        if (!confirmation) {
            return;
        }
    
        const token = localStorage.getItem('auth-token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
    
        try {
            await backend.delete(`/deletePost/${post._id}`, config);
            setShouldRefresh(true);
 
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Failed to delete the post. Please try again later.");
        }
    }
    

    return (
        <>
        <div className={styles["post-interaction-container"]}>
            <div className={styles["post-interaction-icon"]} onClick={handleLikeClick}>
                <img src={isLiked ? heartActive : heartInactive} />
                <p>{likeCount}</p>
            </div>

            <div className={styles["post-interaction-icon"]}>
                <img src={reply} onClick={() => setShowReplies(!showReplies)} />
                <p>{repliesCount}</p>
            </div>

            {post.user._id === getUserId() &&
            <div className={styles["post-interaction-icon"]}>
                <img src={deleteIcon} onClick={handleDeleteClick} />
            </div>
            }
        </div>
        {showReplies && <PostReplies 
            post={post}
            setRefreshRepliesToggle={setRefreshRepliesToggle}
            refreshRepliesToggle={refreshRepliesToggle}
            handleReplyPosted={handleReplyPosted}
        />}
        </>
    );
}

export default PostInteraction;