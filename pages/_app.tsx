import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'next-auth/client';

import '$/global.css';
import '$/animations.css';
import { DrawerContextProvider } from '%/drawer-context';
import { ProductContextProvider } from '%/product-context';
import Layout from '@/layout/Layout';

/**
 * Function to initialize pages.
 * 
 * @param {NextComponentType} Component - Components or active page of the app.
 * @param {any} pageProps - Props passed to app.
 * @returns {JSX.Element} - Rendered app.
 */
const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps): JSX.Element => {
	return (
		// session provider for authentication
		<Provider session={session}>
			{/* context provider for store */}
			<ProductContextProvider>
				{/* context provider for store */}
				<DrawerContextProvider>
					{/* layout of the app */}
					<Layout>
						<Head>
							<meta name="viewport" content="initial-scale=1, width=device-width" />
						</Head>
						<Component {...pageProps} />
					</Layout>
				</DrawerContextProvider>
			</ProductContextProvider>
		</Provider>
	);
};

export default App;