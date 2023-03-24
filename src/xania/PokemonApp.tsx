﻿import '@xania/view';
import { state } from '@xania/view';
import { DemoContainer } from './DemoContainer';

export async function PokemonApp() {
	const pokemons = await fetchPokemons();

	const id = state(1);
	const pokemon = id.map(fetchPokemon);

	console.log(pokemons.length);

	return (
		<DemoContainer>
			<div>
				<b>{pokemon.prop('name')}</b>
			</div>
			<div>weight: {pokemon.prop('weight')}</div>
			<button click={id.update((x) => x + 1)}>load next</button>
		</DemoContainer>
	);
}

function fetchPokemons() {
	return fetch('https://pokeapi.co/api/v2/pokemon/')
		.then((e) => e.json())
		.then((data) => data.results);
}
type Pokemon = { name: string; weight: number; abilities: { ability: { name: string } }[] };
function fetchPokemon(id) {
	console.log(id);
	return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((r) => r.json()) as Promise<Pokemon>;
}