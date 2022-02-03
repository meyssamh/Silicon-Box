import React from 'react';

import Header from '@/header/Header';
import Footer from '@/footer/Footer';
import classes from './Layout.module.css';

/**
 * Functional react higher order component for identical style.
 * 
 * @param {LayoutPropsInterface} props - React props.
 * @returns {JSX.Element} Rendered component: An HOC for identical style.
 */
const Layout: React.FC<LayoutPropsInterface> = (props: LayoutPropsInterface): JSX.Element => {
	return (
		<>
			<div className={classes.container}>
				{/* header */}
				<Header />
				{/* main  */}
				<main>{props.children}</main>
				{/* footer */}
				<div className={classes.footer}>
					<Footer />
				</div>
			</div>
		</>
	);
};

export default Layout;