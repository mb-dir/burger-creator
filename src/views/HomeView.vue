<script setup lang="ts">
	// Not going to change via user actions, no need to keep it as ref
	const photos: string[] = [
		"bottom-bun",
		"burger",
		"cheese",
		"fish",
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
</script>

<template>
	<main>
		<h1>Burger Creator</h1>
		<div class="grid-wrapper">
			<div class="creator">
				<div class="creator__ingredients">
					<div
						class="ingredient"
						v-for="ingredient in ingredients"
						:key="ingredient.id"
					>
						<input type="number" class="ingredient__ammount" />
						<div class="ingredient__bg">
							<img
								:src="ingredient.photo"
								:alt="ingredient.name"
								class="ingredient__picture"
							/>
						</div>
						<span class="ingredient__name">{{ ingredient.name }}</span>
					</div>
				</div>
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
		grid-template-columns: repeat(3, 150px);
		gap: 32px;
	}

	.ingredient {
		height: 220px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.ingredient__bg {
		background-color: var(--primary-text-color);
		height: 75%;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.ingredient__picture {
		max-width: 75%;
		max-height: 75%;
	}

	.ingredient__ammount {
		width: 100%;
	}

	.burger-summary {
		border: 1px solid red;
	}
</style>
