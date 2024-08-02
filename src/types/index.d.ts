import { Session } from 'next-auth';

declare global {
    // Define an interface representing a document in MongoDB.
    interface IUser {
        username: string;
        email: string;
        password: string;
        img?: string;
        isAdmin?: boolean;
        createdAt?: string;
    }

    // Define an interface representing a document in MongoDB.
    interface IPost {
        title: string;
        description: string;
        img?: string;
        userId: string;
        slug: string;
        createdAt?: Date;
    }

    interface Session extends Session {
        user?: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            isAdmin?: boolean | null;
        };
        expires: ISODateString;
    }
}

export {}; // This ensures the file is treated as a module.
