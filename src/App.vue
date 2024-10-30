<script setup lang="ts">
	import { RouterView } from "vue-router";
	import Menu from "./components/Menu.vue";
</script>

<template>
	<header class="header">
		<Menu />
	</header>

	<RouterView />
</template>

<style scoped>
	.header {
		position: sticky;
		top: 0;
		left: 0;
	}
</style>
