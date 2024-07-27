import Image from 'next/image';
import { Suspense } from 'react';

import PostUser from '@/components/PostUser';

import { getSinglePost } from '@/lib/utils';

import { IPost } from '@/types/types';

import styles from './singlePost.module.css';

const SinglePostPage = async ({ params }: any) => {
    /** This is sequential data fetching in Next.js as api call in PostUser depends on Single Post api call as post.userId prop is passed */
    // https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#sequential-data-fetching
    const post: IPost | null = await getSinglePost(params.slug);

    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                {post?.img && <Image src={post?.img} alt='' fill className={styles.img} />}
            </div>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>{post?.title}</h1>
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
                        <PostUser userId={post?.userId!} />
                    </Suspense>

                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValue}>01.01.2024</span>
                    </div>
                </div>
                <div className={styles.content}>{post?.description}</div>
            </div>
        </div>
    );
};

export default SinglePostPage;
