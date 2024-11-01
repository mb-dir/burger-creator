<script setup lang="ts">
	import type { burger } from "@/types";
	import BurgerRenderer from "@/components/BurgerRenderer.vue";
	import { RouterLink } from "vue-router";
	import ArrowBack from "@/components/icons/ArrowBack.vue";

	const props = defineProps<{ name: string }>();

	const burgers: burger[] = JSON.parse(localStorage.getItem("burgers") || "[]");

	const currentBurger = burgers.find((burger) => burger.name === props.name);
</script>

<template>
	<main>
		<RouterLink to="/favourite" class="link"> <ArrowBack /> Go back</RouterLink>
		<div v-if="currentBurger">
			<h1>{{ name }}</h1>
			<BurgerRenderer :burgerIngredients="currentBurger.ingredients" />
			<section class="ingredients">
				<h2>burger ingredients</h2>
				<ul class="ingredients__list">
					<li
						class="ingredients__item"
						v-for="ingredient in currentBurger.ingredients"
					>
						{{ ingredient.name }}
					</li>
				</ul>
			</section>
		</div>

		<div v-else class="no-content">
			Something went wrong with finding burger :(
		</div>
	</main>
</template>

<style scoped>
	.link {
		text-decoration: none;
		color: var(--primary-text-color);
	}

	.ingredients__list {
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.no-content {
		margin-top: 24px;
	}
</style>
