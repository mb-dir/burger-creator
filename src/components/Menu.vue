<script setup lang="ts">
	import { RouterLink } from "vue-router";
	import HomeIcon from "./icons/HomeIcon.vue";
	import HeartIcon from "./icons/HeartIcon.vue";
</script>

<template>
	<nav class="navigation">
		<RouterLink
			activeClass="navigation__item--active"
			class="navigation__item"
			to="/"
		>
			<HomeIcon />
		</RouterLink>
		<RouterLink
			activeClass="navigation__item--active"
			class="navigation__item"
			to="/favourite"
		>
			<HeartIcon />
		</RouterLink>
	</nav>
</template>

<style scoped>
	.navigation {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.navigation__item {
		background-color: var(--primary-text-color);
		height: 40px;
		width: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		color: black;
	}

	.navigation__item--active {
		color: var(--secondary-text-color);
	}
</style>
