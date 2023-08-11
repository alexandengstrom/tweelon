import styles from "./ProfilePicture.module.css";
import placeholder from "./placeholder.jpg"

function ProfilePicture({ url, size = 100 }) {
    const imageStyle = {
        width: `${size}px`,
        height: `${size}px`
    };

    return (
        <img
            className={styles["profile-picture"]}
            src={!url ? placeholder : url} 
            style={imageStyle}
        />
    );
}

export default ProfilePicture;