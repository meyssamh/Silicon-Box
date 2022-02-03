import React from 'react';
import Link from 'next/link';

import classes from './Footer.module.css';

/**
 * Functional react component for footer.
 * 
 * @returns {JSX.Element} - Rendered component: A footer.
 */
const Footer: React.FC = (): JSX.Element => {
	return (
		<footer className={classes.footer}>
			{/*  fotter information */}
			<div className={classes.main}>
				{/* link to about us */}
				<Link href={'/about-us'}>
					<a className={classes.link}>
						About us
					</a>
				</Link>
				<div>
					<p>Contact us:</p>
					<p>123 456 789 0</p>
				</div>
			</div>
			{/* caution */}
			<p className={ classes.caution}>
				Caution! This website is just a dummy website!
			</p>
		</footer>
	);
};

export default Footer;