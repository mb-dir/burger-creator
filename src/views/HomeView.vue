<script setup lang="ts">
	import { computed, ref } from "vue";
	import type { burgerIngredient } from "@/types";
	import BurgerSummary from "@/components/BurgerSummary.vue";
	import BurgerCreator from "@/components/BurgerCreator.vue";
	import useIngredients from "@/composables/useIngredients";

	const ingredientsError = ref<null | string>(null);
	const isSavedSuccessfully = ref<boolean>(false);

	const burgerCounter = ref(0);

	const burgerIngredients = ref<burgerIngredient[]>([]);

	const isBurgerFinish = computed(() =>
		burgerIngredients.value.some((el) => el.id === 2)
	);

	const { ingredients } = useIngredients();
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
