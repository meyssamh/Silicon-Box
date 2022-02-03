import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import classes from './Products.module.css';

/**
 * Functional react component for products in their category.
 * 
 * @param {ProductsPropsInterface} props - React props.
 * @returns {JSX.Element} - Rendered component: A product item for category.
 */
const Products: React.FC<ProductsPropsInterface> = (props: ProductsPropsInterface): JSX.Element => {
	return (
		<div className={classes.container}>
			{/* product's link */}
			<Link href={`/product/${props.id}`}>
				<a className={classes.a}>
					<div>
						{/* product's image */}
						<Image
							className={classes.image}
							src={props.image}
							alt={props.title}
							width={200}
							height={300}
						/>
					</div>
					{/* title */}
					<h3>{props.title}</h3>
					{/* price */}
					<p>Price: {props.price}$</p>
				</a>
			</Link>
		</div>
	);
};

export default Products;