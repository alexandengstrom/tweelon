import { Link } from 'react-router-dom';
import styles from "./NotificationItem.module.css";
import ProfilePicture from '../ProfilePicture/ProfilePicture';

function NotificationItem({ notification }) {
    let content = '';
    let linkTo = '#';

    switch (notification.type) {
        case 'like':
            content = `${notification.triggeredBy.name} liked your post "${notification.post?.content}"`;
            linkTo = `/post/${notification.post?._id}`;
            break;
        case 'reply':
            content = `${notification.triggeredBy.name} replied to your post "${notification.post?.content}"`;
            linkTo = `/post/${notification.post?._id}`;
            break;
        case 'follow':
            content = `${notification.triggeredBy.name} started to follow you`;
            linkTo = `/profiles/${notification.triggeredBy._id}`;
            break;
        default:
            content = 'Unknown notification type';
    }

    let containerClasses = `${styles["notification-item-container"]} ${notification.isRead ? '' : styles["notification-item-container-unread"]}`;

    return (
        <Link to={linkTo}>
            <div className={containerClasses}>
                <ProfilePicture
                    url={notification.triggeredBy.pictureURL}
                    size={50}
                />
                <p>{content}</p>
            </div>
        </Link>
    );
}

export default NotificationItem;


