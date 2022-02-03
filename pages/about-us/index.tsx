import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import classes from './AboutUs.module.css';

/**
 * About us page.
 * 
 * @returns {JSX.Element} - Rendered page: About us page.
 */
const AboutUs: NextPage = (): JSX.Element => {
	return (
		<>
			<Head>
				<title>About Us</title>
			</Head>
			<p className={classes.lorem}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ipsa, laboriosam maxime fugit neque veritatis? Distinctio possimus inventore velit assumenda voluptate amet aliquid quas dignissimos repellat cum excepturi, itaque atque!
			</p>
		</>
	);
};

export default AboutUs;