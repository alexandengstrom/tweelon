import styles from "./MainBox.module.css";

function MainBox({ children}) {
    return (
        <>
            <main>
                <div className={styles["mainbox-container"]}>
                    {children}
                </div>
            </main>
        </>
    )
}

export default MainBox;