<script setup lang="ts">
	import type { burger } from "@/types";
	import BurgerRenderer from "./BurgerRenderer.vue";
	import TrashIcon from "./icons/TrashIcon.vue";

	defineProps<{
		burger: burger;
	}>();
</script>

<template>
	<div class="burger-card">
		<BurgerRenderer :burgerIngredients="burger.ingredients" />
		<span class="burger-card__name">{{ burger.name }}</span>
		<button class="burger-card__button"><TrashIcon /> Remove</button>
	</div>
</template>

<style scoped>
	.burger-card {
		height: 215px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.burger-card__button {
		border: none;
		background-color: var(--danger-color);
		color: var(--primary-text-color);
		padding: 12px 0;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
		cursor: pointer;
	}
</style>
