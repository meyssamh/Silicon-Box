import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import AuthForm from '@/auth/AuthForm';

/**
 * Authentication page.
 * 
 * @returns {JSX.Element} - Rendered page: Authentication page.
 */
const Auth: NextPage = (): JSX.Element => {

	// TODO: show spinner while user signs up or logs in.
	
	return (
		<>
			<Head>
				<title>Authentication</title>
			</Head>
			<AuthForm />
		</>
	);
};

export default Auth;