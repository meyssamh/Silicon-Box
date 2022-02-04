import React, { useContext } from 'react';
import { useRouter, type NextRouter } from 'next/router';
import classNames from 'classnames';

import classes from './Drawer.module.css';
import DrawerContext from '%/drawer-context';

/**
 * Functional react component for drawer menu in devices with small screens.
 * 
 * @returns {JSX.Element} - Rendered component: A drawer menu for smaller screens.
 */
const Drawer: React.FC = (): JSX.Element => {
	const router: NextRouter = useRouter();
	const DrawerCtx: DrawerContextInterface = useContext(DrawerContext);

	const hideDrawerHandler: () => void = () => {
		DrawerCtx.hideDrawer();
	};

	const linkClickHandler = event => {
		router.push(`/category/${event.target.innerText}`);
		DrawerCtx.hideDrawer();
	};

	const cartLinkClickHandler = () => {
		router.push('/cart');
		DrawerCtx.hideDrawer();
	};

	return (
		<ul className={classes.ul}>
			{/* title */}
			<div className={classes.menu}>
				<h3 className={classes.title}>Menu</h3>
				{/* arrow for hiding the drawer */}
				<span
					className={"material-icons"}
					onClick={hideDrawerHandler}
				>
					arrow_back
				</span>
			</div>
			{/* link to women category */}
			<li className={classes.li} onClick={linkClickHandler}>
				<a className={classes.link}>
					women
				</a>
			</li>
			{/* link to men category */}
			<li className={classes.li} onClick={linkClickHandler}>
				<a className={classes.link}>
					men
				</a>
			</li>
			{/* link to baby category */}
			<li className={classes.li} onClick={linkClickHandler}>
				<a className={classes.link}>
					baby
				</a>
			</li>
			{/* link to home category */}
			<li className={classes.li} onClick={linkClickHandler}>
				<a className={classes.link}>
					home
				</a>
			</li>
			{/* link to cart */}
			<li
				className={classNames(classes.li, classes.cart)}
				onClick={cartLinkClickHandler}
			>
				<a className={classes.link}>
					cart
				</a>
			</li>
		</ul>
	);
};

export default Drawer;