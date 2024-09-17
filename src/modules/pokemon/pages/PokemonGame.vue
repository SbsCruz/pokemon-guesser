<template>
  <section
    v-if="isLoading || randomPokemon.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl font-bold">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando...</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <div class="">
      <h1 class="m-5 text-3xl font-bold">Who's that Pokemon?</h1>
    </div>
    <!-- New Round -->
    <button
      v-if="gameStatus != GameStatus.onPlay"
      class="bg-blue-800 m-5 px-9 py-3 rounded-md text-white hover:bg-blue-600 transition-all"
      @click="getNextRound(4)"
    >
      Play Again?
    </button>
    <!-- Pokemon Picture -->
    <PokemonPicture :pokemon-id="randomPokemon.id" :showPokemon="gameStatus != GameStatus.onPlay" />
    <!-- Pokemon Options -->
    <PokemonOptions
      :options="options"
      :block-selection="gameStatus != GameStatus.onPlay"
      :correct-answer="randomPokemon.id"
      @selected-option="checkAnswer"
    />
  </section>
</template>

<!-- SCRIPT -->
<script setup lang="ts">
//imports
import PokemonPicture from '../components/PokemonPicture.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

// Composables
const {
  isLoading,
  randomPokemon,
  gameStatus,
  pokemonOptions: options,
  checkAnswer,
  getNextRound,
} = usePokemonGame();
</script>

<!-- STYLES -->

<style lang="css" scoped>
h1,
h3 {
  color: white;
}
</style>
