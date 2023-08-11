import { Link } from "react-router-dom";
import styles from "./NavbarItem.module.css";

function NavbarItem( {img, link, title, setActiveItem}) {
    return (
        <>
            <div className={styles["navbar-item"]} onClick={() => setActiveItem(title)}>
                <Link to={link}>
                <img src={img} />
                <p>{title}</p>
                </Link>
            </div>
        </>
    )
}

export default NavbarItem;