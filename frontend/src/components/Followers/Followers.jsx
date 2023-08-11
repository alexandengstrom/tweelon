import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getUserData from "../../utils/getUserData";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import FollowButton from "../FollowButton/FollowButton";
import styles from "./Followers.module.css"

function Followers() {
    const { id } = useParams();
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const userData = await getUserData(id);
                setFollowers(userData.followers);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        }

        fetchData();
    }, [id]);

    return (
        <>
            <div className={styles["followers-container"]}>
                {followers.map(follower => (
                    <div className={styles["followers-follower"]}>
                    <ProfilePicture 
                        size={50}
                        url={follower.pictureURL}
                    />
                    <Link to={`/profiles/${follower._id}`}>{follower.name}</Link>
                    <FollowButton 
                        followID={follower._id}
                        followers={follower.followers}
                    />
                    </div>
                ))}
            </div>
        </>
    )
}

export default Followers;
