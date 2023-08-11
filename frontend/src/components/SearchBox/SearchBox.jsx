import styles from "./SearchBox.module.css";

function SearchBox( {query, setQuery, handleQuery}) {
    return (
        <>
            <div className={styles["search-box-container"]}>
            <input 
                className={styles["search-box-input-input"]} 
                value={query} 
                onChange={e => setQuery(e.target.value)} 
                placeholder="What are you looking for?" 
            />
            <button 
                className={styles["search-box-button"]} 
                onClick={handleQuery}
            >
                Search
            </button>
            </div>
        </>
    )
}

export default SearchBox;