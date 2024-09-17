import { GameStatus, type PokemonListResponse } from '@/modules/pokemon/interfaces';
import { computed, onMounted, ref } from 'vue';
import { pokemonApi } from '../api/pokemonApi';
import confetti from 'canvas-confetti';
import type { Pokemon } from '../interfaces/pokemonInterface';

export const usePokemonGame = () => {
  // Refs
  const gameStatus = ref<GameStatus>(GameStatus.onPlay);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonOptions = ref<Pokemon[]>([]);

  // Computed
  const randomPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length);
    return pokemonOptions.value[randomIndex];
  });
  const isLoading = computed(() => pokemons.value.length === 0);

  // Función para obtener todos los Pokémons
  const getPokemons = async (): Promise<Pokemon[]> => {
    const resp = await pokemonApi.get<PokemonListResponse>('/?limit=151');

    const pokemonArray = resp.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');
      const id = urlParts.at(-2) ?? 0;
      return {
        name: pokemon.name,
        id: +id, //con el + se converite el tipo a número
      };
    });

    return pokemonArray.sort(() => Math.random() - 0.5);
  };

  // Función para obtenen pokémons de opciones
  const getNextRound = (howMany: number = 4) => {
    gameStatus.value = GameStatus.onPlay;
    pokemonOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
  };

  const checkAnswer = (id: number) => {
    const hasWon = randomPokemon.value.id === id;

    if (hasWon) {
      gameStatus.value = GameStatus.won;
      confetti({
        particleCount: 400,
        spread: 150,
        origin: {
          y: 0.6,
        },
      });
      return;
    }
    gameStatus.value = GameStatus.lost;
  };
  // Lo que ocurre cuando se monta el componente
  onMounted(async () => {
    await new Promise((r) => setTimeout(r, 500));
    pokemons.value = await getPokemons();
    getNextRound();

    console.log(pokemonOptions.value);
  });

  return {
    // Props
    gameStatus,
    isLoading,
    pokemonOptions,
    randomPokemon,
    checkAnswer,

    // Methods
    getNextRound,
  };
};
