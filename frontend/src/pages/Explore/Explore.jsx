import InfiniteFeed from "../../components/InfiniteFeed/InfiniteFeed";
import SearchBox from "../../components/SearchBox/SearchBox";
import { useEffect, useState } from "react";

function Explore() {
    const [query, setQuery] = useState("");
    const [endpoint, setEndpoint] = useState("/globalFeed");

    const handleQuery = () => {
        if (query.trim()) {
            setEndpoint(`/search/${query}`);
        } else {
            setEndpoint("/globalFeed");
        }
    }

    useEffect(() => {
        if (!query) {
            setEndpoint("/globalFeed");
        }
    }, [query])

    return (
        <>
        <SearchBox 
            query={query}
            setQuery={setQuery}
            handleQuery={handleQuery}
        />
        <h1>Explore the cosmos!</h1>
        <InfiniteFeed 
            endpoint={endpoint}
        />
        </>
    )
}

export default Explore;
