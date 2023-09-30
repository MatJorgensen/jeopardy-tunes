<script lang="ts">
	import { onMount } from 'svelte';
	import modalStore from '$lib/stores/modalStore';

	let isOpen: boolean;
	let question: string | null;
	let answer: string | null;
	let audioPath: string | null;
	let points: number;
	let showAnswer = false;
	let modalContent: HTMLElement;

	// audio
	let playing = false;
	let progress = 0;
	let audio: HTMLAudioElement | null;

	modalStore.subscribe(({ isOpen: open, question: q, answer: a, audioPath: ap, points: p }) => {
		isOpen = open;
		question = q;
		answer = a;
		audioPath = ap;
		points = p;
		showAnswer = false;

		resetAudio();
	});

	$: if (isOpen && modalContent) {
		modalContent.focus();
	}

	$: if (audioPath && audioPath !== '') {
		if (audio) {
			audio.pause();
			audio.removeEventListener('timeupdate', updateProgress);
		}
		audio = new Audio(audioPath);
		audio.addEventListener('timeupdate', updateProgress);
	}

	function closeModal(event: MouseEvent) {
		if (event.target !== modalContent) {
			modalStore.update((store) => {
				return { ...store, isOpen: false };
			});
			resetAudio();
		}
	}

	function handleKeyup(event: KeyboardEvent) {
		if (event.key === ' ') {
			showAnswer = !showAnswer;
		}
	}

	// audio
	function playPauseAudio() {
		if (!audioPath || audioPath === '') return;

		if (playing) {
			audio?.pause();
		} else {
			audio?.play();
		}
		playing = !playing;
	}

	function updateProgress() {
		if (audio?.currentTime && audio?.duration) {
			progress = (audio?.currentTime / audio?.duration) * 100;
		}
	}

	function resetAudio() {
		if (audio) {
			audio.pause();
			audio.currentTime = 0;
			playing = false;
			progress = 0;
		}
	}

	onMount(() => {
		// question reveal
		window.addEventListener('keyup', handleKeyup);

		return () => {
			window.removeEventListener('keyup', handleKeyup);

			audio?.removeEventListener('timeupdate', updateProgress);
			audio = null;
		};
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions a11y-no-noninteractive-tabindex -->
{#if isOpen}
	<div class="modal-overlay" on:click={closeModal}>
		<div
			bind:this={modalContent}
			class="modal-content"
			on:click={(e) => e.stopPropagation()}
			tabindex={0}
		>
			<p>{question}</p>
			{#if showAnswer}
				<p>{answer}</p>
			{/if}
			<button on:click={playPauseAudio}>{playing ? 'Pause' : 'Play'}</button>
			<button
				on:click={(e) => {
					e.stopPropagation();
					closeModal(e);
				}}>Close</button
			>
			<div class="progress-bar">
				<div class="progress" style="width: {progress}%" />
			</div>
			
		</div>
	</div>
{/if}

<style>
	@font-face {
		font-family: 'Swiss 911 Ultra Compressed BT';
		src: url('./fonts/swiss-911-ultra-compressed-bt.woff2') format('woff2'),
			url('./fonts/swiss-911-ultra-compressed-bt.woff') format('woff');
		font-style: normal;
	}
	p {
		font-family: 'Swiss 911 Ultra Compressed BT', 'Helvetica', 'Arial', sans-serif;
		font-size: 32px; /* adjust as needed */
		color: #fff;
		text-shadow: 4px 4px 2px #000;
		margin: 10px 10px 10px 0;
	}
	button {
		margin-right: 5px;
		margin-bottom: 5px;
	}
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -95%);
		width: 800px;
		background: #0219a3;
		padding: 20px;
		border-radius: 8px;
		outline: none;
	}

	.progress-bar {
		width: 100%;
		height: 10px;
		background-color: #f3f3f3;
	}

	.progress {
		height: 100%;
		background-color: #4caf50;
	}
</style>
