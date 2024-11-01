import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import FavouritesView from "@/views/FavouritesView.vue";
import SingleBurgerView from "@/views/SingleBurgerView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/favourite/:name",
			name: "single-favourite",
			component: SingleBurgerView,
			props: true,
		},
		{
			path: "/favourite",
			name: "favourite",
			component: FavouritesView,
		},
	],
});

export default router;
