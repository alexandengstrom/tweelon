import React, { useState, useEffect } from 'react';
import { useParams, Outlet } from "react-router-dom";
import backend from '../../api/backend';
import styles from "./Profile.module.css"
import UserInformation from '../../components/UserInformation/UserInformation';
import InfiniteFeed from '../../components/InfiniteFeed/InfiniteFeed';

function Profile() {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shouldUpdate, setShouldUpdate] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                const response = await backend.get(`/user/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserData(response.data);
            } catch (err) {
                setError("Error fetching user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <div className={styles["profile-container"]}>
                <UserInformation 
                    data={userData}
                />
            </div>

            <Outlet />

            <h2>Feed:</h2>
            <InfiniteFeed 
                endpoint={`/profileFeed/${userData._id}`}
                shouldRefresh = {shouldUpdate}
                setShouldRefresh = {setShouldUpdate}
            />

        </>
    )
}

export default Profile;
