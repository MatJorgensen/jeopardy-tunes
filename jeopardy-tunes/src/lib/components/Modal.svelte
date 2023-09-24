<script lang="ts">
	import { onMount } from 'svelte';
	import modalStore from '$lib/stores/modalStore';

	let isOpen: boolean;
	let question: string;
	let answer: string;
	let points: number;
	let showAnswer = false;
	let modalContent: HTMLElement;

	modalStore.subscribe(({ isOpen: open, question: q, answer: a, points: p }) => {
		isOpen = open;
		question = q;
		answer = a;
		points = p;
		showAnswer = false;
	});

	$: if (isOpen && modalContent) {
		modalContent.focus();
	}

	function closeModal(event: MouseEvent) {
		if (event.target !== modalContent) {
			modalStore.set({ isOpen: false, question: '', answer: '', points: 0 });
		}
	}

	function handleKeyup(event: KeyboardEvent) {
		if (event.key === ' ') {
			showAnswer = !showAnswer;
		}
	}

	onMount(() => {
		window.addEventListener('keyup', handleKeyup);
		return () => {
			window.removeEventListener('keyup', handleKeyup);
		};
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions a11y-no-noninteractive-tabindex -->
{#if isOpen}
	<div class="modal-overlay" on:click={closeModal}>
		<div
			bind:this={modalContent}
			class="modal-content"
			on:click={(e) => e.stopPropagation()}
			tabindex={0}
		>
			<h2>{question}</h2>
			{#if showAnswer}
				<p>{answer}</p>
			{/if}
			<p>Points: {points}</p>
			<button
				on:click={(e) => {
					e.stopPropagation();
					closeModal(e);
				}}>Close</button
			>
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-content {
		background: white;
		padding: 20px;
		border-radius: 8px;
        outline: none;
	}
</style>
