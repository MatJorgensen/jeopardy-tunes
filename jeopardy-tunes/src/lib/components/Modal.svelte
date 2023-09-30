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
			<h2>{question}</h2>
			{#if showAnswer}
				<p>{answer}</p>
			{/if}
			<p>Points: {points}</p>
			<button on:click={playPauseAudio}>{playing ? 'Pause' : 'Play'}</button>
			<div class="progress-bar">
				<div class="progress" style="width: {progress}%" />
			</div>
			<button
				on:click={(e) => {
					e.stopPropagation();
					closeModal(e);
				}}>Close</button
			>
		</div>
	</div>
{/if}

<style>
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
		background: white;
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
