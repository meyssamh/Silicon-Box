import React, { createContext, useState } from 'react';

// drawer context state
const DrawerContext: React.Context<DrawerContextInterface> = createContext<DrawerContextInterface>({
	displayDrawer: false,
	showDrawer: () => { },
	hideDrawer: () => { }
});

/**
 * Function to create context provider for drawer.
 * 
 * @param {any} props - Context props.
 * @returns {JSX.Element} - Rendered component: drawer context provider.
 */
export const DrawerContextProvider: (props: any) => JSX.Element = props => {
	const [displayDrawer, setDisplayDrawer] = useState<boolean>(false);

	// displays drawer to the user
	const showDrawerHandler: () => void = () => {
		setDisplayDrawer(true);
	};

	// hides the drawer when needed
	const hideDrawerHandler: () => void = () => {
		setDisplayDrawer(false);
	};

	// bundled data and functions as context
	const context: DrawerContextInterface = {
		displayDrawer,
		showDrawer: showDrawerHandler,
		hideDrawer: hideDrawerHandler
	};

	return (
		<DrawerContext.Provider value={context}>
			{props.children}
		</DrawerContext.Provider>
	);
};

export default DrawerContext;