import { writable } from 'svelte/store';

interface ModalStore {
  isOpen: boolean;
  question: string;
  answer: string;
  points: number;
}

const initialState: ModalStore = {
  isOpen: false,
  question: "",
  answer: "",
  points: 0
};

const modalStore = writable<ModalStore>(initialState);

export default modalStore;