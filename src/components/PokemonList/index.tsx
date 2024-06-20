import React, { useEffect, useState } from 'react';
import { fetchPokemonList, fetchPokemonListByType } from '../../utils/pokeapi.tsx';
import PokemonCard from '../PokemonCard/index.tsx';
import FilterByType from '../FilterByType/index.tsx';

const PokemonList: React.FC = () => {
    const [pokemonList, setPokemonList] = useState<any[]>([]);
    const [nextPageUrl, setNextPageUrl] = useState('');
    const [loadingScrolling, setLoadingScrolling] = useState(false);
    const [loadingFilterChange, setLoadingFilterChange] = useState(false);
    const [filterType, setFilterType] = useState('');

    const getDataPokemonByScrolling = async () => {
        setLoadingScrolling(true);
        const response = nextPageUrl ? await fetchPokemonList(nextPageUrl) : await fetchPokemonList();
        if (response?.results) {
            const listPokemon = response.results;
            setPokemonList([...pokemonList, ...listPokemon]);
            if (response.next !== null) {
                setNextPageUrl(response.next);
            } else {
                setNextPageUrl('null');
            }
        }
        setLoadingScrolling(false);
    };

    const getDataPokemonByFilter = async () => {
        setLoadingFilterChange(true);
        if (filterType !== '') {
            const response = await fetchPokemonListByType(filterType);
            if (response.pokemon) {
                const listPokemon = response.pokemon.map((item: any) => item.pokemon);
                setPokemonList(listPokemon);
            }
        } else {
            const response = await fetchPokemonList();
            if (response.results) {
                const listPokemon = response.results;
                setPokemonList(listPokemon);
                setNextPageUrl(response.next);
            }
        }
        setLoadingFilterChange(false);
    };

    useEffect(() => {
        getDataPokemonByScrolling();
    }, []);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 10 && !loadingScrolling && !filterType) {
            getDataPokemonByScrolling();
        }
    };
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadingScrolling, pokemonList, filterType]);

    useEffect(() => {
        setNextPageUrl('');
        getDataPokemonByFilter();
    }, [filterType]);

    return (
        <div className='bg-white p-4 min-h-[100vh]'>
            <FilterByType setFilterType={setFilterType} />
            {loadingFilterChange ? 
                <div className='mx-auto text-xl w-fit my-4'>Loading...</div>
                :
                pokemonList.length === 0
                ?
                <div className='mx-auto text-xl w-fit my-4'>Data Empty</div>
                :
                <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-2 rounded-xl'>
                    {pokemonList.map((pokemon) => (
                        <PokemonCard key={pokemon.name} pokemon={pokemon} />
                    ))}
                </div>
            }
            {loadingScrolling && <div className='mx-auto text-xl w-fit my-4'>Loading...</div>}
        </div>
    );
};

export default PokemonList;