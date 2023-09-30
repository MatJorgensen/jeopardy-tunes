<script lang="ts">
	import QuestionTile from './QuestionTile.svelte';
	export let title: string;
	export let questions: { question: string; answer: string; points: number; revealed: boolean }[];
</script>

<div class="category">
	<div class="category-tile">
		<p>{title}</p>
	</div>
	<div class="questions">
		{#each questions as { question, answer, points, revealed }, index (index)}
			<QuestionTile {question} {answer} {points} {revealed} />
		{/each}
	</div>
</div>

<style>
	@font-face {
		font-family: 'Swiss 911 Ultra Compressed BT';
		src: url('./fonts/swiss-911-ultra-compressed-bt.woff2') format('woff2'),
			url('./fonts/swiss-911-ultra-compressed-bt.woff') format('woff');
		font-weight: normal;
		font-style: normal;
	}
	.category {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.category-tile {
		display: flex; /* use flexbox */
		align-items: center; /* center text vertically */
		justify-content: center; /* center text horizontally */
		background-color: #0219a3;
		text-align: center;
		color: #ffffff; 
		height: 100px; /* adjust as needed */
		width: 270px;
		margin-top: 5px;
		margin-bottom: 10px;
	}
	.questions {
		display: flex;
		flex-direction: column; /* Ensure questions are stacked vertically s*/
	}
	p {
		font-family: 'Swiss 911 Ultra Compressed BT', 'Helvetica', 'Arial', sans-serif;
		font-size: 48px; /* adjust as needed */
		color: #fff;
		text-shadow: 4px 4px 2px #000;
		margin: 0; /* remove default paragraph margins */
	}
</style>
