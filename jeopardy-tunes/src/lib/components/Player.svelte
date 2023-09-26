<script lang="ts">
	import { onMount } from 'svelte';
  import modalStore from '$lib/stores/modalStore';
  
	export let name: string;
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
	<img src={profilePicture} alt={`${name}'s profile picture`} class="profile-picture" />
	<div class="score-box">
		<button on:click={() => onScoreChange(lastQuestionPoints)}>+</button>
		$: {score}
		<button on:click={() => onScoreChange(-lastQuestionPoints)}>-</button>
	</div>
</div>

<style>
	.player {
		/* Add styles as needed */
	}
	.profile-picture {
		/* Add styles for the profile picture */
	}
	.score-box {
		/* Add styles for the score box */
	}
</style>
