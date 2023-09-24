<script lang="ts">
    import modalStore from '$lib/stores/modalStore';

	export let question: string;
	export let answer: string;
	export let points: number;

	let revealed = false;

	function handleReveal() {
		modalStore.set({ isOpen: true, question, answer, points });
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<button on:click={handleReveal} class="question-tile">
    <p>${points}</p>
  </button>

<style>
	.question-tile {
    background-color: #0219a3;
    border: 2px solid #ffffff;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    color: #ffffff; /* White text color */
  }
	.question {
		/* Add styling for the revealed question */
	}
</style>
