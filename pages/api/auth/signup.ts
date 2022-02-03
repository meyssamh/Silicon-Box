import { hashPassword } from '#/auth';
import { connectToDatabase } from '#/db';

const handler = async (req, res) => {
	// if the fetch method is not POST we return and do nothing
	if (req.method !== 'POST') {
		return;
	}

	// getting email and password from request
	const data = req.body;
	const { email, password } = data;

	// checking if email and password are valid
	if (!email || !email.includes('@') || !password || password.trim().length < 7) {
		res.status(422).json({
			message:
				'Invalid input - password should also be at least 7 characters long.'
		});
		return;
	}

	// connecting to database
	const client = await connectToDatabase();
	const db = client.db();

	// checking if the email address already exists in our database
	const existingUser = await db.collection('users').findOne({ email: email });

	// throwing an error, so we don't create one user multiple times
	if (existingUser) {
		res.status(422).json({ message: 'User exists already!' });
		// closing the connection to database
		client.close();
		return;
	}

	// hashing password for more security
	const hashedPassword = await hashPassword(password);

	// storing emai and password in users collection in database
	const result = await db.collection('users').insertOne({
		email: email,
		password: hashedPassword
	});

	// sending an ok response 
	res.status(201).json({ message: 'Created user!' });
	// closing the connection to database
	client.close();
};

export default handler;