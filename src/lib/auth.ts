import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';

import bcrypt from 'bcryptjs';

import { connectToDB } from '@/lib/db';
import { User } from '@/lib/models';

// NextAuth configuration
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    // Configure GitHub as the authentication provider
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Credentials({
            authorize: async (credentials: { username: string; password: string }) => {
                const { username, password } = credentials;
                connectToDB();

                /**
                 * Find the user with the given username
                 * No need to check if the user exists or the crendeitals are correct as
                 * that's already checked within handleLoginWithCredentials action and then passed here
                 */

                const user = await User.findOne({ username });
                return user;
            },
        }),
    ],
    callbacks: {
        // This callback runs whenever a user tries to sign in
        async signIn({ user, account, profile, email, credentials }) {
            // Check if the user is signing in with a GitHub account
            if (account?.provider === 'github') {
                // Connect to the MongoDB database
                await connectToDB();
                try {
                    // Check if a user with the given email already exists in the database
                    const existingUser = await User.findOne({ email: profile?.email });
                    // If the user does not exist, create a new user in the database
                    if (!existingUser) {
                        const newUser = new User({
                            username: profile?.login,
                            email: profile?.email,
                            img: profile?.avatar_url,
                            isAdmin: false,
                        });
                        // Save the new user to the database
                        await newUser.save();
                    }
                } catch (error) {
                    // Log any errors that occur during the user creation process
                    console.error('Failed to create user in DB during Sign In:', error);
                    // Return false to indicate that the sign-in process failed
                    return false;
                }
            }
            // Return true to indicate that the sign-in process succeeded
            return true;
        },
    },
});
