import type { burgerIngredient } from "@/types";

const _photoNames: string[] = [
	"bottom-bun",
	"top-bun",
	"tomato",
	"ingredient-burger",
	"ingredient-fish",
	"lettuce",
	"ingredient-cheese",
];

// Generate image URLs for each photo
function _generatePhotoUrl(name: string): string {
	// https://stackoverflow.com/questions/66419471/vue-3-vite-dynamic-image-src
	return new URL(`../assets/imgs/${name}.png`, import.meta.url).href;
}

export default function useIngredients() {
	// Logic for converting photo names to objects with all required properties
	const ingredients = _photoNames.map((name, index) => {
		const nameParts = name.split("-");
		const finalName = nameParts
			.map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
			.join(" ");

		// Create the base ingredient object
		const ingredient: burgerIngredient = {
			id: index + 1,
			name: finalName,
			photo: _generatePhotoUrl(name),
		};

		// Check if the photo name starts with "ingredient-" then we have to convert name and create extra photo url
		if (name.startsWith("ingredient-")) {
			ingredient.name = finalName.replace("Ingredient ", "");
			ingredient.burgerIngredientPhoto = _generatePhotoUrl(nameParts[1]);
		}

		return ingredient;
	});

	return { ingredients };
}
