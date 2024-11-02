import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Ingredient from "../Ingredient.vue";
import type { burgerIngredient } from "@/types";

describe("Ingredient", () => {
	const ingredient: burgerIngredient = {
		id: 1,
		name: "Bottom Bun",
		photo:
			"http://localhost:5173/burger-creator/src/assets/imgs/bottom-bun.png",
	};

	it("should render Ingredient component with control", () => {
		const wrapper = mount(Ingredient, { props: { ingredient } });

		const photo = wrapper.find("img");
		const name = wrapper.find(".ingredient__name").text();
		const control = wrapper.findComponent({ name: "InputNumber" });

		expect(photo.attributes().src).toEqual(ingredient.photo);
		expect(name).toEqual(ingredient.name);
		expect(control.exists()).toBe(true);
	});

	it("should emit events", () => {
		const wrapper = mount(Ingredient, { props: { ingredient } });

		const control = wrapper.findComponent({ name: "InputNumber" });

		control.vm.$emit("decrease");
		control.vm.$emit("increase");

		expect(wrapper.emitted()).toHaveProperty("removeIngredient");
		expect(wrapper.emitted()).toHaveProperty("addIngredient");
	});
});
