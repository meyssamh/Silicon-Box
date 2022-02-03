import React, { useState, useEffect } from 'react';
import type {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	NextPage,
	PreviewData,
} from 'next';
import type { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';

import Product from '@/product/Product';
import Button from '@/UI/button/Button';
import classes from './Cart.module.css';

/**
 * Cart page.
 * 
 * @returns {JSX.Element} - Rendered page: Cart page.
 */
const Cart: NextPage = (): JSX.Element => {
	const [items, setItems] = useState('');

	// Fills the items with cart-items after initial render.
	useEffect(() => {
		const cartItems = localStorage.getItem('cart-items');
		setItems(cartItems);
	}, [items]);

	const removeItemHandler = (id: string) => {
		// pasring items to JSON format
		const cartItems = JSON.parse(items);
		// filtering the chosen item out of the array
		const newCartItems = cartItems.filter(item => item.id !== id);
		// making an string from array
		const stringifiedItems = JSON.stringify(newCartItems);
		// saving new cart items to localStorage and to state
		localStorage.setItem('cart-items', stringifiedItems);
		setItems(stringifiedItems);

		// TODO: show feedback to user
	};

	const purchaiseHandler = () => {
		// remove all items from localStorage and state
		localStorage.removeItem('cart-items');
		setItems('');

		// TODO: show feedback to user
	};

	let totalPrice = 0;
	let cartItems = [];
	let emptyCart = 'Your cart is empty. Please buy something first!';
	if (items) {
		// Parses items to JSON and maps on it to get all items.
		cartItems = JSON.parse(items).map(item => {
			const price = Number.parseFloat(item.price);
			// sums the total price
			totalPrice += (item.amount * price);
			return (
				<Product
					title={item.title}
					image={item.image}
					id={item.id}
					key={item.id}
					price={item.price}
					amount={item.amount}
				>
					<section className={classes.action}>
						{/* button for removin item from cart */}
						<Button
							style={{
								width: '100px',
								color: 'red',
								backgroundColor: '#fff8f8'
							}}
							onClick={removeItemHandler.bind(null, item.id)}
						>
							Remove Item
						</Button>
					</section>
				</Product>
			);
		});
	}

	return (
		<>
			<Head>
				<title>Cart</title>
			</Head>
			{
				cartItems.length ?
					// cart items
					<div>
						{cartItems}
						<div className={classes.cartInfo}>
							{/* total price */}
							<h2 className={classes.totalPrice}>
								Total Price: {totalPrice}$
							</h2>
							{/* purchaise button */}
							<Button
								style={{
									color: 'green',
									backgroundColor: '#f8fff8'
								}}
								onClick={purchaiseHandler}
							>
								Purchaise
							</Button>
						</div>
					</div> :
					// A text saying cart is empty and user should choose items first.
					<h2 className={classes.empty}>{emptyCart}</h2>
			}
		</>
	);
};

/**
 * Chicking in server side if the user is loged in to show him/her the cart page.
 * 
 * @param {GetServerSidePropsContext} context - Context of getServerSideProps.
 * @returns {Promise} - Returns props, if the user is loged in and redirect, if the user is not loged in.
 */
export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
): Promise<GetServerSidePropsResult<{ [key: string]: any; }>> => {
	// gets session request from context
	const session: Session = await getSession({ req: context.req });

	// if user has no session, he/she will be redirected to /auth
	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	}

	// passes session to the page via props
	return {
		props: { session },
	};
};

export default Cart;