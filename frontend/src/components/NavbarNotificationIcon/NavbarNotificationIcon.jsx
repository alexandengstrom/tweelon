import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavbarNotificationIcon.module.css";
import io from "socket.io-client"; 
import { getUserId } from "../../validation/jwt";

function NavbarNotificationIcon({ img, link, title, setActiveItem }) {
    const [notificationCount, setNotificationCount] = useState(0);
    const [socket, setSocket] = useState(null);
    
    useEffect(() => {
        const newSocket = io.connect("http://localhost:5000");
        setSocket(newSocket);
        
        return () => {
            newSocket.close();
        }
    }, []);

    useEffect(() => {
        if (!socket) return;

        const userId = getUserId();
        console.log(userId);
        socket.emit("joinRoom", userId);

        socket.on("NEW_NOTIFICATION", () => {
            setNotificationCount(prev => prev + 1);
        });

    }, [socket]);

    const handleClick = () => {
        setActiveItem(title);
        setNotificationCount(0);
    }

    return (
        <>
            <div className={styles["navbar-item"]} onClick={handleClick}>
                <Link to={link}>
                    <img src={img} />
                    <p>{title}</p>
                </Link>
                {notificationCount > 0 && (
                    <div className={styles["notification-count"]}>
                    </div>
                )}
            </div>
        </>
    );
}

export default NavbarNotificationIcon;
