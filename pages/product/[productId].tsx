import React, { useContext } from 'react';
import type {
	NextPage,
	GetStaticProps,
	GetStaticPaths,
	GetStaticPropsContext,
	PreviewData,
	GetStaticPropsResult,
	GetStaticPathsResult,
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ProductContext from '%/product-context';
import Product from '@/product/Product';
import Count from '@/count/Count';
import Button from '@/UI/button/Button';
import classes from './ProductId.module.css';
import getData from '#/data';
import { ParsedUrlQuery } from 'querystring';

/**
 * Dynamic item page.
 * 
 * @param {ProductIdPropsInterface} props - Props passed by getStaticProps.
 *  @returns {JSX.Element} - Rendered page: Item page.
 */
const ProductId: NextPage<ProductIdPropsInterface> = (
	props: ProductIdPropsInterface
): JSX.Element => {
	const product = props.product;
	const title = product.title;
	const router = useRouter();
	const ProductCtx = useContext(ProductContext);

	function addToCartHandler(): void {
		// TODO: change place of cart's data (from localStorage to MongoDB).

		// item that we want to add to cart
		const newItem = {
			id: product.id,
			title: product.title,
			price: product.price,
			image: product.image,
			amount: ProductCtx.productsCount,
		};

		// Geting cart items from localStorage.
		const cartItems: string = localStorage.getItem('cart-items');

		// Checking if we have no item in our cart.
		if (!cartItems) {
			// Making a storage and save our cart items there.
			localStorage.setItem('cart-items', JSON.stringify([newItem]));
		} else {
			//  Parsing our cart items and searching for this specific product.
			const parsedCartItems = JSON.parse(cartItems);
			const index: number = parsedCartItems.findIndex(item => item.id === product.id);

			// Checking if we have this product in out cart
			if (index) {
				// We don't have this item in cart, so we just push it in our cart.
				parsedCartItems.push(newItem);
			} else {
				// We have this item in our cart, so we just adjust its amount.
				// We can only sell up to 10 amount of each item!
				const oldAmount = parsedCartItems[index].amount;
				const newAmount = oldAmount + ProductCtx.productsCount > 10 ?
					10 :
					oldAmount + ProductCtx.productsCount;
				parsedCartItems[index].amount = newAmount;
			}
			// Saving our cart items back in localStorage.
			localStorage.setItem('cart-items', JSON.stringify(parsedCartItems));
		}

		// Reseting the products amount to zero in our store.
		ProductCtx.setProductsCount(0);
		// Pushing to cart so the user can purchaise chosen items.
		router.push('/cart');
	}

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<main className={classes.main}>
				<Product
					title={product.title}
					image={product.image}
					id={product.id}
					price={product.price}
					description={product.description}
				>
					<section className={classes.purchaise}>
						{/* amount counter */}
						<div>
							<Count />
						</div>
						{/* add to cat button */}
						<Button
							onClick={addToCartHandler}
							disabled={ProductCtx.productsCount === 0}
						>
							Add to Cart
						</Button>
					</section>
				</Product>
			</main>
		</>
	);
};

/**
 * Reading data from products.json and sending the filtered data to page as props.
 * 
 * @param {GetStaticPropsContext} context - Context of getStaticProps.
 * @returns {Promise} - Returns props, if finds product with the same id and notFound, if not.
 */
export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
): Promise<GetStaticPropsResult<{ [key: string]: any; }>> => {
	// gets data from data/product.json
	const data = getData('products.json');

	// gets product id from url
	const { params } = context;
	const productId = params.productId;

	// finds the matching product
	const product = data.find(product => product.id === productId);

	// checking if we found no product with the same id
	if (!product) {
		return {
			notFound: true
		};
	}

	// passing the product to the page via props
	return {
		props: {
			product
		},
	};
};

/**
 * Reads products.json and renders an HTML for each product at build time.
 * 
 * @returns {Promise} - Returns the list of paths that have to be rendered to HTML at build time.
 */
export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult<{ [key: string]: any; }>> => {
	// gets data from data/product.json
	const products = getData('products.json');

	// maping products to make path for every product
	const productIds = products.map(product => {
		return { params: { productId: product.id } };
	});

	return {
		paths: productIds,
		fallback: false
	};
};

export default ProductId;