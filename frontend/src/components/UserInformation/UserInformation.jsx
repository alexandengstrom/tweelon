import timeConverter from "../../utils/timeConverter";
import FollowButton from "../FollowButton/FollowButton";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import UploadProfilePicture from "../UploadProfilePicture/UploadProfilePicture";
import styles from "./UserInformation.module.css";
import { Link } from "react-router-dom";

function UserInformation({ data }) {
    return (
        <>
            <div className={styles["user-information-container"]}>
                <div className={styles["user-information-container-flex"]}>
                    <div className={styles["user-information-profile-image"]}>
                        <ProfilePicture
                            url={data.pictureURL}
                            size={200}
                        />
                        <UploadProfilePicture />
                    </div>
                    <div className={styles["user-information-data"]}>
                        <h3>{data.name}</h3>
                        <p>Registred: {timeConverter(data.date)}</p>
                        <p>Posts: {data.posts.length}</p>
                        <FollowButton 
                            followID = {data?._id}
                            followers = {data?.followers}
                        />
                    </div>
                </div>
                <div className={styles["user-information-following"]}>
                    <Link to={`/profiles/${data._id}/followers`}>Followers: {data.followers.length}</Link>
                    <Link to={`/profiles/${data._id}/following`}>Following: {data.following.length}</Link>
                </div>
                <h3>Bio:</h3>
                <p>The user has not written anything yet because this functionality is not implemented...</p>
            </div>
        </>
    )
}

export default UserInformation;