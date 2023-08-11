import {useRef, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import TweelonLogo from "../TweelonLogo/TweelonLogo";
import styles from "./RegisterForm.module.css";
import { Link } from 'react-router-dom';

import backend from "../../api/backend";
const REGISTER_URL = "/register"

const NAME_REGEX = /^[A-Za-zåäöÅÄÖ\s]{6,}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\x20-\x7E]{8,24}$/;


function RegisterForm() {
    const nameRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatchPwd, setValidMatchPwd] = useState(false);
    const [matchPwdFocus, setMatchPwdFocus] = useState(false);

    const [errorMsg, setErrorMsg] = useState("Failed");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        nameRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(NAME_REGEX.test(name));
    }, [name])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatchPwd(pwd == matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrorMsg("");
    }, [name, email, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(name);
        console.log(email);
        console.log(pwd);

        try {
            const response = await backend.post(REGISTER_URL, 
                JSON.stringify({
                    name: name,
                    email: email,
                    password: pwd
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(JSON.stringify(response?.data))
        } catch(err) {
            console.log(err)
        }

        setSuccess(true);
    }

    return (
        <>  
            {success && <Navigate to="/login"/>}
            <div className={styles["login-form-container"]}>
                <TweelonLogo />
                <h1 className={styles["login-form-header"]}>Starship ready. Captain, who are you?</h1>
                <form className={styles["login-form"]} onSubmit={handleSubmit}>
                    <div className={styles["input-group"]}>
                        <label className={styles["input-label"]} htmlFor="name">Name:</label>
                        <input 
                            type="text" 
                            id="name"
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Enter your name"
                            className={styles["login-input"]}
                            ref={nameRef}
                            onFocus={() => setNameFocus(true)}
                            onBlur={() => setNameFocus(false)}
                        />
                        <p className={nameFocus && name && !validName ? styles["register-instructions"] : styles["register-offscreen"]}>
                            Name must have at least 6 letters.
                        </p>
                    </div>

                    <div className={styles["input-group"]}>
                        <label className={styles["input-label"]} htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Enter your email"
                            className={styles["login-input"]} 
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />

                        <p className={!emailFocus && email && !validEmail ? styles["register-instructions"] : styles["register-offscreen"]}>
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
                            autoComplete="off"
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />

                        <p className={!pwdFocus && pwd && !validPwd ? styles["register-instructions"] : styles["register-offscreen"]}>
                            Password must have between 8-24 characters, have at least one capital letter and one number
                        </p>
                    </div>

                    <div className={styles["input-group"]}>
                        <label className={styles["input-label"]} htmlFor="password">Repeat password:</label>
                        <input 
                            type="password" 
                            id="matchpassword"
                            placeholder="Repeat your password"
                            className={styles["login-input"]}
                            autoComplete="off"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            required
                            onFocus={() => setMatchPwdFocus(true)}
                            onBlur={() => setMatchPwdFocus(false)}
                        />

                        <p className={matchPwdFocus && pwd && !validMatchPwd ? styles["register-instructions"] : styles["register-offscreen"]}>
                            Passwords doesnt match
                        </p>
                    </div>
                
                    <button 
                        disabled={!validName || !validEmail || !validPwd || !validMatchPwd ? true : false}
                        className={styles["login-button"]} 
                        type="submit">
                            Register
                    </button>
                    <p className={styles["register-error-msg"]} ref={errRef}>{errorMsg}</p>
                </form>
                
                <div className={styles["register-already-account"]}>
                <p>Already have an account?</p>
                <Link to="/login">Log in</Link>
                </div>

            </div>
        </>
    )
}

export default RegisterForm;