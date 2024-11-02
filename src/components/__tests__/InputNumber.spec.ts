import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import InputNumber from "../InputNumber.vue";

describe("InputNumber", () => {
	it("should render disabled input and two buttons", () => {
		const wrapper = mount(InputNumber);

		const buttons = wrapper.findAll("button");
		const input = wrapper.find("input");

		expect(input.attributes("disabled")).toBeDefined();
		expect(buttons.length).toBe(2);
		expect(input.exists()).toBe(true);
	});

	it("should emit actions when buttons are clicked", () => {
		const wrapper = mount(InputNumber, {
			props: {
				modelValue: 1,
				"onUpdate:modelValue": (e) => wrapper.setProps({ modelValue: e }),
			},
		});

		const buttons = wrapper.findAll("button");

		const plusBtn = buttons.find((button) => button.html().includes("+"));
		const minusBtn = buttons.find((button) => button.html().includes("-"));

		plusBtn?.trigger("click");
		minusBtn?.trigger("click");

		expect(wrapper.emitted()).toHaveProperty("increase");
		expect(wrapper.emitted()).toHaveProperty("decrease");
	});

	it("should prevent setting negative values", async () => {
		const wrapper = mount(InputNumber);

		const buttons = wrapper.findAll("button");
		const minusBtn = buttons.find((button) => button.html().includes("-"));

		minusBtn?.trigger("click");
		await wrapper.vm.$nextTick();
		const error = wrapper.find(".error__message");

		expect(wrapper.emitted()).not.toHaveProperty("decrease");
		expect(error.exists()).toBe(true);
		expect(error.text()).toBe("Ingredient number must be positive");
	});
});
