import { writable } from 'svelte/store';

interface Player {
  id: number;
  name: string;
  score: number;
}

const playersStore = writable<Player[]>([
  { id: 1, name: 'Player 1', score: 0 },
  { id: 2, name: 'Player 2', score: 0 },
]);

export function adjustPlayerScore(playerId: number, change: number) {
  playersStore.update(players => {
    const playerIndex = players.findIndex(p => p.id === playerId);
    if (playerIndex !== -1) {
      players[playerIndex].score += change;
    }
    return players;
  });
}

export default playersStore;
