<script lang="ts">
	import { onMount } from 'svelte';
	import modalStore from '$lib/stores/modalStore';

	export let name: string;
	export let image: string;
	export let score: number;
	export let onScoreChange: (change: number) => void;

	let profilePicture = './default-profile-picture.png'; // replace with actual path

	let lastQuestionPoints: number;

	onMount(() => {
		const unsubscribe = modalStore.subscribe(({ points }) => {
			lastQuestionPoints = points;
		});

		return unsubscribe; // This will be called when the component is destroyed
	});
</script>

<div class="player">
	<!--<img src={profilePicture} alt={`${name}'s profile picture`} class="profile-picture" />-->
	<div class="image">
		<h1>{image}</h1>
	</div>
	<div class="score-box">
		<p>$: {score}</p>
		<button on:click={() => onScoreChange(lastQuestionPoints)}>+</button>
		<button on:click={() => onScoreChange(-lastQuestionPoints)}>-</button>
	</div>
</div>

<style>
	@font-face {
		font-family: 'Swiss 911 Ultra Compressed BT';
		src: url('./fonts/swiss-911-ultra-compressed-bt.woff2') format('woff2'),
			url('./fonts/swiss-911-ultra-compressed-bt.woff') format('woff');
		font-style: normal;
	}
	h1 {
		font-size: 64px;
		padding-bottom: 10px;
	}
	p {
		font-family: 'Swiss 911 Ultra Compressed BT', 'Helvetica', 'Arial', sans-serif;
		font-size: 32px; /* adjust as needed */
		text-align: center;
		color: #fff;
		text-shadow: 4px 4px 2px #000;
		margin: 0; /* remove default paragraph margins */
	}
	.image {
		align-items: center; /* center text vertically */
		justify-content: center; /* center text horizontally */
	}
	.player {
		margin: 10px;
		display: flex; /* use flexbox */
		align-items: center; /* center text vertically */
		justify-content: center; /* center text horizontally */
		background-color: #0219a3;
		width: 180px;
		height: 100px;
	}
	.profile-picture {
		margin-right: 10px;
	}
	.score-box {
		margin: 10px;
		width: 65px;
	}
</style>
