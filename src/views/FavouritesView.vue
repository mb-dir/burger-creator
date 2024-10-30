<script setup lang="ts">
	import BurgerCard from "@/components/BurgerCard.vue";
	const burgers = JSON.parse(localStorage.getItem("burgers") || "[]");
</script>

<template>
	<main>
		<h1>Favourities Burger</h1>
		<div class="burgers-grid" v-if="burgers.length > 0">
			<BurgerCard v-for="burger in burgers" :burger />
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
</style>
