import Image from 'next/image';
import styles from './singlePost.module.css';
import { Suspense } from 'react';
import PostUser from '@/components/PostUser';

const getData = async (slug: string) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${slug}`,
        {
            next: {
                revalidate: 3600,
            },
        }
    );

    if (!response.ok) {
        throw new Error('Something went wrong!');
    }

    return response.json();
};

const SinglePostPage = async ({ params }: any) => {
    /** This is sequential data fetching in Next.js as api call in PostUser depends on Single Post api call as post.userId prop is passed */
    // https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#sequential-data-fetching

    const post = await getData(params.slug);

    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image
                    src={
                        'https://images.pexels.com/photos/21430948/pexels-photo-21430948/free-photo-of-a-man-holding-a-camera.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
                    }
                    alt=''
                    fill
                    className={styles.img}
                />
            </div>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>{post.title}</h1>
                <div className={styles.detail}>
                    <Image
                        src={
                            'https://images.pexels.com/photos/21430948/pexels-photo-21430948/free-photo-of-a-man-holding-a-camera.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
                        }
                        alt=''
                        width={50}
                        height={50}
                        className={styles.avatar}
                    />
                    <Suspense fallback={<div>Loading...</div>}>
                        <PostUser userId={post.userId} />
                    </Suspense>

                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValue}>01.01.2024</span>
                    </div>
                </div>
                <div className={styles.content}>{post.body}</div>
            </div>
        </div>
    );
};

export default SinglePostPage;
