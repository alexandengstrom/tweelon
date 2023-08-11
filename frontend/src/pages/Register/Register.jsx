import CenteredBox from "../../components/CenteredBox/CenteredBox";
import LoginGraphic from "../../components/LoginGraphic/LoginGraphic";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import styles from "./Register.module.css"

function Login() {
    return (
        <>
            <CenteredBox>
                <div className={styles["register-page-container"]}>
                    <LoginGraphic 
                        text="Sign up to embark on a cosmic journey and explore what's trending across galaxies."
                    />
                    <RegisterForm />
                </div>
            </CenteredBox>
        </>
    )
};

export default Login;