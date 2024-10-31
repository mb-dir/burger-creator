<script setup lang="ts">
	import type { burgerIngredient } from "@/types";
	import Ingredient from "./Ingredient.vue";

	const props = defineProps<{
		ingredients: burgerIngredient[];
		burgerCounter: number;
		isBurgerFinish: boolean;
	}>();

	const burgerIngredients = defineModel<burgerIngredient[]>(
		"burgerIngredients",
		{ default: [] }
	);
	const isSavedSuccessfully = defineModel<boolean>("isSavedSuccessfully");
	const ingredientsError = defineModel<string | null>("ingredientsError");

	function onAddIngredient(
		ingredient: burgerIngredient,
		htmlInputNumberRef: HTMLInputElement
	): void {
		ingredientsError.value = null;
		isSavedSuccessfully.value = false;

		// Bottom bun has id 1, top bun has id 2
		if (burgerIngredients.value.length === 0 && ingredient.id !== 1) {
			ingredientsError.value = "First item must be bottom bun";
			return;
		}

		if (burgerIngredients.value.length > 0 && ingredient.id === 1) {
			ingredientsError.value = "You can add only one bottom bun";
			return;
		}

		if (props.isBurgerFinish && ingredient.id !== 2) {
			ingredientsError.value = "You cannot add ingredient on top of the bun";
			return;
		}

		if (props.isBurgerFinish && ingredient.id === 2) {
			ingredientsError.value = "You can add only one top bun";
			return;
		}

		if (burgerIngredients.value.length === 8 && ingredient.id !== 2) {
			ingredientsError.value =
				"The maximum number of items is nine including buns. Last item must be top bun";
			return;
		}
		// Only after validated adding new ingredient increase its number
		htmlInputNumberRef.stepUp();
		burgerIngredients.value.push(ingredient);
	}

	function onRemoveIngredient(
		ingredient: burgerIngredient,
		htmlInputNumberRef: HTMLInputElement
	): void {
		ingredientsError.value = null;

		// Bottom bun has id 1, top bun has id 2
		// Prevent deleting bottom bun when something is on top of it

		if (ingredient.id === 1 && burgerIngredients.value.length > 1) {
			ingredientsError.value =
				"You cannot remove bottom bun when ingredients are on it";
			return;
		}

		// Delete ingredient from the top of the stack
		const lastIndex: number = burgerIngredients.value.findLastIndex(
			(item: burgerIngredient) => item.id === ingredient.id
		);

		// If findLastIndex doesnt find anything it returns -1
		if (lastIndex >= 0) {
			burgerIngredients.value.splice(lastIndex, 1);
		}

		// Only after validated removing ingredient decrease its number
		htmlInputNumberRef.stepDown();
	}
</script>

<template>
	<div class="burger-creator" v-if="ingredients.length > 0">
		<Ingredient
			v-for="ingredient in ingredients"
			:ingredient
			@addIngredient="onAddIngredient"
			@removeIngredient="onRemoveIngredient"
			:key="burgerCounter + '-' + ingredient.id"
		/>
	</div>
</template>

<style scoped>
	.burger-creator {
		display: grid;
		grid-template-columns: repeat(3, 175px);
		gap: 32px;
	}

	@media (max-width: 1024px) {
		.burger-creator {
			grid-template-columns: repeat(3, 150px);
		}
	}

	@media (max-width: 768px) {
		.burger-creator {
			justify-content: center;
		}
	}

	@media (max-width: 576px) {
		.burger-creator {
			grid-template-columns: repeat(2, 125px);
		}
	}
</style>
