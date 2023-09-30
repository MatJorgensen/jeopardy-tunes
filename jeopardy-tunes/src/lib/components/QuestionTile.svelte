<script lang="ts">
	import modalStore from '$lib/stores/modalStore';

	export let question: string;
	export let answer: string;
	export let points: number;
	export let revealed: boolean;

	function handleReveal() {
		modalStore.set({ isOpen: true, question, answer, points });
		revealed = true;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div on:click={handleReveal} class="question-tile" class:revealed>
	<p>${points}</p>
</div>

<style>
	@font-face {
		font-family: 'Swiss 911 Ultra Compressed BT';
		src: url('./fonts/swiss-911-ultra-compressed-bt.woff2') format('woff2'),
			url('./fonts/swiss-911-ultra-compressed-bt.woff') format('woff');
		font-style: normal;
	}
	p {
		font-family: 'Swiss 911 Ultra Compressed BT', 'Helvetica', 'Arial', sans-serif;
		font-size: 64px; /* adjust as needed */
		color: #eca255;
		text-shadow: 4px 4px 2px #000;
		margin: 0; /* remove default paragraph margins */
	}
	.question-tile {
		display: flex; /* use flexbox */
		align-items: center; /* center text vertically */
		justify-content: center; /* center text horizontally */
		background-color: #0219a3;
		text-align: center;
		cursor: pointer;
		color: #ffffff; 
		height: 100px; /* adjust as needed */
		width: 270px;
		margin: 5px;
	}
	.question {
		/* Add styling for the revealed question */
	}
	.revealed {
		background-color: grey; /* adjust as needed */
	}
</style>
