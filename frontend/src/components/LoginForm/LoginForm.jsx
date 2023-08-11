import TweelonLogo from "../TweelonLogo/TweelonLogo";
import styles from "./LoginForm.module.css"
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import backend from "../../api/backend"

const LOGIN_URL = "/login"

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\x20-\x7E]{8,24}$/;

function LoginForm() {
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    

    useEffect(() => {
        setErrorMsg("");
    }, [email, pwd])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await backend.post(LOGIN_URL, 
                JSON.stringify({
                    email: email,
                    password: pwd
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            localStorage.setItem("auth-token", response.data);
            setSuccess(true);
            navigate("/feed");

        } catch(err) {
            if (!err?.response) {
                setErrorMsg("No server response")
            } else if (err.response?.status === 400) {
                setErrorMsg("Invalid login details")
            } else if (err.response?.status === 401) {
                setErrorMsg("Incorrect email or password")
            } else {
                setErrorMsg("Login failed")
            }
        }
    };

    return (
        <>  
            <div className={styles["login-form-container"]}>
                <TweelonLogo />
                <h1 className={styles["login-form-header"]}>Welcome back, astronaut!</h1>
                
                {errorMsg && 
                    <div className={styles["login-failed"]}>
                        <p>{errorMsg}</p>
                    </div>
                }
                <form className={styles["login-form"]} onSubmit={handleSubmit}>
                    <div className={styles["input-group"]}>
                        <label className={styles["input-label"]} htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Enter your email"
                            className={styles["login-input"]}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />

                        <p className={!emailFocus && email && !validEmail ? styles["login-instructions"] : styles["login-offscreen"]}>
                            Enter a valid email-adress
                        </p>
                    </div>
                
                    <div className={styles["input-group"]}>
                        <label className={styles["input-label"]} htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            id="password"
                            placeholder="Enter your password"
                            className={styles["login-input"]}
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                    </div>
                
                    <button className={styles["login-button"]} type="submit">Login</button>
                </form>

                <div className={styles["login-no-account"]}>
                    <p>Dont have an account yet?</p>
                    <Link to="/register">Sign up</Link>
                </div>
            </div>
        </>
    )
}

export default LoginForm