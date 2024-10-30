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
</style>
