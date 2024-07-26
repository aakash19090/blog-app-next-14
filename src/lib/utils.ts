import mongoose, { Connection } from 'mongoose';

interface ConnectionType {
    isConnected?: Connection['readyState'];
}

const connection: ConnectionType = {};

export const connectToDB = async (): Promise<void> => {
    try {
        if (connection.isConnected) {
            console.log('Using existing connection');
            return;
        }
        const db = await mongoose.connect(
            process.env.MONGO_CONNECTION_STRING as string
        );
        connection.isConnected = db.connections[0].readyState;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
};
