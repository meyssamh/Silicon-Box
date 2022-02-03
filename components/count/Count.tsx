import React, { useContext, useState } from 'react';

import classes from './Count.module.css';
import ProductContext from '%/product-context';

/**
 * Functional react component for user to choose the amount of item he/she wants to purchaise.
 * 
 * @returns {JSX.Element} - Rendered component: a component for choosing the amount of purchaise.
 */
const Count: React.FC = (): JSX.Element => {
	const [count, setCount] = useState<number>(0);
	const ProductCtx = useContext(ProductContext);

	// Adds one item to the amount of product.
	const addCountHandler = () => {
		// Amount can not be more than ten.
		if (count < 10) {
			// Saves amount to the state.
			setCount(count + 1);
			// Saves amount to the store.
			ProductCtx.setProductsCount(count + 1);
		}
	};

	// Subtracts one item from the amount of product.
	const subtractCountHandler = () => {
		// Amount can not be less than zero.
		if (count > 0) {
			// Saves amount to the state.
			setCount(count - 1);
			// Saves amount to the store.
			ProductCtx.setProductsCount(count - 1);
		}
	};

	return (
		<div className={classes.container}>
			{/* remove icon */}
			<div className={classes.subtract} onClick={subtractCountHandler}>
				<span className={"material-icons"}>remove</span>
			</div>
			{/* amount counter */}
			<div className={classes.count}>
				{count}
			</div>
			{/* add icon */}
			<div className={classes.add} onClick={addCountHandler}>
				<span className={"material-icons"}>add</span>
			</div>
		</div>
	);
};

export default Count;