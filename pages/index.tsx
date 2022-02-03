import type { NextPage, GetStaticProps, GetStaticPropsResult } from 'next';
import Head from 'next/head';

import Container from '@/container/Container';
import getData from '#/data';

/**
 * Home page.
 * 
 * @param {HomePropsInterface} props - Props passed by getStaticProps.
 * @returns {JSX.Element} - Rendered page: Home page.
 */
const Home: NextPage<HomePropsInterface> = (props: HomePropsInterface): JSX.Element => {
	// maping on props.data to find the categorie
	const bodyContent = props.data.map(item => {
		return (
			<Container value={item} key={item} />
		);
	});

	return (
		<>
			<Head>
				<title>Silicon Box</title>
			</Head>
			<main>
				{bodyContent}
			</main>
		</>
	);
};

/**
 * Reads categories.json and passes found categories to the page.
 * 
 * @returns {Promise} - Returns found categories as props.data to the page
 */
export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<{ [key: string]: any; }>> => {
	const data = getData('categories.json');

	return {
		props: {
			data
		}
	};
};

export default Home;