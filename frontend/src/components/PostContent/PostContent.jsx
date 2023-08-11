import { Link } from "react-router-dom";

function PostContent({ content }) {
    const tokens = content.split(/(#\w+)/);

    const renderedContent = tokens.map((token, index) => {
        const isHashtag = /^#\w+$/.test(token);

        if (isHashtag) {
            const hashtag = token.slice(1);
            return (
                <Link key={index} to={`/hashtag/${hashtag}`}>
                    {token}
                </Link>
            );
        } else {
            return token;
        }
    });

    return (
    <p>{renderedContent}</p>
    )
}

export default PostContent;
