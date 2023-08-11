import { useState } from 'react';
import backend from '../../api/backend';
import { getUserId } from "../../validation/jwt";
import styles from "./FollowButton.module.css";

function FollowButton({ followID, followers: initialFollowers }) {
    const currentUser = getUserId();
    const [followers, setFollowers] = useState(initialFollowers);
    const [isLoading, setIsLoading] = useState(false);

    if (followID === currentUser) {
        return null;
    }

    const isFollowing = Array.isArray(followers) && followers.length > 0 
    ? (typeof followers[0] === "object" 
        ? followers.some(follower => follower._id === currentUser) 
        : followers.includes(currentUser))
    : false;

    const handleFollowClick = async () => {
        setIsLoading(true);

        try {
            const token = localStorage.getItem('auth-token'); 
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            const endpoint = isFollowing ? `/unfollowUser/${followID}` : `/followUser/${followID}`;
            
            const response = await backend.post(endpoint, {}, config); 
            
            if (isFollowing) {
                setFollowers(prevFollowers => prevFollowers.filter(id => id !== currentUser));
            } else {
                setFollowers(prevFollowers => [...prevFollowers, currentUser]);
            }
        
        } catch (error) {
            console.error("Error toggling follow state:", error);
        }
        

        setIsLoading(false);
    };

    const buttonClassName = `${styles["follow-button"]} ${isFollowing ? styles["follow-button-unfollow"] : ""}`;


    console.log(followers);

    return (
        <button 
            className={buttonClassName}
            onClick={handleFollowClick}
            disabled={isLoading}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </button>
    );
}

export default FollowButton;
