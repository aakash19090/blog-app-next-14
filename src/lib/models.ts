import mongoose, { Model, Schema } from 'mongoose';

// Define the user schema
const userSchema: Schema<IUser> = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 30,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            maxlength: 50,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        img: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

// Define the post schema
const postSchema: Schema<IPost> = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        img: {
            type: String,
        },
        userId: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

// Create the User model
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

// Create the Post model
export const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);
