<script setup lang="ts">
	import { ref } from "vue";
	import InputNumber from "@/components/InputNumber.vue";

	type burgerIngredient = {
		id: number;
		name: string;
		photo: string;
	};

	defineProps<{
		ingredient: burgerIngredient;
	}>();

	const burger = ref<burgerIngredient[]>([]);
</script>

<template>
	<div class="ingredient">
		<InputNumber />
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
