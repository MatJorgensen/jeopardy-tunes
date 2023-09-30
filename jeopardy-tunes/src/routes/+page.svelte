<script lang="ts">
	import GameBoard from '$lib/components/GameBoard.svelte';
</script>

<main>
	<h1>Jeopardy Tunes!</h1>
	<GameBoard />
</main>

<style>
	@font-face {
		font-family: 'Geoparody Heavy';
		src: url('./fonts/geoparody-heavy.woff2') format('woff2'),
			url('./fonts/geoparody-heavy.woff') format('woff');
		font-weight: normal;
		font-style: normal;
	}
	h1 {
		text-align: center;
		font-family: 'Geoparody Heavy', fallback, sans-serif;
		font-size: 64px; /* adjust as needed */
		color: #fff;
	}
</style>
