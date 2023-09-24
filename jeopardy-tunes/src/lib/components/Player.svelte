<script lang="ts">
    export let name: string;
    export let score: number;
    export let onScoreChange: (change: number) => void;

    let profilePicture = './default-profile-picture.png'; // replace with actual path
  </script>
  
  <div class="player">
    <img src={profilePicture} alt={`${name}'s profile picture`} class="profile-picture"/>
    <div class="score-box">
      <button on:click={() => onScoreChange(score)}>+</button>
      $: {score}
      <button on:click={() => onScoreChange(-score)}>-</button>
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