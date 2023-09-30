<script lang="ts">
	import Category from './Category.svelte';
	import Modal from './Modal.svelte';
	import Player from './Player.svelte';
	import playerStore, { adjustPlayerScore } from '$lib/stores/playerStore';

	// For simplicity, let's hardcode some questions. In a real app, you might fetch these from an API.
	const categories = [
		{
			title: 'Artist, titel og album',
			questions: [
				{
					points: 100,
					question: 'Q',
					answer: 'A$AP Ferg - Floor Seats - Floor Seats',
					audioPath: './audio/A$AP Ferg - Floor Seats.mp3',
					revealed: false
				},
				{
					points: 200,
					question: 'Q',
					answer: 'The Game, 50 Cent - Hate it or Love it - The Documentary',
					audioPath: './audio/The Game, 50 Cent - Hate It Or Love It.mp3',
					revealed: false
				},
				{
					points: 300,
					question: 'Q',
					answer: "KAYTRANADA - YOU'RE THE ONE - 99.9%",
					audioPath: '',
					revealed: false
				},
				{
					points: 400,
					question: 'Q',
					answer: 'Tame Impala - The Less I Know The Better - Currents',
					audioPath: '',
					revealed: false
				},
				{
					points: 500,
					question: 'Q',
					answer: "Scatman John - Scatman (ski-ba-bop-ba-dop-bop) - Scatman's World",
					audioPath: '',
					revealed: false
				}
			]
		},
		{
			title: 'Trivia',
			questions: [
				{
					points: 100,
					question:
						'Denne rapper producerede en stor del af numrene på Jay-Z\'s album "The Blueprint"',
					answer: 'Hvem er Kanye West?',
					audioPath: '',
					revealed: false
				},
				{
					points: 200,
					question: 'Denne musikvideo var den første til at få en milliard visninger på YouTube',
					answer: 'Hvad er "Gangnam Style"?',
					audioPath: '',
					revealed: false
				},
				{
					points: 300,
					question: 'Denne artist har vundet flest Grammy-statuetter',
					answer: 'Hvem er Beyoncé?',
					audioPath: '',
					revealed: false
				},
				{
					points: 400,
					question: 'Dette nabolag er hvor 2Pac blev født',
					answer: 'Hvad er Harlem, New York?',
					audioPath: '',
					revealed: false
				},
				{
					points: 500,
					question: 'Dette album, udgivet i 1977, indeholder tracks som "Go Your Own Way" og "Dreams", og er et af de bedst sælgende albums nogensinde.',
					answer: 'Hvad er "Rumours" af Fleetwood Mac?',
					audioPath: '',
					revealed: false
				}
			]
		},
		{
			title: 'Hvem samplede?',
			questions: [
				{
					points: 100,
					question: 'Q',
					answer: 'Bach',
					audioPath: '',
					revealed: false
				},
				{
					points: 200,
					question: 'Q',
					answer: 'Bach',
					audioPath: '',
					revealed: false
				},
				{
					points: 300,
					question: 'Q',
					answer: 'Bach',
					audioPath: '',
					revealed: false
				},
				{
					points: 400,
					question: 'Q',
					answer: 'Bach',
					audioPath: '',
					revealed: false
				},
				{
					points: 500,
					question: 'Q',
					answer: 'Bach',
					audioPath: '',
					revealed: false
				}
			]
		},
		{
			title: 'Film eller spil bag',
			questions: [
				{
					points: 100,
					question: 'Q',
					answer: 'Bach',
					audioPath: '',
					revealed: false
				},
				{
					points: 200,
					question: 'Q',
					answer: 'Bach',
					audioPath: '',
					revealed: false
				},
				{
					points: 300,
					question: 'Q',
					answer: 'Bach',
					audioPath: '',
					revealed: false
				},
				{
					points: 400,
					question: 'Q',
					answer: 'Bach',
					audioPath: '',
					revealed: false
				},
				{
					points: 500,
					question: 'Q',
					answer: 'Bach',
					audioPath: '',
					revealed: false
				}
			]
		},
		{
			title: 'Hvem er featuring?',
			questions: [
				{
					points: 100,
					question: 'Nelly Furtado - Promiscuous ft. ________',
					answer: 'Timbaland',
					audioPath: '',
					revealed: false
				},
				{
					points: 200,
					question: 'Beyoncé - Crazy in Love ft. ________',
					answer: 'Jay-Z',
					audioPath: '',
					revealed: false
				},
				{
					points: 300,
					question: 'Post Malone - Sunflower ft. ________',
					answer: 'Swae Lee',
					audioPath: '',
					revealed: false
				},
				{
					points: 400,
					question: 'Kato - Hey Shorty (Yeah Yeah Part II) ft. ________',
					answer: 'U$O & Johnson',
					audioPath: '',
					revealed: false
				},
				{
					points: 500,
					question: 'Kanye West - Mercy ft. ________',
					answer: 'Big Sean, Pusha T & 2 Chainz',
					audioPath: '',
					revealed: false
				}
			]
		}
	];
</script>

<div class="container">
	<!-- Game Board -->
	<div class="game-board">
		{#each categories as { title, questions }, index (index)}
			<Category {title} {questions} />
		{/each}
	</div>

	<!-- Players Container -->
	<div class="players-container">
		{#each $playerStore as { id, name, score }}
			<Player {name} {score} onScoreChange={(change) => adjustPlayerScore(id, change)} />
		{/each}
	</div>

	<!-- Modal -->
	<Modal />
</div>

<style>
	/* Container Styling */
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 0 auto; /* Center container horizontally */
	}

	/* Game Board Styling */
	.game-board {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		background-color: #000;
		width: 1400px;
		padding: 5px;
	}

	/* Players Container Styling */
	.players-container {
		display: flex;
		justify-content: center;
		gap: 20px; /* adjust gap as per your requirement */
	}
</style>
