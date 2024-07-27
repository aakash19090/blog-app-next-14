import PostCard from '@/components/PostCard';

import { getAllPosts } from '@/lib/utils';

import styles from './blog.module.css';

export default async function BlogPage() {
    const posts = await getAllPosts();

    return (
        <div className={styles.container}>
            {posts.map((post: any) => (
                <div className={styles.post} key={post.id}>
                    <PostCard post={post} />
                </div>
            ))}
        </div>
    );
}
