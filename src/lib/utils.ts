import { unstable_noStore as noStore, unstable_cache } from 'next/cache';

import { connectToDB } from '@/lib/db';
import { Post, User } from '@/lib/models';

// Establish a connection to the database
connectToDB();

/**
 * Introduces a delay for a specified number of milliseconds.
 * @param ms - Number of milliseconds to delay.
 * @returns A promise that resolves after the specified delay.
 */
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Formats a given date into a readable string.
 * @param dateInput - The date to format, either as a string or Date object.
 * @returns A formatted date string.
 */
export const getFormattedDate = (dateInput: string | Date): string => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

/**
 * Fetches all posts from the database.
 * @returns A promise that resolves to an array of posts.
 * @throws An error if fetching posts fails.
 */
export const getAllPosts = async () => {
    try {
        const posts = await Post.find();
        return posts;
    } catch (error: any) {
        console.error('Failed to fetch posts:', error);
        throw new Error('Failed to fetch posts!');
    }
};

/**
 * Fetches a single post by its slug from the database.
 * @param slug - The slug of the post to fetch.
 * @returns A promise that resolves to the post.
 * @throws An error if fetching the post fails.
 */
export const getSinglePost = async (slug: string) => {
    try {
        const post = await Post.findOne({ slug });
        return post;
    } catch (error: any) {
        console.error('Failed to fetch post:', error);
        throw new Error('Failed to fetch post!');
    }
};

/**
 * Fetches a user by their ID from the database without using cache.
 * This function opts out of static rendering and indicates that the component should not be cached.
 * Reference -> https://nextjs.org/docs/app/api-reference/functions/unstable_noStore
 * @param userId - The ID of the user to fetch.
 * @returns A promise that resolves to the user.
 * @throws An error if fetching the user fails.
 */
export const getPostUser = async (userId: string) => {
    noStore();
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error: any) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user!');
    }
};

/**
 * Fetches a user by their ID from the database using cache.
 * This function returns a promise that resolves to the cached data.
 * If the data is not in the cache, the provided function will be invoked, and its result will be cached and returned.
 * Reference -> https://nextjs.org/docs/app/api-reference/functions/unstable_cache
 * @param userId - The ID of the user to fetch.
 * @returns A promise that resolves to the user.
 * @throws An error if fetching the user fails.
 */
export const getCachedPostUser = unstable_cache(
    async (userId: string) => {
        try {
            const user = await User.findById(userId);
            return user;
        } catch (error: any) {
            console.error('Failed to fetch user:', error);
            throw new Error('Failed to fetch user!');
        }
    },
    ['my-app-user'], // Cache key
);
