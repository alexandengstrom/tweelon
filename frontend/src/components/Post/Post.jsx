import timeConverter from "../../utils/timeConverter";
import PostContent from "../PostContent/PostContent";
import PostInteraction from "../PostInteraction/PostInteraction";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import styles from "./Post.module.css";
import { Link } from "react-router-dom";

function Post({ post, setShouldRefresh }) {
    return (
        <>
            <div className={styles["post-container"]}>
                <ProfilePicture
                    size={50}
                    url={post.user.pictureURL}
                />
                <div className={styles["post-right-column"]}>
                <Link to={"/profiles/" + post.user._id}>{post.user.name}</Link>
                    <p className={styles["post-timestamp"]}>
                        {timeConverter(post.date)}
                    </p>

                    <PostContent 
                        content={post.content}
                    />
                    {post.pictureURL && 
                        <img 
                            src={post.pictureURL}
                            className={styles["post-image"]}
                            />
                    }
                    <PostInteraction
                        post = {post}
                        setShouldRefresh = {setShouldRefresh}
                    />
                </div>
            </div>
        </>
    )
}

export default Post;