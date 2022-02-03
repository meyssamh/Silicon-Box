import React, { createContext, useState } from 'react';

// product context state
const ProductContext = createContext<ProductContextInterface>({
	productsCount: 0,
	setProductsCount: () => { },
});

/**
 * Function to create context provider for products count.
 * 
 * @param {any} props - Context props.
 * @returns {JSX.Element} - Rendered component: product context provider.
 */
export const ProductContextProvider: (props: any) => JSX.Element = props => {
	const [count, setCount] = useState<number>(0);

	/**
	 * changes the count amount
	 * 
	 * @param {number} count - The amount user wants to purchaise.
	 */
	const setProductsCountHandler: (count: number) => void = (count: number) => {
		setCount(count);
	};

	// bundled data and function as context
	const context: ProductContextInterface = {
		productsCount: count,
		setProductsCount: setProductsCountHandler,
	};

	return (
		<ProductContext.Provider value={context}>
			{props.children}
		</ProductContext.Provider>
	);
};

export default ProductContext;