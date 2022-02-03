import React from 'react';

import classes from './Button.module.css';

/**
 * functional react component for a button.
 * 
 * @param {ButtonPropsInterface} props - React props.
 * @returns {JSX.Element} - Rendered component: A button.
 */
const Button: React.FC<ButtonPropsInterface> = (props: ButtonPropsInterface): JSX.Element => {
	const { style, onClick, disabled, children } = props;

	return (
		<button
			className={classes.button}
			style={style}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;