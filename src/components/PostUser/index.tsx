import Image from 'next/image';

import { getCachedPostUser, getPostUser } from '@/lib/utils';

import { IUser } from '@/types/types';

import styles from './postUser.module.css';

type PostUserProps = {
    userId: string;
};

const PostUser = async ({ userId }: PostUserProps) => {
    const user: IUser | null = await getPostUser(userId);

    return (
        <div className={styles.container}>
            <Image src={user?.img || '/noavatar.png'} alt='' width={50} height={50} className={styles.avatar} />
            <div className={styles.texts}>
                <span className={styles.title}>Author</span>
                <span className={styles.username}> {user?.username} </span>
            </div>
        </div>
    );
};

export default PostUser;
