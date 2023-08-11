import NavbarItem from "../NavbarItem/NavbarItem";
import TweelonLogo from "../TweelonLogo/TweelonLogo";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom"
import { useState } from "react";

import { getUserId } from "../../validation/jwt";

import feedImgInactive from "./icons/feed1.png"
import feedImgActive from "./icons/feed2.png"

import profileImgInactive from "./icons/profile1.png"
import profileImgActive from "./icons/profile2.png"

import notificationImgInactive from "./icons/notification1.png"
import notificationImgActive from "./icons/notification2.png"

import exploreInactive from "./icons/explore1.png";
import exploreActive from "./icons/explore2.png";

import logOut from "./icons/logout.png";
import NavbarNotificationIcon from "../NavbarNotificationIcon/NavbarNotificationIcon";

function Navbar() {
    const [activeItem, setActiveItem] = useState("Feed");
    const userID = getUserId();
    
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("auth-token");
        navigate("/login");
    }

    return (
        <>
            <nav>
                <div className={styles["navbar-logo"]}>
                    <TweelonLogo/>
                </div>
                <NavbarItem 
                    img={activeItem === "Feed" ? feedImgActive : feedImgInactive}
                    link="/feed"
                    title="Feed"
                    setActiveItem={setActiveItem}
                />

                <NavbarItem 
                    img={activeItem === "Profile" ? profileImgActive : profileImgInactive}
                    link={`/profiles/${userID}`}
                    title="Profile"
                    setActiveItem={setActiveItem}
                />

                <NavbarNotificationIcon
                    img={activeItem === "Notifications" ? notificationImgActive : notificationImgInactive}
                    link="/notifications"
                    title="Notifications"
                    setActiveItem={setActiveItem}
                />

                <NavbarItem 
                    img={activeItem === "Explore" ? exploreActive : exploreInactive}
                    link="/explore"
                    title="Explore"
                    setActiveItem={setActiveItem}
                />

                <div onClick={logout}>                 
                    <NavbarItem 
                    img={logOut}
                    link="/login"
                    title="Log Out"
                    setActiveItem={setActiveItem}
                />
                </div>
            </nav>
        </>
    )
}

export default Navbar;