import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BurgerCreator from "../BurgerCreator.vue";
import type { burgerIngredient } from "@/types";

describe("BurgerCreator", () => {
	const mockIngredients: burgerIngredient[] = [
		{
			id: 1,
			name: "Bottom Bun",
			photo:
				"http://localhost:5173/burger-creator/src/assets/imgs/bottom-bun.png",
		},
		{
			id: 2,
			name: "Top Bun",
			photo: "http://localhost:5173/burger-creator/src/assets/imgs/top-bun.png",
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
	];
	const burgerCounter = 0;
	const isBurgerFinish = false;
	const bottomBun = mockIngredients[0];
	const topBun = mockIngredients[1];

	it("should render Ingredient components", () => {
		const wrapper = mount(BurgerCreator, {
			props: {
				ingredients: mockIngredients,
				burgerCounter,
				isBurgerFinish,
			},
		});

		const ingredientComponents = wrapper.findAllComponents({
			name: "Ingredient",
		});
		expect(ingredientComponents.length).toBe(mockIngredients.length);
	});

	it("should add bottom bun correctly", () => {
		const wrapper = mount(BurgerCreator, {
			props: {
				ingredients: mockIngredients,
				burgerCounter,
				isBurgerFinish,
				burgerIngredients: [],
				"onUpdate:burgerIngredients": (e) =>
					wrapper.setProps({ burgerIngredients: e }),
			},
		});

		const firstIngredientComponent = wrapper.findComponent({
			name: "Ingredient",
		});
		const htmlInputNumberRef = wrapper.findComponent({ name: "InputNumber" }).vm
			.$refs.htmlInputNumber;

		firstIngredientComponent.vm.$emit(
			"addIngredient",
			bottomBun,
			htmlInputNumberRef
		);

		expect(wrapper.props().burgerIngredients).toContainEqual(bottomBun);
		expect(+htmlInputNumberRef.value).toBe(1);
	});

	it("should remove bottom bun correctly", () => {
		const wrapper = mount(BurgerCreator, {
			props: {
				ingredients: mockIngredients,
				burgerCounter,
				isBurgerFinish,
				burgerIngredients: [bottomBun],
				"onUpdate:burgerIngredients": (e) =>
					wrapper.setProps({ burgerIngredients: e }),
			},
		});

		const firstIngredientComponent = wrapper.findComponent({
			name: "Ingredient",
		});
		const htmlInputNumberRef = wrapper.findComponent({ name: "InputNumber" }).vm
			.$refs.htmlInputNumber;

		expect(wrapper.props().burgerIngredients).toContainEqual(bottomBun);

		firstIngredientComponent.vm.$emit(
			"removeIngredient",
			bottomBun,
			htmlInputNumberRef
		);

		expect(wrapper.props().burgerIngredients).not.toContainEqual(bottomBun);
	});

	it("should show error when trying to add ingredient without bottom bun", () => {
		const wrapper = mount(BurgerCreator, {
			props: {
				ingredients: mockIngredients,
				burgerCounter,
				isBurgerFinish,
				burgerIngredients: [],
				"onUpdate:burgerIngredients": (e) =>
					wrapper.setProps({ burgerIngredients: e }),
			},
		});

		const tomato = mockIngredients[2];
		const firstIngredientComponent = wrapper.findComponent({
			name: "Ingredient",
		});

		firstIngredientComponent.vm.$emit("addIngredient", tomato, {});

		expect(wrapper.vm.ingredientsError).toBe("First item must be bottom bun");
	});

	it("should show error when trying to add second bottom bun", () => {
		const wrapper = mount(BurgerCreator, {
			props: {
				ingredients: mockIngredients,
				burgerCounter,
				isBurgerFinish,
				burgerIngredients: [bottomBun],
				"onUpdate:burgerIngredients": (e) =>
					wrapper.setProps({ burgerIngredients: e }),
			},
		});

		const firstIngredientComponent = wrapper.findComponent({
			name: "Ingredient",
		});

		firstIngredientComponent.vm.$emit("addIngredient", bottomBun, {});

		expect(wrapper.vm.ingredientsError).toBe("You can add only one bottom bun");
	});

	it("should show error when trying to add ingredient after finishing the burger", () => {
		const wrapper = mount(BurgerCreator, {
			props: {
				ingredients: mockIngredients,
				burgerCounter,
				isBurgerFinish: true,
				burgerIngredients: [bottomBun, topBun],
				"onUpdate:burgerIngredients": (e) =>
					wrapper.setProps({ burgerIngredients: e }),
			},
		});

		const tomato = mockIngredients[2];

		const firstIngredientComponent = wrapper.findComponent({
			name: "Ingredient",
		});

		firstIngredientComponent.vm.$emit("addIngredient", tomato, {});

		expect(wrapper.vm.ingredientsError).toBe(
			"You cannot add ingredient on top of the bun"
		);
	});

	it("should show error when trying to add a second top bun", () => {
		const wrapper = mount(BurgerCreator, {
			props: {
				ingredients: mockIngredients,
				burgerCounter,
				isBurgerFinish: true,
				burgerIngredients: [bottomBun, topBun],
				"onUpdate:burgerIngredients": (e) =>
					wrapper.setProps({ burgerIngredients: e }),
			},
		});

		const firstIngredientComponent = wrapper.findComponent({
			name: "Ingredient",
		});

		firstIngredientComponent.vm.$emit("addIngredient", topBun, {});

		expect(wrapper.vm.ingredientsError).toBe("You can add only one top bun");
	});

	it("should show error when exceeding maximum ingredients", () => {
		const maxIngredients = [
			mockIngredients[0], // Bottom Bun
			mockIngredients[2], // Tomato
			mockIngredients[3], // Burger
			mockIngredients[4], // Fish
			mockIngredients[5], // Lettuce
			mockIngredients[6], // Cheese
			mockIngredients[6], // Cheese
			mockIngredients[6], // Cheese
		];

		const wrapper = mount(BurgerCreator, {
			props: {
				ingredients: mockIngredients,
				burgerCounter,
				isBurgerFinish: false,
				burgerIngredients: maxIngredients,
				"onUpdate:burgerIngredients": (e) =>
					wrapper.setProps({ burgerIngredients: e }),
			},
		});

		const tomato = mockIngredients[2];

		const firstIngredientComponent = wrapper.findComponent({
			name: "Ingredient",
		});

		firstIngredientComponent.vm.$emit("addIngredient", tomato, {});

		expect(wrapper.vm.ingredientsError).toBe(
			"The maximum number of items is nine including buns. Last item must be top bun"
		);
	});

	it("should show error when trying to remove bottom bun with ingredients on top", () => {
		const wrapper = mount(BurgerCreator, {
			props: {
				ingredients: mockIngredients,
				burgerCounter,
				isBurgerFinish: false,
				burgerIngredients: [bottomBun, topBun],
				"onUpdate:burgerIngredients": (e) =>
					wrapper.setProps({ burgerIngredients: e }),
			},
		});

		const firstIngredientComponent = wrapper.findComponent({
			name: "Ingredient",
		});

		expect(wrapper.props().burgerIngredients).toContainEqual(bottomBun);

		firstIngredientComponent.vm.$emit("removeIngredient", bottomBun, {});

		expect(wrapper.vm.ingredientsError).toBe(
			"You cannot remove bottom bun when ingredients are on it"
		);
	});

	it("should remove ingredient correctly if conditions are met", () => {
		const tomato = mockIngredients[2];
		const wrapper = mount(BurgerCreator, {
			props: {
				ingredients: mockIngredients,
				burgerCounter,
				isBurgerFinish: false,
				burgerIngredients: [bottomBun, tomato],
				"onUpdate:burgerIngredients": (e) =>
					wrapper.setProps({ burgerIngredients: e }),
			},
		});

		const firstIngredientComponent = wrapper.findComponent({
			name: "Ingredient",
		});

		const htmlInputNumberRef = wrapper.findComponent({ name: "InputNumber" }).vm
			.$refs.htmlInputNumber;

		firstIngredientComponent.vm.$emit(
			"removeIngredient",
			tomato,
			htmlInputNumberRef
		);

		expect(wrapper.props().burgerIngredients).not.toContainEqual(tomato);
	});
});
