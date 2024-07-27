import { getPostUser } from '@/lib/utils';

import { IUser } from '@/types/types';

import styles from './postUser.module.css';

type PostUserProps = {
    userId: string;
};

const PostUser = async ({ userId }: PostUserProps) => {
    const user: IUser | null = await getPostUser(userId);

    return (
        <div className={styles.container}>
            <span className={styles.title}>Author</span>
            <span className={styles.username}> {user?.username} </span>
        </div>
    );
};

export default PostUser;
