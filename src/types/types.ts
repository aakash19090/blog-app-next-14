// Define an interface representing a document in MongoDB.
export interface IUser {
    username: string;
    email: string;
    password: string;
    img?: string;
    isAdmin?: boolean;
    createdAt?: string;
}

// Define an interface representing a document in MongoDB.
export interface IPost {
    title: string;
    description: string;
    img?: string;
    userId: string;
    slug: string;
    createdAt?: Date;
}
