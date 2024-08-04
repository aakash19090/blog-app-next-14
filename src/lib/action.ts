'use server';

import { revalidatePath } from 'next/cache';

import bcrypt from 'bcryptjs';

import { signIn, signOut } from '@/lib/auth';
import { connectToDB } from '@/lib/db';
import { Post, User } from '@/lib/models';

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

export const handleGithubLogin = async () => {
    await signIn(`github`);
};

export const handleLogout = async () => {
    await signOut();
};

/**
 * Registers a new user with the provided form data.
 *
 * @param {FormData} formData - The form data containing user details.
 * @returns {Promise<Object>} - An object containing an error message if any error occurs.
 */
export const registerUser = async (prevState: any, formData: FormData) => {
    // Destructure the form data to extract individual fields
    const { username, email, password, passwordRepeat, img } = Object.fromEntries(formData);

    // Check if the password and passwordRepeat fields match
    if (password !== passwordRepeat) {
        return { error: 'Passwords do not match' };
    }

    try {
        connectToDB();

        // Check if a user with the same username already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return { error: 'Username already exists' };
        }

        const saltRounds = 10; // You can adjust the salt rounds as needed

        // Hash the password with the specified number of salt rounds
        const hashedPassword = await bcrypt.hash(password.toString(), saltRounds);

        // Create a new user with the hashed password and other details
        const newUser = new User({ username, email, password: hashedPassword, img });

        // Save the new user to the database
        await newUser.save();
        console.log('New user saved to db');
        return { success: true };
    } catch (error: any) {
        console.log('error', error);
        return { error: 'Something Went Wrong! Please try again' };
    }
};

export const handleLoginWithCredentials = async (prevState: any, formData: FormData) => {
    const { username, password } = Object.fromEntries(formData);

    try {
        connectToDB();

        const user = await User.findOne({ username });

        if (!user) {
            return { error: 'Invalid Credentials! Please try again' };
        }

        const isPasswordValid = await bcrypt.compare(password.toString(), user.password);

        if (!isPasswordValid) {
            return { error: 'Invalid Credentials! Please try again' };
        }

        // If the password is valid, pass the credentials to the signIn callback in NextAuth
        await signIn('credentials', { redirect: false, username, password });
    } catch (error: any) {
        console.log('error', error);
        if (error.message.includes('CredentialsSignin')) {
            return { error: 'Invalid username or password' };
        }
        throw error;
    }
};
