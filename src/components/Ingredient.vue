<script setup lang="ts">
	import type { burgerIngredient } from "@/types";
	import InputNumber from "@/components/InputNumber.vue";

	const props = defineProps<{
		ingredient: burgerIngredient;
	}>();

	function getIngredient(): burgerIngredient {
		return props.ingredient;
	}

	const emit = defineEmits(["addIngredient", "removeIngredient"]);

	function onDecrease(): void {
		const ingredient = getIngredient();
		emit("removeIngredient", ingredient);
	}

	function onIncrease(): void {
		const ingredient = getIngredient();
		emit("addIngredient", ingredient);
	}
</script>

<template>
	<div class="ingredient">
		<InputNumber @decrease="onDecrease" @increase="onIncrease" />
		<div class="ingredient__bg">
			<img
				:src="ingredient.photo"
				:alt="ingredient.name"
				class="ingredient__picture"
			/>
		</div>
		<span class="ingredient__name">{{ ingredient.name }}</span>
	</div>
</template>

<style scoped>
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
