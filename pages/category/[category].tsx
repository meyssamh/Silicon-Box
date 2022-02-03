import React from 'react';
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

import Products from '@/products/Products';
import getData from '#/data';
import classes from './Category.module.css';
import { ParsedUrlQuery } from 'querystring';

/**
 * Dynamic category page.
 * 
 * @param {CategoryPropsInterface} props - Props passed by getStaticProps.
 * @returns {JSX.Element} - Rendered page: Category page.
 */
const Category: NextPage<CategoryPropsInterface> = (
	props: CategoryPropsInterface
): JSX.Element => {
	const products = props.products;

	// category string for title
	let category = null;

	// maping on products to get every product item.
	const bodyContent = products.map(item => {
		category = item.category;
		return (
			<Products
				id={item.id}
				title={item.title}
				price={item.price}
				image={item.image}
				key={item.id}
			/>
		);
	});

	return (
		<>
			<Head>
				<title>Silicon Box : {category}</title>
			</Head>
			<main className={classes.main}>
				{bodyContent}
			</main>
		</>
	);
};

/**
 * Reading data from products.json and sending the filtered data to page as props.
 * 
 * @param {GetStaticPropsContext} context - Context of getStaticProps.
 * @returns {Promise} - Returns props, if finds the category in data file and notFound, if we don't find it.
 */
export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
): Promise<GetStaticPropsResult<{ [key: string]: any; }>> => {
	// gets data from data/product.json
	const data = getData('products.json');

	// gets the typed category in URL
	const { params } = context;
	const category = params.category;

	// filters products to find products with matching category
	const products = data.filter(product => {
		return product.category === category;
	});

	// checking if we found no product in the url category
	if (!products) {
		return {
			notFound: true
		};
	}

	// passing products to the page via props
	return {
		props: {
			products
		},
	};
};

/**
 * Reads category.json and renders an HTML for each category at build time.
 * 
 * @returns {Promise} - Returns the list of paths that have to be rendered to HTML at build time.
 */
export const getStaticPaths: GetStaticPaths<ParsedUrlQuery> = async (): Promise<GetStaticPathsResult<{ [key: string]: any; }>> => {
	const categories = getData('categories.json');

	return {
		paths: [
			{ params: { category: categories[0] } },
			{ params: { category: categories[1] } },
			{ params: { category: categories[2] } },
			{ params: { category: categories[3] } },
		],
		fallback: false,
	};
};

export default Category;