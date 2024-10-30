export type burgerIngredient = {
	id: number;
	name: string;
	photo: string;
	// some ingredients have different pictures depending on where they are displayed
	burgerIngredientPhoto?: string;
};

export type burger = {
	name: string;
	ingredients: burgerIngredient[];
};
