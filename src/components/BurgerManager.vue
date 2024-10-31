<script setup lang="ts">
	import { computed, ref } from "vue";
	import type { burgerIngredient } from "@/types";
	import BurgerSummary from "@/components/BurgerSummary.vue";
	import BurgerCreator from "@/components/BurgerCreator.vue";
	import useIngredients from "@/composables/useIngredients";

	const ingredientsError = ref<null | string>(null);
	const isSavedSuccessfully = ref<boolean>(false);

	const burgerCounter = ref(0);

	// Already added ingredients
	const burgerIngredients = ref<burgerIngredient[]>([]);

	// Top bun has id 2
	const isBurgerFinish = computed(() =>
		burgerIngredients.value.some((el) => el.id === 2)
	);

	const { ingredients } = useIngredients();
</script>

<template>
	<div class="burger-manager">
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
</template>

<style scoped>
	.burger-manager {
		padding: 16px;
		display: grid;
		gap: 16px;
		grid-template-columns: 1fr 1fr;
	}

	@media (max-width: 1024px) {
		.burger-manager {
			grid-template-columns: 2fr 1fr;
		}
	}

	@media (max-width: 768px) {
		.burger-manager {
			grid-template-columns: 1fr;
		}
	}
</style>
