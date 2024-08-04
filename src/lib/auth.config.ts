import type { NextAuthConfig } from 'next-auth';

/**
 * Configuration object for NextAuth.
 * This object contains settings for pages, providers, and callbacks.
 */
export const authConfig: NextAuthConfig = {
    // Custom pages for authentication
    pages: {
        signIn: '/login', // Custom sign-in page URL
    },
    providers: [], // Array of authentication providers (e.g., Google, GitHub, etc.)

    callbacks: {
        /**
         * * jwt callback function that is called whenever a JWT token is created or updated.
         *
         * @param {Object} params - The parameters object.
         * @param {Object} params.token - The current JWT token.
         * @param {Object} params.user - The user object (only available on sign-in).
         * @returns {Object} - The updated token.
         */
        jwt: async ({ token, user, account }: any) => {
            // If the user object is available (i.e., on sign-in), add custom properties to the token
            if (user) {
                token.id = user.id; // Add user ID to the token
                token.isAdmin = account.provider === 'github' ? false : user?.isAdmin; // Add isAdmin flag to the token
            }
            return token; // Return the updated token
        },

        /**
         * * session callback function that is called whenever a session is checked or created.
         *
         * @param {Object} params - The parameters object.
         * @param {Object} params.session - The current session object.
         * @param {Object} params.token - The current JWT token.
         * @returns {Object} - The updated session.
         */
        session: async ({ session, token }: any) => {
            // Add custom properties from the token to the session object
            session.user.id = token.id; // Add user ID to the session
            session.user.isAdmin = token.isAdmin; // Add isAdmin flag to the session
            return session; // Return the updated session
        },

        /**
         * * authorized callback function that is called to check if a user is authorized to access a page.
         * * Protected routes logic can be checked here through middleware
         * @param {Object} params - The parameters object.
         * @param {Object} params.auth - The authentication object.
         * @param {Object} params.request - The request object.
         * @returns {boolean} - Whether the user is authorized.
         */
        authorized: async ({ auth, request }) => {
            // Custom logic to determine if the user is authorized
            const user = auth?.user;
            const isOnAdminPanel = request.nextUrl?.pathname.startsWith('/admin');
            const isOnBlogPage = request.nextUrl?.pathname.startsWith('/blog');
            const isOnLoginPage = request.nextUrl?.pathname.startsWith('/login');

            // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD

            if (isOnAdminPanel && !user?.isAdmin!) {
                return false;
            }

            // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE

            if (isOnBlogPage && !user) {
                return false;
            }

            // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

            if (isOnLoginPage && user) {
                return Response.redirect(new URL('/', request.nextUrl));
            }

            return true;
        },
    },
};
