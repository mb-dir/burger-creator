<script setup lang="ts">
	import type { burgerIngredient } from "@/types";

	const props = defineProps<{
		burgerIngredients: burgerIngredient[];
	}>();
</script>

<template>
	<div class="burger">
		<img
			v-for="ingredient in burgerIngredients"
			:src="ingredient.burgerIngredientPhoto || ingredient.photo"
			:class="{
				'burger__ingredient--margin-small': ingredient.id === 6,
				'burger__ingredient--margin-large':
					ingredient.id === 3 || ingredient.id === 7,
			}"
			alt=""
			class="burger__ingredient"
		/>
	</div>
</template>

<style scoped>
	.burger {
		display: flex;
		align-items: center;
		flex-direction: column-reverse;
	}

	.burger__ingredient {
		width: 100px;
	}

	.burger__ingredient--margin-small {
		margin-bottom: -3px;
		z-index: 1;
	}

	.burger__ingredient--margin-large {
		margin-bottom: -10px;
		z-index: 2;
	}
</style>
