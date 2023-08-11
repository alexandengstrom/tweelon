import React, { useState, useEffect } from 'react';
import backend from '../../api/backend';
import NotificationItem from '../../components/NotificationItem/NotificationItem';

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem('auth-token');

                const response = await backend.get('/notifications', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                const recentNotifications = response.data.filter(notification => new Date(notification.date) > oneWeekAgo);

                setNotifications(recentNotifications);

                await backend.put('/clearNotifications', {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } catch (error) {
                console.error("Error fetching notifications:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <>
            <h1>Notifications:</h1>
            {loading ? (
                <p>Loading...</p>
            ) : notifications.length > 0 ? (
                    notifications.map(notification => (
                        <NotificationItem 
                            notification={notification}
                        />
                    ))
            ) : (
                <p>No recent notifications</p>
            )}
        </>
    );
}

export default Notifications;
