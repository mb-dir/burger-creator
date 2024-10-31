<script setup lang="ts">
	import type { burger, burgerIngredient } from "@/types";
	import { ref } from "vue";
	import BurgerRenderer from "@/components/BurgerRenderer.vue";
	import CheckIcon from "@/components/icons/CheckIcon.vue";

	defineProps<{ isBurgerFinish: boolean }>();

	const form = ref({
		burgerName: "",
	});
	const formError = ref<null | string>(null);

	const burgerIngredients = defineModel<burgerIngredient[]>(
		"burgerIngredients",
		{ default: [] }
	);
	const isSavedSuccessfully = defineModel<boolean>("isSavedSuccessfully");
	const ingredientsError = defineModel<string | null>("ingredientsError");
	const burgerCounter = defineModel<number>("burgerCounter", { default: 0 });

	function onBurgerAdd(): void {
		formError.value = null;
		if (!form.value.burgerName.trim()) {
			formError.value = "Provide correct burger name";
			return;
		}

		const burgers: burger[] = JSON.parse(
			localStorage.getItem("burgers") || "[]"
		);

		const readyBurger: burger = {
			name: form.value.burgerName,
			ingredients: burgerIngredients.value,
		};

		if (burgers.some((el) => el.name === readyBurger.name)) {
			formError.value = "Burger name must be unique";
			return;
		}

		burgers.push(readyBurger);
		burgerIngredients.value = [];
		form.value.burgerName = "";

		localStorage.setItem("burgers", JSON.stringify(burgers));

		isSavedSuccessfully.value = true;
		formError.value = null;
		ingredientsError.value = null;

		burgerCounter.value++; // Increment the counter to reset Ingredient with InputNumber components
	}
</script>

<template>
	<div class="burger-summary">
		<h2 class="burger-summary__title">Your Burger</h2>

		<div v-if="ingredientsError" class="burger-summary__error">
			{{ ingredientsError }}
		</div>
		<div v-if="isSavedSuccessfully" class="burger-summary__success">
			Burger saved successfully <CheckIcon />
		</div>

		<div class="burger-summary__burger" v-if="burgerIngredients.length > 0">
			<BurgerRenderer :burgerIngredients />
		</div>
		<span
			v-else-if="!ingredientsError && !isSavedSuccessfully"
			class="burger-summary__no-content"
			>Add items to create Your burger. First item must be bottom bun. To finish
			Your burger choose top bun</span
		>
		<form
			v-if="isBurgerFinish"
			class="burger-form"
			@submit.prevent="onBurgerAdd"
		>
			<input
				v-model="form.burgerName"
				type="text"
				class="burger-form__input"
				placeholder="Burger name"
			/>
			<div class="burger-form__error">
				<span v-if="formError" class="burger-form__error-message">{{
					formError
				}}</span>
			</div>
			<button class="burger-form__button">Save</button>
		</form>
	</div>
</template>

<style scoped>
	.burger-summary__no-content {
		color: var(--secondary-text-color);
	}

	.burger-summary__error {
		color: var(--danger-color);
		margin: 20px 0;
	}

	.burger-summary__success {
		color: var(--success-color);
		margin: 20px 0;
	}

	.burger-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 32px;
		gap: 8px;
	}

	.burger-form__input {
		background-color: transparent;
		border: none;
		color: var(--primary-text-color);
		text-align: center;
		font-size: 20px;
	}

	.burger-form__input::placeholder {
		color: var(--primary-text-color);
	}

	.burger-form__button {
		background-color: var(--primary-text-color);
		color: black;
		border: none;
		padding: 20px 32px;
		border-radius: 100%;
		cursor: pointer;
	}

	.burger-form__error {
		line-height: 0;
		height: 6px;
		text-wrap: nowrap;
	}

	.burger-form__error-message {
		font-size: 12px;
		color: var(--danger-color);
	}
</style>
