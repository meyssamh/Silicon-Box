import NextAuth from 'next-auth';
import Providers from "next-auth/providers";

import { connectToDatabase } from '#/db';
import { verifyPassword } from '#/auth';

export default NextAuth({
	session: {
		jwt: true,
	},
	providers: [
		Providers.Credentials({
			name: 'Credentials',
			credentials: {
				email: {label: "Email", type: "email"},
				password: {label: "Password", type: "password"},
			},
			async authorize(credentials) {
				// connecting to database
				const client = await connectToDatabase();

				// getting data from users collection
				const usersCollection = client.db().collection('users');

				// checking if the email address exists in our users collection
				const user = await usersCollection.findOne({ email: credentials.email });

				// throwing an error in cases that the user does not exists in our users collection
				if (!user) {
					// closing the connection to database
					client.close();
					throw new Error('No user found!');
				}

				// checking if the entered password matches the users password
				const isValid = await verifyPassword(credentials.password, user.password);

				// throwing an error if the passwords do not match
				if (!isValid) {
					// closing the connection to database
					client.close();
					throw new Error('Could not log you in!');
				}

				// closing the connection to database
				client.close();
				// returning users email to use it in status of useSession
				return { email: user.email };
			}
		})
	],
});