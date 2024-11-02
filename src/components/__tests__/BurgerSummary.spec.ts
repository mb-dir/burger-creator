import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import BurgerSummary from "../BurgerSummary.vue";

describe("BurgerSummary", () => {
	it("should show info message on init", () => {
		const wrapper = mount(BurgerSummary, {
			props: { isBurgerFinish: false },
		});

		const welcomeMessage = wrapper.find(".burger-summary__no-content").text();
		expect(welcomeMessage).toBe(
			"Add items to create Your burger. First item must be bottom bun. To finish Your burger choose top bun"
		);
	});

	it("should show saving form when burger is finished", () => {
		const wrapper = mount(BurgerSummary, {
			props: { isBurgerFinish: true },
		});

		const form = wrapper.find("form");
		expect(form.exists()).toBe(true);
	});

	it("should prevent sending form and show an error if burger name is empty on save", () => {
		const wrapper = mount(BurgerSummary, {
			props: { isBurgerFinish: true },
			isSavedSuccessfully: false,
			"onUpdate:isSavedSuccessfully": (e: any) =>
				wrapper.setProps({ isSavedSuccessfully: e }),
		});

		wrapper.find("form").trigger("submit.prevent");

		expect(wrapper.vm.formError).toBe("Provide correct burger name");
		expect(wrapper.vm.isSavedSuccessfully).toBe(false);
	});

	it("should prevent sending form and show an error if burger name is not valid on save", () => {
		const wrapper = mount(BurgerSummary, {
			props: { isBurgerFinish: true },
			isSavedSuccessfully: false,
			"onUpdate:isSavedSuccessfully": (e: any) =>
				wrapper.setProps({ isSavedSuccessfully: e }),
		});
		wrapper.vm.form.burgerName = "    ";
		wrapper.find("form").trigger("submit.prevent");

		expect(wrapper.vm.formError).toBe("Provide correct burger name");
		expect(wrapper.vm.isSavedSuccessfully).toBe(false);
	});
});
