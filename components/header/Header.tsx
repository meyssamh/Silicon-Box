import React, { useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import { useSession, signOut } from 'next-auth/client';

import classes from './Header.module.css';
import Drawer from '@/drawer/Drawer';
import DrawerContext from '%/drawer-context';

/**
 * Functional react component for header.
 * 
 * @returns {JSX.Element} Rendered component: A header.
 */
const Header: React.FC = (): JSX.Element => {
	const DrawerCtx = useContext(DrawerContext);
	const [session, loading] = useSession();

	// duration for csstransition
	const duration = 500;

	// Displays the drawer for smaller screens.
	const menuClickHandler = () => {
		DrawerCtx.showDrawer();
	};

	// Logs the user out.
	const logoutHandler = () => {
		signOut();
	};

	// TODO: add a menu for loged in user instead of log out icon.

	return (
		<>
			{/* drawer */}
			<CSSTransition
				in={DrawerCtx.displayDrawer}
				timeout={duration}
				classNames={"drawer-slide"}
			>
				<div className={classes.drawerMenu}>
					<Drawer />
				</div>
			</CSSTransition>
			{/* header */}
			<header className={classes.header}>
				{/* header for devices with small screen */}
				<ul className={classNames(classes.ul, classes.sm)}>
					{/* menu icon. By clicking drawer will show up. */}
					<li onClick={menuClickHandler}>
						<span className={"material-icons"}>menu</span>
					</li>
					{/* logo. By clicking user will go to homepage. */}
					<li className={classes.logo}>
						<Link href={'/'} passHref={true}>
							<a>
								<Image src={"/logo.jpg"} alt={"logo"} width={164} height={47} />
							</a>
						</Link>
					</li>
					{!session && !loading && (
						// login icon. By clicking user will go to auth page.
						<li>
							<Link href={"/auth"} passHref={true}>
								<span className={"material-icons"}>login</span>
							</Link>
						</li>
					)}
					{session && (
						// logout icon button. by clicking user will logout
						<li>
							<button className={classes.button} onClick={logoutHandler}>
								<span className={"material-icons"}>logout</span>
							</button>
						</li>
					)}
				</ul>
				{/* header for devices with medium and big screen */}
				<ul className={classNames(classes.ul, classes.lg)}>
					{/* shopping cart icon. By clicking user will go to cart page. */}
					<li className={classes.icon}>
						<Link href={'/cart'} passHref={true}>
							<span className={"material-icons"}>
								shopping_cart
							</span>
						</Link>
					</li>
					<li>
						{/* navigation items for different categories */}
						<ul className={classNames(classes.ul, classes.navigation)}>
							{/* link to women category */}
							<li>
								<Link href={'/category/women'} >
									<a className={classNames(classes.link)}>
										women
									</a>
								</Link>
							</li>
							{/* link to men category */}
							<li>
								<Link href={'/category/men'} >
									<a className={classNames(classes.link)}>
										men
									</a>
								</Link>
							</li>
							{/* logo. By clicking user will go to homepage. */}
							<li className={classes.logo}>
								<Link href={'/'} passHref={true}>
									<a>
										<Image src={"/logo.jpg"} alt={"logo"} width={164} height={47} />
									</a>
								</Link>
							</li>
							{/* link to baby category */}
							<li>
								<Link href={'/category/baby'} >
									<a className={classNames(classes.link)}>
										baby
									</a>
								</Link>
							</li>
							{/* link to home category */}
							<li>
								<Link href={'/category/home'} >
									<a className={classNames(classes.link)}>
										home
									</a>
								</Link>
							</li>
						</ul>
					</li>
					{!session && !loading && (
						// login icon. by clicking user will go to auth page. 
						<li className={classes.icon}>
							<Link href={"/auth"} passHref={true}>
								<span className={"material-icons"}>login</span>
							</Link>
						</li>
					)}
					{session && (
						// logout icon button. by clicking user will logout
						<li>
							<button className={classes.button} onClick={logoutHandler}>
								<span className={"material-icons"}>logout</span>
							</button>
						</li>
					)}
				</ul>
			</header>
		</>
	);
};

Header.displayName = "Header";

export default Header;
