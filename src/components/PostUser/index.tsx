import styles from './postUser.module.css';
import Image from 'next/image';

type PostUserProps = {
    userId: string;
};

const getUser = async (userId: string) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        {
            cache: 'no-store',
        }
    );

    if (!response.ok) {
        throw new Error('Something went wrong!');
    }

    return response.json();
};

const PostUser = async ({ userId }: PostUserProps) => {
    const user = await getUser(userId);

    return (
        <div className={styles.container}>
            <span className={styles.title}>Author</span>
            <span className={styles.username}> {user.username} </span>
        </div>
    );
};

export default PostUser;
