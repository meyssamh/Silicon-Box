import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import classes from './Container.module.css';

/**
 * Functional react component, that contains images for homepage.
 * 
 * @param {ContainerPropsInterface} props - React props.
 * @returns {JSX.Element} - Rendered component: A container for homepage images.
 */
const Container: React.FC<ContainerPropsInterface> = (props: ContainerPropsInterface): JSX.Element => {
	return (
		<div className={classes.image_container}>
			<Link href={`/category/${props.value}`}>
				<a>
					<Image
						src={`/images/${props.value}.jpg`}
						alt={props.value}
						width={600}
						height={400}
					/>
				</a>
			</Link>
		</div>
	);
};

export default Container;