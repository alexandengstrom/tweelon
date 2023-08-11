import { useParams } from "react-router-dom";
import InfiniteFeed from "../../components/InfiniteFeed/InfiniteFeed";

function Hashtag() {
    const { hashtag } = useParams();

    return (
        <>
        <h2>{"Hashtag: " + hashtag}</h2>
        <InfiniteFeed 
            endpoint={`/hashtag/${hashtag}`}
        />
        </>
    )
}

export default Hashtag;