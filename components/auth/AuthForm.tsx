import React, { useState, useRef } from 'react';
import { signIn } from 'next-auth/client';
import { useRouter, NextRouter } from 'next/router';

import Button from '@/UI/button/Button';
import classes from './AuthForm.module.css';

/**
 * A function for creating new user when they sign up.
 * 
 * @param {string} email - Users email address.
 * @param {string} password - Users password.
 * @returns {Promise} - A Promise, that we can use to show feedback to the users.
 */
async function createUser(email: string, password: string) {
	// posts email and password to the api and waits for the response
	const response = await fetch('/api/auth/signup', {
		method: 'POST',
		body: JSON.stringify({ email, password }),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	// parses the response into json form and waits for the promise
	const data = await response.json();

	// throws an error when the response is not ok
	if (!response.ok) {
		throw new Error(data.message || 'Something went wrong!');
	}

	return data;
};

/**
 * Functional react component for Authentication.
 * 
 * @returns {JSX.Element} - Rendered component: A Form for login or Sign up.
 */
const AuthForm: React.FC = (): JSX.Element => {
	const emailInputRef: React.MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>();
	const passwordInputRef: React.MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>();
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const router: NextRouter = useRouter();

	// Switches the form mode between login and sign up.
	const switchAuthModeHandler: () => void = () => {
		setIsLogin(prevState => !prevState);
	};

	/**
	 * A function to login or create a new user.
	 * 
	 * @param {React.SyntheticEvent} event - Just for preventing the default behaviour.
	 */
	const submitHandler = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		const enteredEmail: string = emailInputRef.current.value;
		const enteredPassword: string = passwordInputRef.current.value;

		// TODO: email and password validation in frontend

		// TODO: make a feedback for users

		if (isLogin) {
			const result = await signIn('credentials', {
				redirect: false,
				email: enteredEmail,
				password: enteredPassword,
			});

			if (!result.error) {
				router.replace('/');
			}
			console.log(result);
		} else {
			try {
				const result = await createUser(enteredEmail, enteredPassword);
				console.log(result);
			} catch (error) {
				console.log(error);
			}
		}
	};

	// TODO: make Input component and use the component

	return (
		<section className={classes.auth}>
			{/* orm title */}
			<h3>{isLogin ? 'Login' : 'Sign up'}</h3>
			<form onSubmit={submitHandler}>
				{/* email input */}
				<div className={classes.input}>
					<label htmlFor='email'>E-mail</label>
					<input type={'email'} id={'email'} ref={emailInputRef} required />
				</div>
				<br />
				{/* password input */}
				<div className={classes.input}>
					<label>Password</label>
					<input type={'password'} id={'password'} ref={passwordInputRef} required />
				</div>
				{/* actions */}
				<div className={classes.actions}>
					{/* button to login or sign up */}
					<Button style={{ width: '150px' }}>
						{isLogin ? 'Login' : 'Create Account'}
					</Button>
					<br />
					{/* button to switch the form mode */}
					<Button
						onClick={switchAuthModeHandler}
						style={{ width: '200px' }}
					>
						{isLogin ? 'Create new account' : 'Login with existing account'}
					</Button>
				</div>
			</form>
		</section>
	);
};

export default AuthForm;