import mongoose, { Connection } from 'mongoose';

interface ConnectionType {
    isConnected?: Connection['readyState'];
}

// Create a connection object to store the connection state
const connection: ConnectionType = {};

// Export an asynchronous function to connect to the MongoDB database
export const connectToDB = async (): Promise<void> => {
    try {
        // Check if there is already an existing connection
        if (connection.isConnected) {
            console.log('Using existing connection');
            return;
        }

        // Retrieve the MongoDB connection string from environment variables
        const connectionString = process.env.MONGO_CONNECTION_STRING as string;

        // Define options for the MongoDB connection
        const options = {
            retryWrites: true, // Enable retryable writes
            w: 'majority' as any, // Set the write concern to 'majority'
            appName: process.env.MONGO_APP_NAME, // Set the application name from environment variables
            dbName: process.env.MONGO_DB_NAME, // Set the database name from environment variables
        };

        // Attempt to connect to the MongoDB database
        const db = await mongoose.connect(connectionString, options);

        // Store the connection state in the connection object
        connection.isConnected = db.connections[0].readyState;
    } catch (error: any) {
        // Log any errors that occur during the connection attempt
        console.log(error);
        // Throw a new error with the caught error message
        throw new Error(error);
    }
};
