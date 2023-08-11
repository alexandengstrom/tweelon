import styles from "./PostReplyInput.module.css";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import { useState, useEffect } from "react";
import backend from "../../api/backend";
import { getUserId } from "../../validation/jwt";

function PostReplyInput( {post, onReplyPosted }) {
    const [message, setMessage] = useState("");
    const [validMessage, setValidMessage] = useState(false);
    const [messageLength, setMessageLength] = useState(0);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        setMessageLength(message.length)
        setValidMessage(messageLength <= 140);
    }, [message])

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem("auth-token");
            try {
                const response = await backend.get(`/user/${getUserId()}`, {
                    headers: { 
                        'Authorization': 'Bearer ' + token
                    }
                });
                setUserInfo(response.data);
            } catch (err) {
                console.error("Failed to fetch user info:", err);
            }
        };

        fetchUserInfo();
    }, []);

    const handleReply = async () => {
        const token = localStorage.getItem("auth-token"); 
    
        if (!token) {
            console.error("User not authenticated");
            return;
        }
    
        try {
            const response = await backend.post(`/postReply/${post._id}`, 
                { content: message },
                { 
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            );
    
            setMessage("");
            onReplyPosted();
    
        } catch (error) {
            console.error("Error posting reply:", error.response ? error.response.data : error.message);
        }
    };
    

    return (
        <>
        <div className={styles["post-reply-input-container"]}>
            <ProfilePicture 
                url={userInfo?.pictureURL}
                size={30}
            />
            <div className={styles["post-reply-input-and-button"]}>
            <textarea 
                className={styles["post-reply-input-input"]} 
                value={message} 
                onChange={e => setMessage(e.target.value)} 
                placeholder="Got a thought to launch into orbit?" 
            />
            <button 
                className={styles["post-reply-input-button"]} 
                onClick={handleReply}
                disabled={!validMessage}
            >
                Reply
            </button>
            </div>
        </div>
        
        {!validMessage && <p className="warning-message">Your message is too long!</p>}
        </>
    )
}

export default PostReplyInput;
