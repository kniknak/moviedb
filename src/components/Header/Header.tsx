import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => (
    <header className={styles.header}>
        <div className={styles.container}>
            <Link to="/" className={styles.logo}>
                MovieDB
            </Link>
        </div>
    </header>
);

export default Header;
