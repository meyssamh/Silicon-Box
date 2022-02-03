import React from 'react';
import Image from 'next/image';

import classes from './Product.module.css';

/**
 * Functional react component for each product item.
 * 
 * @param {ProductPropsInterface} props - React props.
 * @returns {JSX.Element} - Rendered component: A detailed product item.
 */
const Product: React.FC<ProductPropsInterface> = (props: ProductPropsInterface): JSX.Element => {
	const { title, image, id, price, description, amount, children } = props;

	const productsDescription = description ? <p>{description}</p> : null;
	const productsCount = amount ? <h4>Amount: {amount}</h4> : null;

	return (
		<div className={classes.container}>
			<div>
				{/* title */}
				<h3>{title}</h3>
				{/* image */}
				<Image
					src={image}
					alt={title}
					width={400}
					height={600}
				/>
			</div>
			<div className={classes.informations}>
				<div>
					{/* item number */}
					<h6>Item Nr.: {id}</h6>
					{/* price */}
					<h4>Price: {price}$</h4>
					{/* description */}
					{productsDescription}
					{/* amount of items */}
					{productsCount}
				</div>
				{children}
			</div>
		</div>
	);
};

export default Product;