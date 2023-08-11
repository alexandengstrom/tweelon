import ProfilePicture from "../ProfilePicture/ProfilePicture";
import styles from "./NewPost.module.css";
import { useState, useEffect } from "react";
import backend from "../../api/backend";
import { getUserId } from "../../validation/jwt";
import uploadImage from "./uploadImage.png";

const CREATEPOST_URL = "/createPost"

function NewPost({ onNewPost }) {
    const [message, setMessage] = useState("");
    const [validMessage, setValidMessage] = useState(false);
    const [messageLength, setMessageLength] = useState(0);
    const [userInfo, setUserInfo] = useState(null);
    const [image, setImage] = useState(null);
    const [imagePreviewURL, setImagePreviewURL] = useState("");



    const adjustHeight = (textarea) => {
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight > 200 ? 200 : textarea.scrollHeight) + 'px';
    }

    useEffect(() => {
        const textarea = document.getElementById('name');
        adjustHeight(textarea);
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("auth-token");
    
        const formData = new FormData();
        formData.append('content', message);
        if (image) {
            formData.append('image', image);
        }
    
        try {
            const response = await backend.post(CREATEPOST_URL, formData, {
                headers: { 
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true,
            });
    
            console.log(JSON.stringify(response?.data))
            onNewPost(true);
            setMessage("");
            setImage(null);
            setImagePreviewURL("");
        } catch(err) {
            console.log(err)
        }
    };

    return (
        <>
            <div className={styles["new-post-container"]}>
                <ProfilePicture 
                    url={userInfo?.pictureURL}
                />
                <div className={styles["new-post-right-column"]}>
                    <form onSubmit={handleSubmit}>
                        <textarea 
                            type="text" 
                            id="name"
                            autoComplete="off"
                            onChange={(e) => setMessage(e.target.value)}
                            onInput={(e) => {
                                adjustHeight(e.target);
                                setMessage(e.target.value);
                            }}
                            required
                            placeholder="Launch your thoughts into the universe..."
                            className={styles["new-post-input"]}
                            value={message}
                        />
                        {imagePreviewURL && <img src={imagePreviewURL} alt="Preview" className={styles["image-preview"]}/>}
                        <div className={styles["new-post-below-input"]}>
                        <label className={styles["upload-label"]}>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => {
                                    setImage(e.target.files[0]);
                                    setImagePreviewURL(URL.createObjectURL(e.target.files[0]));
                                }}
                                style={{ display: "none" }}
                            />
                            <img 
                                src={uploadImage} 
                                className={styles["upload-image-icon"]}
                            />
                        </label>

                            <p>{messageLength} / 140</p>
                            <button
                                disabled={!validMessage}
                                className={styles["new-post-button"]}
                            >
                                Post
                            </button>
                        </div>
                        {!validMessage && 
                        <p className="warning-message">
                            Houston, we have a problem! Messages must be under 140 characters.
                        </p>}
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewPost;