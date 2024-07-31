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
}

export {}; // This ensures the file is treated as a module.
