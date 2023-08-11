import React, { useRef } from "react";
import styles from "./UploadProfilePicture.module.css";
import backend from "../../api/backend"; 

function UploadProfilePicture() {
    const fileInputRef = useRef(null);

    const handleImageChange = async (event) => {
        if (event.target.files && event.target.files[0]) {
            await handleSubmit(event.target.files[0]);
        }
    };

    const handleSubmit = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        
        try {
            const response = await backend.post("/uploadProfilePicture", formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                }
            });
            console.log("Image uploaded successfully:", response.data);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className={styles["hiddenInput"]}
                onChange={handleImageChange}
            />
            <a
                href="#"
                className={styles["upload-image-link"]}
                onClick={(e) => {
                    e.preventDefault(); 
                    fileInputRef.current.click();
                }}
            >
                Change image
            </a>
        </>
    )
}

export default UploadProfilePicture;
