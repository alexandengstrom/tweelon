import MainBox from "../../components/MainBox/MainBox";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

import styles from "./Design.module.css";

function Design() {
    return (
        <>
            <MainBox>
                <Navbar />
                <div className={styles["outlet-container"]}>
                    <Outlet />
                </div>
            </MainBox>
        </>
    )
}

export default Design;