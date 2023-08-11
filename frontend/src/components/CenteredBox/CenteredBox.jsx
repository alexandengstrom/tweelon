import styles from "./CenteredBox.module.css"

function CenteredBox ({ children }) {
    return (
        <>
            <div className={styles["centered-box-main-container"]}>
                <div className={styles["centered-box"]}>
                    {children}
                </div>
            </div>
        </>
    )
};

export default CenteredBox;