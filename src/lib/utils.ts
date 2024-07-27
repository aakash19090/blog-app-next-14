import { connectToDB } from '@/lib/db';
import { Post, User } from '@/lib/models';

connectToDB();

export const getAllPosts = async () => {
    try {
        const posts = await Post.find();
        return posts;
    } catch (error: any) {
        console.log(error);
        throw new Error('Failed to fetch posts!');
    }
};

export const getSinglePost = async (slug: string) => {
    try {
        const post = await Post.findOne({ slug });
        return post;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
};

export const getPostUser = async (userId: string) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
};
