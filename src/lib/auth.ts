import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

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
                            password: 'test@123', // Placeholder password, should be handled securely
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
