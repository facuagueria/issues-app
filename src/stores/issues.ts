import { ref } from 'vue';
import { defineStore } from 'pinia';
import { State } from 'src/issues/interfaces/issue';

export const useIssuesStore = defineStore('Issues', () => {
  const state = ref<State>(State.All);
  const labels = ref<string[]>([]);

  const toggleLabel = (labelName: string) => {
    if (labels.value.includes(labelName)) {
      labels.value = labels.value.filter((label) => label !== labelName);
      return;
    }

    labels.value.push(labelName);
  };

  return {
    // State
    state,
    labels,
    // Getters
    // Actions
    toggleLabel,
  };
});
