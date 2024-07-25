import styles from './blog.module.css';
import PostCard from '@/components/PostCard';

const getData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        next: {
            revalidate: 5,
        },
    });

    if (!response.ok) {
        throw new Error('Something went wrong!');
    }

    return response.json();
};

export default async function BlogPage() {
    const posts = await getData();
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
