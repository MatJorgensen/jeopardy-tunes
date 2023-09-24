<script lang="ts">
	import Category from './Category.svelte';
	import Modal from './Modal.svelte';
	import Player from './Player.svelte';
	import playerStore, { adjustPlayerScore } from '$lib/stores/playerStore';

	// For simplicity, let's hardcode some questions. In a real app, you might fetch these from an API.
	const categories = [
		{
			title: 'Classical',
			questions: [
				{
					points: 100,
					question: 'Who wrote the song "Lose Yourself"',
					answer: 'Eminem'
				},
				{
					points: 200,
					question: 'Q',
					answer: 'Bach'
				},
				{
					points: 300,
					question: 'Q',
					answer: 'Bach'
				},
				{
					points: 400,
					question: 'Q',
					answer: 'Bach'
				},
				{
					points: 500,
					question: 'Q',
					answer: 'Bach'
				}
			]
		},
		{
			title: 'Hip-hop',
			questions: [
				{
					points: 100,
					question: 'Q',
					answer: 'Bach'
				},
				{
					points: 200,
					question: 'Q',
					answer: 'Bach'
				},
				{
					points: 300,
					question: 'Q',
					answer: 'Bach'
				},
				{
					points: 400,
					question: 'Q',
					answer: 'Bach'
				},
				{
					points: 500,
					question: 'Q',
					answer: 'Bach'
				}
			]
		},
		{
			title: 'Jazz',
			questions: [
				{
					points: 100,
					question: 'Q',
					answer: 'Bach'
				},
				{
					points: 200,
					question: 'Q',
					answer: 'Bach'
				},
				{
					points: 300,
					question: 'Q',
					answer: 'Bach'
				},
				{
					points: 400,
					question: 'Q',
					answer: 'Bach'
				},
				{
					points: 500,
					question: 'Q',
					answer: 'Bach'
				}
			]
		},
		{
			title: 'Techno',
			questions: [
				{
					points: 100,
					question: 'Q',
					answer: 'Bach'
				},
				{
					points: 200,
					question: 'Q',
					answer: 'Bach'
				},
				{
					points: 300,
					question: 'Q',
					answer: 'Bach'
				},
				{
					points: 400,
					question: 'Q',
					answer: 'Bach'
				},
				{
					points: 500,
					question: 'Q',
					answer: 'Bach'
				}
			]
		},
		{
			title: 'R&B',
			questions: [
				{
					points: 100,
					question: 'Q',
					answer: 'Bach'
				},
				{
					points: 200,
					question: 'Q',
					answer: 'Bach'
				},
				{
					points: 300,
					question: 'Q',
					answer: 'Bach'
				},
				{
					points: 400,
					question: 'Q',
					answer: 'Bach'
				},
				{
					points: 500,
					question: 'Q',
					answer: 'Bach'
				}
			]
		}
	];
</script>

<div class="game-board">
	{#each categories as { title, questions }, index (index)}
		<Category {title} {questions} />
	{/each}
</div>

<div class="players-container">
	{#each $playerStore as { id, name, score }}
		<Player {name} {score} onScoreChange={(change) => adjustPlayerScore(id, change)} />
	{/each}
</div>

<Modal />

<style>
	.game-board {
		/* Add styling for the game board */
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 1rem;
	}

	.players-container {
		display: flex;
		justify-content: center;
		gap: 20px; /* adjust gap as per your requirement */
	}
</style>
