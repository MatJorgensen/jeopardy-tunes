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
					audioPath: './audio/KAYTRANADA - YOURE THE ONE.mp3',
					revealed: false
				},
				{
					points: 400,
					question: 'Q',
					answer: 'Tame Impala - The Less I Know The Better - Currents',
					audioPath: './audio/Tame Impala - The Less I Know The Better.mp3',
					revealed: false
				},
				{
					points: 500,
					question: 'Q',
					answer: "Scatman John - Scatman (ski-ba-bop-ba-dop-bop) - Scatman's World",
					audioPath: './audio/Scatman John - Scatman (ski-ba-bop-ba-dop-bop).mp3',
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
					answer: 'Hvad er Kanye West med "Touch The Sky"?',
					audioPath: './audio/Curtis Mayfield - Move on Up.mp3',
					revealed: false
				},
				{
					points: 200,
					question: 'Q',
					answer: 'Hvad er MC Hammer med "U Can\'t Touch This"?',
					audioPath: './audio/Rick James - Super Freak.mp3',
					revealed: false
				},
				{
					points: 300,
					question: 'Q',
					answer: 'Hvad er Fugees med "Ready or Not"?',
					audioPath: './audio/Enya - Boadicea.mp3',
					revealed: false
				},
				{
					points: 400,
					question: 'Q',
					answer: 'Hvad er Mos Def med "Ms. Fat Booty"?',
					audioPath: './audio/Aretha Franklin - One Step Ahead.mp3',
					revealed: false
				},
				{
					points: 500,
					question: 'Q',
					answer: 'Hvad er Pitbull med "Hotel Room Service"?',
					audioPath: './audio/Nightcrawlers, MK - Push The Feeling On - The Dub Of Doom.mp3',
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
					answer: 'Hvad er Rocky?',
					audioPath: './audio/Bill Conti - Gonna Fly Now.mp3',
					revealed: false
				},
				{
					points: 200,
					question: 'Q',
					answer: 'Hvad er Halo?',
					audioPath: './audio/Martin O\'Donnell and Michael Salvatori, Anthony Lo Re - Never Forget (From \'Halo 3\').mp3',
					revealed: false
				},
				{
					points: 300,
					question: 'Q',
					answer: 'Hvad er World of Warcraft?',
					audioPath: './audio/Jason Hayes - Elwynn Forest.mp3',
					revealed: false
				},
				{
					points: 400,
					question: 'Q',
					answer: 'Hvad er The Good, The Bad and The Ugly?',
					audioPath: './audio/Ennio Morricone - The Trio.mp3',
					revealed: false
				},
				{
					points: 500,
					question: 'Q',
					answer: 'Hvad er Modern Warfare 2?',
					audioPath: './audio/Hans Zimmer - Opening Titles.mp3',
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
					answer: 'Hvem er Timbaland?',
					audioPath: './audio/Nelly Furtado, Timbaland - Promiscuous.mp3',
					revealed: false
				},
				{
					points: 200,
					question: 'Beyoncé - Crazy in Love ft. ________',
					answer: 'Hvem er Jay-Z?',
					audioPath: './audio/Beyoncé - Crazy In Love (feat. Jay-Z).mp3',
					revealed: false
				},
				{
					points: 300,
					question: 'Post Malone - Sunflower ft. ________',
					answer: 'Hvem er Swae Lee?',
					audioPath: './audio/Post Malone, Swae Lee - Sunflower.mp3',
					revealed: false
				},
				{
					points: 400,
					question: 'Kato - Hey Shorty (Yeah Yeah Part II) ft. ________',
					answer: 'Hvem er U$O og Johnson?',
					audioPath: './audio/Kato - Hey Shorty (Yeah Yeah Part II).mp3',
					revealed: false
				},
				{
					points: 500,
					question: 'Kanye West - Mercy ft. ________',
					answer: 'Hvem er Big Sean, Pusha T og 2 Chainz?',
					audioPath: './audio/Kanye West, Big Sean, Pusha T, 2 Chainz - Mercy.mp3',
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
		{#each $playerStore as { id, name, image, score }}
			<Player {name} {image} {score} onScoreChange={(change) => adjustPlayerScore(id, change)} />
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
