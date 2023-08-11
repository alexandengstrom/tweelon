import React, { useState, useEffect } from "react";
import PostReply from "../PostReply/PostReply";
import PostReplyInput from "../PostReplyInput/PostReplyInput";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import styles from "./PostReplies.module.css";
import backend from "../../api/backend";

function PostReplies({ post, refreshRepliesToggle, setRefreshRepliesToggle, handleReplyPosted }) {
    const [replies, setReplies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReplies = async () => {
            try {
                const response = await backend.get(`/getReplies/${post._id}`);
                setReplies(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching replies:", err);
                setLoading(false);
            }
        };

        fetchReplies();
    }, [post._id, refreshRepliesToggle]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className={styles["post-replies-container"]}>
            {replies.map(reply => (
                <PostReply key={reply._id} reply={reply} />
            ))}
            <PostReplyInput 
                post={post} 
                onReplyPosted={handleReplyPosted}
            />
        </div>
    );
}

export default PostReplies;

