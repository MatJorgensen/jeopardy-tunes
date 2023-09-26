import { writable } from 'svelte/store';

interface ModalStore {
  isOpen: boolean;
  question: string | null;
  answer: string | null;
  points: number;
}

const initialState: ModalStore = {
  isOpen: false,
  question: null,
  answer: null,
  points: 0
};

const modalStore = writable<ModalStore>(initialState);

export default modalStore;