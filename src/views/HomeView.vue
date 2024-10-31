<script setup lang="ts">
	import { computed, ref } from "vue";
	import type { burgerIngredient, burger } from "@/types";
	import Ingredient from "@/components/Ingredient.vue";
	import BurgerSummary from "@/components/BurgerSummary.vue";

	// Not going to change via user actions, no need to keep it as ref
	const photoNames: string[] = [
		"bottom-bun",
		"top-bun",
		"tomato",
		"ingredient-burger",
		"ingredient-fish",
		"lettuce",
		"ingredient-cheese",
	];

	const ingredientsError = ref<null | string>(null);
	const isSavedSuccessfully = ref<boolean>(false);

	const burgerCounter = ref(0);

	// Generate image URLs for each photo
	function generatePhotoUrl(name: string): string {
		// https://stackoverflow.com/questions/66419471/vue-3-vite-dynamic-image-src
		return new URL(`../assets/imgs/${name}.png`, import.meta.url).href;
	}

	// Logic for converting photo names to objects with all required properties
	const ingredients = photoNames.map((name, index) => {
		const nameParts = name.split("-");
		const finalName = nameParts
			.map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
			.join(" ");

		// Create the base ingredient object
		const ingredient: burgerIngredient = {
			id: index + 1,
			name: finalName,
			photo: generatePhotoUrl(name),
		};

		// Check if the photo name starts with "ingredient-" then we have to convert name and create extra photo url
		if (name.startsWith("ingredient-")) {
			ingredient.name = finalName.replace("Ingredient ", "");
			ingredient.burgerIngredientPhoto = generatePhotoUrl(nameParts[1]);
		}

		return ingredient;
	});

	const burgerIngredients = ref<burgerIngredient[]>([]);

	const isBurgerFinish = computed(() =>
		burgerIngredients.value.some((el) => el.id === 2)
	);

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

		if (isBurgerFinish.value && ingredient.id !== 2) {
			ingredientsError.value = "You cannot add ingredient on top of the bun";
			return;
		}

		if (isBurgerFinish.value && ingredient.id === 2) {
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
	<main>
		<h1>Burger Creator</h1>
		<div class="grid-wrapper">
			<div class="creator__ingredients">
				<Ingredient
					v-for="ingredient in ingredients"
					:ingredient
					@addIngredient="onAddIngredient"
					@removeIngredient="onRemoveIngredient"
					:key="burgerCounter + '-' + ingredient.id"
				/>
			</div>

			<BurgerSummary
				:isBurgerFinish
				v-model:burgerIngredients="burgerIngredients"
				v-model:ingredientsError="ingredientsError"
				v-model:isSavedSuccessfully="isSavedSuccessfully"
				v-model:burgerCounter="burgerCounter"
			/>

			<!-- <div class="burger-summary">
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
					>Add items to create Your burger. First item must be bottom bun. To
					finish Your burger choose top bun</span
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
			</div> -->
		</div>
	</main>
</template>

<style scoped>
	.grid-wrapper {
		padding: 16px;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.creator__ingredients {
		display: grid;
		grid-template-columns: repeat(3, 175px);
		gap: 32px;
	}

	.ingredient {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.ingredient__bg {
		background-color: var(--primary-text-color);
		height: 175px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.ingredient__picture {
		width: 75%;
	}

	.ingredient__name {
		text-wrap: nowrap;
	}
</style>
