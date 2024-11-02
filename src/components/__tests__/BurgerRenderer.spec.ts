import type { burgerIngredient } from "./../../types";
import BurgerRenderer from "../BurgerRenderer.vue";
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

describe("BurgerRenderer", () => {
	const burgerIngredients: burgerIngredient[] = [
		{
			id: 1,
			name: "Bottom Bun",
			photo:
				"http://localhost:5173/burger-creator/src/assets/imgs/bottom-bun.png",
		},
		{
			id: 3,
			name: "Tomato",
			photo: "http://localhost:5173/burger-creator/src/assets/imgs/tomato.png",
		},
		{
			id: 4,
			name: "Burger",
			photo:
				"http://localhost:5173/burger-creator/src/assets/imgs/ingredient-burger.png",
			burgerIngredientPhoto:
				"http://localhost:5173/burger-creator/src/assets/imgs/burger.png",
		},
		{
			id: 5,
			name: "Fish",
			photo:
				"http://localhost:5173/burger-creator/src/assets/imgs/ingredient-fish.png",
			burgerIngredientPhoto:
				"http://localhost:5173/burger-creator/src/assets/imgs/fish.png",
		},
		{
			id: 6,
			name: "Lettuce",
			photo: "http://localhost:5173/burger-creator/src/assets/imgs/lettuce.png",
		},
		{
			id: 7,
			name: "Cheese",
			photo:
				"http://localhost:5173/burger-creator/src/assets/imgs/ingredient-cheese.png",
			burgerIngredientPhoto:
				"http://localhost:5173/burger-creator/src/assets/imgs/cheese.png",
		},
		{
			id: 2,
			name: "Top Bun",
			photo: "http://localhost:5173/burger-creator/src/assets/imgs/top-bun.png",
		},
	];

	it("should render burger", () => {
		const wrapper = mount(BurgerRenderer, {
			props: { burgerIngredients },
		});

		const imgs = wrapper.findAll("img");

		expect(imgs.length).toBe(7);
	});
});
