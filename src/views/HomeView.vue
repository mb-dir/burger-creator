<script setup lang="ts">
	import { ref } from "vue";
	import type { burgerIngredient } from "@/types";
	import Ingredient from "@/components/Ingredient.vue";
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

	const burger = ref<burgerIngredient[]>([]);

	function onAddIngredient(ingredient: burgerIngredient): void {
		burger.value.push(ingredient);
	}

	function onRemoveIngredient(ingredient: burgerIngredient): void {
		const lastIndex: number = burger.value.findLastIndex(
			(item: burgerIngredient) => item.id === ingredient.id
		);

		// If findLastIndex doesnt find anything it returns -1
		if (lastIndex >= 0) {
			burger.value.splice(lastIndex, 1);
		}
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
				/>
			</div>

			<div class="burger-summary">
				<h2 class="burger-summary__title">Your Burger</h2>
				<div class="burger-summary__burger" v-if="burger.length > 0">
					<img
						v-for="ingredient in burger"
						:src="ingredient.burgerIngredientPhoto || ingredient.photo"
						alt=""
						class="burger-summary__ingredient"
					/>
				</div>
				<span v-else class="burger-summary__no-content"
					>Add items to create Your burger. First item must be bottom bun. To
					finish Your burger choose top bun</span
				>
			</div>
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

	.burger-summary__burger {
		display: flex;
		align-items: center;
		flex-direction: column-reverse;
	}

	.burger-summary__ingredient {
		width: 100px;
	}

	.burger-summary__no-content {
		color: var(--secondary-text-color);
	}
</style>
