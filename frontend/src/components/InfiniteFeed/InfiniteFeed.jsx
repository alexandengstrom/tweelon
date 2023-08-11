import React, { useState, useEffect } from 'react';
import backend from '../../api/backend';
import Post from '../Post/Post';
import debounce from 'lodash/debounce';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function InfiniteFeed({ shouldRefresh, setShouldRefresh, endpoint = "/feed" }) {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setIsFetching(true);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        loadPosts();
    }, [isFetching]);

    useEffect(() => {
        if (shouldRefresh) {
            refreshPosts();
            setShouldRefresh(false);
        }
    }, [shouldRefresh]);

    useEffect(() => {
        refreshPosts();
    }, [endpoint])

    const loadPosts = async () => {
        setIsFetching(true);
        
        try {
            const token = localStorage.getItem('auth-token');
            const response = await backend.get(`${endpoint}?page=${page}&limit=10`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPosts(prevState => ([...prevState, ...response.data]));
            setPage(prevState => prevState + 1);

            if (response.data.length < 10) setHasMore(false);
        } catch (err) {
            console.error(err);
        } finally {
            setIsFetching(false);
        }
    }

    const handleScroll = debounce(() => {
        const threshold = 50;
    
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - threshold && !isFetching && hasMore) {
            setIsFetching(true);
        }
    }, 100);

    const refreshPosts = async () => {
        setPage(1);
        setPosts([]);
        setHasMore(true);
        setIsFetching(true);
    }

    return (
        <div>
            {posts.map(post => (
                <Post 
                    post={post}
                    setShouldRefresh={setShouldRefresh}
                />
            ))}
            {isFetching && hasMore && <LoadingSpinner />}
            {!hasMore && <p>No more posts!</p>}
        </div>
    );
}

export default InfiniteFeed;
