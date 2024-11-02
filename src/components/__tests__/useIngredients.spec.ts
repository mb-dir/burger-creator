import { describe, it, expect } from "vitest";
import useIngredients from "@/composables/useIngredients";

describe("useIngredients", () => {
	const _photoNames: string[] = [
		"bottom-bun",
		"top-bun",
		"tomato",
		"ingredient-burger",
		"ingredient-fish",
		"lettuce",
		"ingredient-cheese",
	];

	const { ingredients } = useIngredients();

	it("should generate the correct number of ingredients", () => {
		expect(ingredients.length).toBe(_photoNames.length);
	});

	it("should generate ingredients with the correct properties", () => {
		ingredients.forEach((ingredient, index) => {
			expect(ingredient).toHaveProperty("id");
			expect(ingredient).toHaveProperty("name");
			expect(ingredient).toHaveProperty("photo");

			expect(ingredient.id).toBe(index + 1);

			expect(ingredient.photo).toContain(_photoNames[index]);

			if (_photoNames[index].startsWith("ingredient-")) {
				expect(ingredient).toHaveProperty("burgerIngredientPhoto");
				expect(ingredient.burgerIngredientPhoto).toBeTruthy();
			} else {
				expect(ingredient).not.toHaveProperty("burgerIngredientPhoto");
			}
		});
	});

	it("should format names correctly", () => {
		const expectedNames = [
			"Bottom Bun",
			"Top Bun",
			"Tomato",
			"Burger",
			"Fish",
			"Lettuce",
			"Cheese",
		];

		ingredients.forEach((ingredient, index) => {
			expect(ingredient.name).toBe(expectedNames[index]);
		});
	});
});
