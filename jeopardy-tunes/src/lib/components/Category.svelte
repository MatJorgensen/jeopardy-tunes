<script lang="ts">
	import QuestionTile from './QuestionTile.svelte';
	export let title: string;
	export let questions: { question: string; answer: string; points: number }[];
</script>

<div class="category">
	<h2>{title}</h2>
	<div class="questions">
		{#each questions as { question, answer, points }, index (index)}
			<QuestionTile {question} {answer} {points} />
		{/each}
	</div>
</div>

<style>
	.category {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .questions {
    display: flex;
    flex-direction: column; /* Ensure questions are stacked vertically */
    width: 100%;
  }
</style>
