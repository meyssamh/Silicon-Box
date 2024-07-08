import { MongoClient } from 'mongodb';

/**
 * Connects our backend to MongoDB.
 * 
 * @returns {Promise} - Connection to MongoDB.
 */
export async function connectToDatabase(): Promise<MongoClient> {
	const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.0aecz4x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

	// connect to mongodb 
	const client = await MongoClient.connect(
		connectionString
	);

	return client;
};