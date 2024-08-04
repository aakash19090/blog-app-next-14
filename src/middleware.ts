import NextAuth from 'next-auth';

import { authConfig } from './lib/auth.config';

export default NextAuth(authConfig).auth;

export const config = {
    // This regex pattern matches all paths except those that:
    // - Start with "api"
    // - Start with "static"
    // - Contain a dot (indicating a file with an extension)
    // - Start with "_next"
    // Examples of paths that will match:
    // - "/home"
    // - "/about"
    // - "/user/profile"
    // - "/blog/posts"
    // Examples of paths that will not match:
    // - "/api/users"
    // - "/static/images/logo.png"
    // - "/styles/main.css"
    // - "/_next/static/chunks/main.js"
    matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};
