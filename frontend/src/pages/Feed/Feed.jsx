import InfiniteFeed from "../../components/InfiniteFeed/InfiniteFeed";
import NewPost from "../../components/NewPost/NewPost";
import {useState} from "react";

function Feed() {
    const [shouldUpdate, setShouldUpdate] = useState(false);


    return (
        <>
            <NewPost 
                onNewPost = {setShouldUpdate}
            />
            <InfiniteFeed 
                shouldRefresh = {shouldUpdate}
                setShouldRefresh = {setShouldUpdate}
            />
        </>
    )
}

export default Feed;