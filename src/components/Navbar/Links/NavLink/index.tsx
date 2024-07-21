'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './navLink.module.css';

type NavLinkProps = {
    item: {
        title: string;
        path: string;
    };
};

const NavLink = ({ item }: NavLinkProps) => {
    const pathname = usePathname();

    return (
        <Link
            href={item.path}
            className={`${styles.container} ${
                pathname === item.path && styles.active
            }`}
        >
            {item.title}
        </Link>
    );
};

export default NavLink;
