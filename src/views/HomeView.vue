<script setup lang="ts">
	import { computed, ref } from "vue";
	import type { burgerIngredient, burger } from "@/types";
	import BurgerSummary from "@/components/BurgerSummary.vue";
	import BurgerCreator from "@/components/BurgerCreator.vue";

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
</script>

<template>
	<main>
		<h1>Burger Creator</h1>
		<div class="grid-wrapper">
			<BurgerCreator
				:isBurgerFinish
				:burgerCounter
				:ingredients
				v-model:burgerIngredients="burgerIngredients"
				v-model:ingredientsError="ingredientsError"
				v-model:isSavedSuccessfully="isSavedSuccessfully"
			/>

			<BurgerSummary
				:isBurgerFinish
				v-model:burgerIngredients="burgerIngredients"
				v-model:ingredientsError="ingredientsError"
				v-model:isSavedSuccessfully="isSavedSuccessfully"
				v-model:burgerCounter="burgerCounter"
			/>
		</div>
	</main>
</template>

<style scoped>
	.grid-wrapper {
		padding: 16px;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
</style>
