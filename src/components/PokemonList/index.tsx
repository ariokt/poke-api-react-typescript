import React, { useEffect, useState } from 'react';
import { fetchPokemonList } from '../../utils/pokeapi.tsx';
import PokemonCard from '../PokemonCard/index.tsx';

const PokemonList: React.FC = () => {
    const [pokemonList, setPokemonList] = useState<any[]>([]);
    const [nextPageUrl, setNextPageUrl] = useState('');
    const [loadingScrolling, setLoadingScrolling] = useState(false);

    const getDataPokemonByScrolling = async () => {
        setLoadingScrolling(true);
        const response = nextPageUrl ? await fetchPokemonList(nextPageUrl) : await fetchPokemonList();
        if (response.results) {
            const listPokemon = response.results;
            setPokemonList([...pokemonList, ...listPokemon]);
            if (response.next !== null) {
                setNextPageUrl(response.next);
            } else {
                setNextPageUrl('null')
            }
        }
        setLoadingScrolling(false);
    };

    useEffect(() => {
        getDataPokemonByScrolling();
    }, []);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 10 && !loadingScrolling) {
            getDataPokemonByScrolling();
        }
    };
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadingScrolling, pokemonList]);

    return (
        <div className='bg-white p-4 min-h-[100vh]'>
            <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-2 rounded-xl'>
              {pokemonList.map((pokemon) => (
                  <PokemonCard key={pokemon.name} pokemon={pokemon} />
              ))}
            </div>
            {loadingScrolling && <div className='mx-auto text-xl w-fit my-4'>Loading...</div>}
        </div>
    );
};

export default PokemonList;