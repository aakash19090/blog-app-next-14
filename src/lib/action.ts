'use server';

import { revalidatePath } from 'next/cache';

import { connectToDB } from './db';
import { Post } from './models';

export const createNewPost = async (formData: FormData) => {
    const { title, slug, description, userId } = Object.fromEntries(formData);
    try {
        connectToDB();
        const newPost = new Post({ title, slug, description, userId });
        await newPost.save();
        console.log('Saved to db');
        revalidatePath('/blog');
    } catch (error: any) {
        console.log('error', error);
        return { error: 'Something Went Wrong! Please try again' };
    }
};

export const deletePost = async (formData: FormData) => {
    const { id } = Object.fromEntries(formData);
    try {
        connectToDB();
        await Post.findByIdAndDelete(id);
        console.log('Deleted from db');
        revalidatePath('/blog');
    } catch (error: any) {
        console.log('error', error);
        return { error: 'Something Went Wrong! Please try again' };
    }
};
