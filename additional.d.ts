interface HomePropsInterface {
	data: ["women", "men", "baby", "home"];
};

interface DrawerContextInterface {
	displayDrawer: boolean;
	showDrawer: () => void;
	hideDrawer: () => void;
};

interface ProductContextInterface {
	productsCount: number;
	setProductsCount: (count: number) => void;
};

interface ContainerPropsInterface {
	value: string;
};

interface ProductsPropsInterface {
	[key: string]: string;
	id: string;
	title: string;
	price: string;
	image: string;
};

interface ProductIdPropsInterface {
	product: {
		[key: string]: string;
		id: string;
		title: string;
		price: string;
		category: string;
		description: string;
		image: string;
	}
};

interface CategoryPropsInterface {
	products: {
		[key: string]: string;
		id: string;
		title: string;
		price: string;
		category: string;
		description: string;
		image: string;
	}[]
};

interface ProductPropsInterface {
	id: string;
	title: string;
	price: string;
	description?: string;
	image: string;
	amount?: number;
	children: React.ReactNode;
};

interface ButtonPropsInterface {
	children: any;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	style?: object;
	disabled?: boolean;
};

interface LayoutPropsInterface {
	children: React.ReactNode;
};