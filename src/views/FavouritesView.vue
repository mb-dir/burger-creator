<script setup lang="ts">
	import BurgerCard from "@/components/BurgerCard.vue";
	import type { burger } from "@/types";
	import { ref } from "vue";

	const burgers = ref<burger[]>(
		JSON.parse(localStorage.getItem("burgers") || "[]")
	);

	function updateBurgers(): void {
		burgers.value = JSON.parse(localStorage.getItem("burgers") || "[]");
	}
</script>

<template>
	<main>
		<h1>Favourities Burger</h1>
		<div class="burgers-grid" v-if="burgers.length > 0">
			<BurgerCard
				v-for="burger in burgers"
				:burger
				@burgerRemoved="updateBurgers"
			/>
		</div>
		<span class="no-burgers" v-else
			>You don't have any favourities burgers</span
		>
	</main>
</template>

<style scoped>
	.burgers-grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 32px;
		width: 80%;
		margin: 0 auto;
	}
	.no-burgers {
		color: var(--secondary-text-color);
	}

	@media (max-width: 1024px) {
		.burgers-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media (max-width: 768px) {
		.burgers-grid {
			grid-template-columns: repeat(3, 1fr);
			padding: 16px 0;
		}
	}

	@media (max-width: 576px) {
		.burgers-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
