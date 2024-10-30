<script setup lang="ts">
	import { ref } from "vue";
	import Ingredient from "@/components/Ingredient.vue";
	// Not going to change via user actions, no need to keep it as ref
	const photos: string[] = [
		"bottom-bun",
		"ingredient-burger",
		"ingredient-cheese",
		"ingredient-fish",
		"lettuce",
		"tomato",
		"top-bun",
	];

	// https://stackoverflow.com/questions/66419471/vue-3-vite-dynamic-image-src
	const ingredientImages = photos.reduce((images, photo) => {
		images[photo] = new URL(
			`../assets/imgs/${photo}.png`,
			import.meta.url
		).href;
		return images;
	}, {} as Record<string, string>);

	const ingredients = photos.map((photo, index) => {
		const name = photo
			.split("-")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");

		return {
			id: index + 1,
			name,
			photo: ingredientImages[photo],
		};
	});

	type burgerIngredient = {
		name: string;
		photo: string;
	};

	const burger = ref<burgerIngredient[]>([]);
</script>

<template>
	<main>
		<h1>Burger Creator</h1>
		<div class="grid-wrapper">
			<div class="creator__ingredients">
				<Ingredient v-for="ingredient in ingredients" :ingredient />
			</div>

			<div class="burger-summary">Burger Boży</div>
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

	.burger-summary {
		border: 1px solid red;
	}
</style>
