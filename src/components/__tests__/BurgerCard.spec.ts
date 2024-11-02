import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import BurgerCard from "../BurgerCard.vue";
import type { burger } from "@/types";
import { createRouter, createMemoryHistory } from "vue-router";
import SingleBurgerView from "@/views/SingleBurgerView.vue";

// Create a mock router
const router = createRouter({
	history: createMemoryHistory(),
	routes: [
		{
			path: "/single-favourite/:name",
			name: "single-favourite",
			component: { template: SingleBurgerView },
		},
	],
});

describe("BurgerCard", () => {
	const burger: burger = {
		name: "a",
		ingredients: [
			{
				id: 1,
				name: "Bottom Bun",
				photo:
					"http://localhost:5173/burger-creator/src/assets/imgs/bottom-bun.png",
			},
			{
				id: 2,
				name: "Top Bun",
				photo:
					"http://localhost:5173/burger-creator/src/assets/imgs/top-bun.png",
			},
		],
	};

	it("should render card with burger", async () => {
		const wrapper = mount(BurgerCard, {
			props: { burger },
			global: {
				plugins: [router],
			},
		});

		await router.isReady();

		const burgerName = wrapper.find(".burger-card__name").text();
		const ingredientImgs = wrapper.findAll("img");

		expect(burgerName).toEqual(burger.name);
		expect(ingredientImgs.length).toEqual(2);
	});

	it("should redirect to single burger view", async () => {
		const mockRouterPush = vi.spyOn(router, "push");
		const wrapper = mount(BurgerCard, {
			props: { burger },
			global: {
				plugins: [router],
			},
		});

		await router.isReady();

		const link = wrapper.findComponent({ name: "RouterLink" });

		await link.trigger("click");

		expect(mockRouterPush).toHaveBeenCalledWith({
			name: "single-favourite",
			params: { name: burger.name },
		});
	});

	it("should emit remove action", async () => {
		const wrapper = mount(BurgerCard, {
			props: { burger },
			global: {
				plugins: [router],
			},
		});

		await router.isReady();

		const removeBtn = wrapper.find("button");
		removeBtn.trigger("click");

		expect(wrapper.emitted()).toHaveProperty("burgerRemoved");
	});
});
