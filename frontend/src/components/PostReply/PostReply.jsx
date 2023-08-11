import { Link } from "react-router-dom";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import styles from "./PostReply.module.css";
import timeConverter from "../../utils/timeConverter";

function PostReply( {reply}) {
    return (
        <>
            <div className={styles["post-reply-container"]}>
                <div className={styles["post-reply-header"]}>
                    <ProfilePicture 
                        url={reply.user.pictureURL}
                        size={30}
                    />
                    <div className={styles["post-reply-name-time"]}>
                        <Link to={"/profiles/" + reply.user._id}>{reply.user.name}</Link>
                        <p>{timeConverter(reply.date)}</p>
                    </div>

                </div>

                <p>{reply.content}</p>
            </div>
        </>
    )
}

export default PostReply;