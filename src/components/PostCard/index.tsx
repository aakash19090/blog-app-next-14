import Image from 'next/image';
import Link from 'next/link';

import styles from './postcard.module.css';

type PostCardProps = {
    post: {
        title: string;
        body: string;
        img: string;
        createdAt: string;
        slug: string;
        id: string;
    };
};

const PostCard = ({ post }: PostCardProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.imgContainer}>
                    <Image src={post.img} alt='' fill className={styles.img} />
                </div>
                <span className={styles.date}>
                    01.01.2024
                    {/* {post.createdAt?.toString().slice(4, 16)} */}
                </span>
            </div>
            <div className={styles.bottom}>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.desc}>{post.body}</p>
                <Link className={styles.link} href={`/blog/${post.slug}`}>
                    READ MORE
                </Link>
            </div>
        </div>
    );
};

export default PostCard;
