<script setup lang="ts">
	import { ref, watch } from "vue";

	const htmlInputNumber = ref<null | HTMLInputElement>(null);

	const model = defineModel({ default: 0 });

	const emit = defineEmits(["decrease", "increase"]);

	const error = ref<null | string>(null);

	function increase() {
		error.value = null;

		emit("increase");

		htmlInputNumber.value?.stepUp();
		htmlInputNumber.value?.dispatchEvent(
			new Event("input", { bubbles: true, cancelable: true })
		);
		htmlInputNumber.value?.dispatchEvent(
			new Event("change", { bubbles: true, cancelable: true })
		);
	}

	function decrease() {
		if (model.value === 0) {
			error.value = "Ingredient number must be positive";
			return;
		}
		emit("decrease");
		htmlInputNumber.value?.stepDown();
		htmlInputNumber.value?.dispatchEvent(
			new Event("input", { bubbles: true, cancelable: true })
		);
		htmlInputNumber.value?.dispatchEvent(
			new Event("change", { bubbles: true, cancelable: true })
		);
	}
</script>

<template>
	<div class="control">
		<button @click="decrease" class="control__btn control__btn--minus">
			-
		</button>
		<!-- As far as I understand user can use only '+' and '-' buttons to change value so to prevent manual value change we can use disabled -->
		<input
			v-model="model"
			type="number"
			class="control__input"
			ref="htmlInputNumber"
			step="1"
			disabled
		/>
		<button @click="increase" class="control__btn control__btn--plus">+</button>
	</div>
	<div class="error">
		<span v-if="error" class="error__message">{{ error }}</span>
	</div>
</template>

<style scoped>
	.control {
		display: flex;
		gap: 12px;
		justify-content: center;
	}

	.control__input {
		width: 50%;
		border: none;
		background-color: transparent;
		text-align: center;
		color: var(--primary-text-color);
		font-family: "Snowburst One", system-ui;
	}

	.control__btn {
		border: none;
		border-radius: 50%;
		width: 25px;
		height: 25px;
		color: var(--primary-text-color);
		font-size: 20px;
		cursor: pointer;
	}

	.control__btn--minus {
		background-color: var(--danger-color);
	}

	.control__btn--plus {
		background-color: var(--success-color);
	}
	/* https://www.geeksforgeeks.org/how-to-disable-arrows-from-number-input/ */
	.control__input::-webkit-outer-spin-button,
	.control__input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.control__input {
		-moz-appearance: textfield;
		appearance: textfield;
	}

	.error {
		line-height: 0;
		height: 6px;
		text-wrap: nowrap;
	}

	.error__message {
		font-size: 12px;
		color: var(--danger-color);
	}
</style>
