import CenteredBox from "../../components/CenteredBox/CenteredBox";
import LoginForm from "../../components/LoginForm/LoginForm";
import LoginGraphic from "../../components/LoginGraphic/LoginGraphic";
import styles from "./Login.module.css"
import { isAuthenticated } from "../../validation/jwt";
import { Navigate } from "react-router-dom";

function Login() {
    return (
        <>
            {isAuthenticated() &&
                <Navigate to="/feed" />
            }
            <CenteredBox>
                <div className={styles["login-page-container"]}>
                    <LoginForm />
                    <LoginGraphic 
                        text="Dock your starship here. Log in to reconnect with the cosmic conversation."
                    />
                </div>
            </CenteredBox>
        </>
    )
};

export default Login;