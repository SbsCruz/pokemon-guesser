<template>
  <section class="mt-5 flex flex-col">
    <button
      @click="$emit('selectedOption', id)"
      v-for="{ name, id } in options"
      :key="id"
      :class="[
        'capitalize disabled:shadow-none disabled:bg-gray-500',
        {
          correct: id === correctAnswer && blockSelection,
          incorrect: id != correctAnswer && blockSelection,
        },
      ]"
      :disabled="blockSelection"
    >
      {{ name }}
    </button>
  </section>
</template>

<!-- SCRIPT -->
<script setup lang="ts">
import type { Pokemon } from '../interfaces/pokemonInterface';

// props
interface Props {
  options: Pokemon[];
  blockSelection: boolean;
  correctAnswer: number;
}

defineProps<Props>();

// emites

defineEmits<{
  selectedOption: [id: number];
}>();
</script>

<!-- STYLES -->
<style scoped>
button {
  @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-400;
}

.correct {
  @apply bg-green-600 font-semibold text-white;
}

.incorrect {
  @apply bg-red-500;
}
</style>
