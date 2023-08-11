import styles from "./LoginGraphic.module.css";
import spaceman from "./spaceman.png"
function LoginGraphic( { text }) {
    return (
        <>
            <div className={styles["login-graphic-container"]}>
                <h2>{text}</h2>
                <img src={spaceman}/>
            </div>
        </>
    )
};

export default LoginGraphic;