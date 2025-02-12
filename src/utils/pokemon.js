export async function fetchPokemonList(limit = 1000) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error("Failed to fetch Pokémon list")
    return res.json()
  }
  
  