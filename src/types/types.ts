import { Document } from 'mongoose';

// Define an interface representing a document in MongoDB.
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    img?: string;
    isAdmin?: boolean;
}

// Define an interface representing a document in MongoDB.
export interface IPost extends Document {
    title: string;
    description: string;
    img?: string;
    userId: string;
    slug: string;
}
