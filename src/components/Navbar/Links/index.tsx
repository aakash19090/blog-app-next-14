'use client';

import Image from 'next/image';
import { useState } from 'react';

import NavLink from '@/components/Navbar/Links/NavLink';

import { handleLogout } from '@/lib/action';

import styles from './links.module.css';

const links = [
    {
        title: 'Homepage',
        path: '/',
    },
    {
        title: 'About',
        path: '/about',
    },
    {
        title: 'Contact',
        path: '/contact',
    },
    {
        title: 'Blog',
        path: '/blog',
    },
];

const Links = ({ session }: { session: Session | null }) => {
    const [open, setOpen] = useState(false);
    const isAdmin = true;

    return (
        <div className={styles.container}>
            <div className={styles.links}>
                {links.map((link) => (
                    <NavLink item={link} key={link.title} />
                ))}

                {session?.user ? (
                    <>
                        {session?.user?.isAdmin && <NavLink item={{ title: 'Admin', path: '/admin' }} />}
                        <form action={handleLogout}>
                            <button className={styles.logout}>Logout</button>
                        </form>
                    </>
                ) : (
                    <NavLink item={{ title: 'Login', path: '/login' }} />
                )}
            </div>
            <Image
                className={styles.menuButton}
                src='/menu.png'
                alt=''
                width={30}
                height={30}
                onClick={() => setOpen((prev) => !prev)}
            />
            {open && (
                <div className={styles.mobileLinks}>
                    {links.map((link) => (
                        <NavLink item={link} key={link.title} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Links;
