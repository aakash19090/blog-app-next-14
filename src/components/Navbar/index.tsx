import Link from 'next/link';

import Links from '@/components/Navbar/Links';

import styles from './navbar.module.css';

const Navbar = async () => {
    return (
        <div className={styles.container}>
            <Link href='/' className={styles.logo}>
                Logo
            </Link>
            <div>
                <Links />
            </div>
        </div>
    );
};

export default Navbar;
