import { title } from 'process';
import { Metadata } from 'next';
import Image from 'next/image';
import { Suspense } from 'react';

import PostUser from '@/components/PostUser';

import { getFormattedDate, getSinglePost } from '@/lib/utils';

import { IPost } from '@/types/types';

import styles from './singlePost.module.css';

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
    const post: IPost | null = await getSinglePost(params.slug);

    return {
        title: post?.title,
        description: post?.description,
    };
};

const SinglePostPage = async ({ params }: any) => {
    /** This is sequential data fetching in Next.js as api call in PostUser depends on Single Post api call as post.userId prop is passed */
    // https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#sequential-data-fetching

    const post: IPost | null = await getSinglePost(params.slug);

    const { img, title, description, createdAt, userId } = post!;

    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>{img && <Image src={img} alt='' fill className={styles.img} />}</div>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.detail}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <PostUser userId={userId!} />
                    </Suspense>

                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValue}>{createdAt ? getFormattedDate(createdAt) : 'N/A'}</span>
                    </div>
                </div>
                <div className={styles.content}>{description}</div>
            </div>
        </div>
    );
};

export default SinglePostPage;
