import React, { useState, useEffect } from 'react';
import { fetchPokemonDetails } from '../../utils/pokeapi.tsx';
import { Link } from 'react-router-dom';
import TagPokemonType from '../TagPokemonType/index.tsx';

interface PokemonCardProps {
    pokemon: {
        name: string, 
        url: string,
    },
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const [loading, setLoading] = useState(true);
    const [detailPokemon, setDetailPokemon] = useState({
        sprites: {
            front_shiny: '',
        },
        species: {
            name: '',
        },
        types: [],
    });

    const getDataPokemon = async () => {
        const response = await fetchPokemonDetails(pokemon.url, '');
        setDetailPokemon(response);
        setLoading(false);
    };

    useEffect(() => {
        getDataPokemon();
    }, []);

    if (loading) {
        return (
            <div className='flex flex-col items-center shadow rounded-xl p-2'>
                <h3 className='text-xl'>{pokemonName}</h3>
                <div className='mx-auto w-fit my-4'>Loading...</div>
            </div>
        )
    }

    return (
        <Link to={`/${detailPokemon.species.name}`}>
            <div className='flex flex-col items-center shadow rounded-xl p-2'>
                <h3 className='text-xl'>{pokemonName}</h3>
                <img src={detailPokemon.sprites.front_shiny} alt={detailPokemon.species.name} width={200} height={200} />
                <div className='flex gap-2 justify-center'>{detailPokemon.types.map((typeInfo: any) => <TagPokemonType key={typeInfo.type.name} pokemonType={typeInfo.type.name} />)}</div>
            </div>
        </Link>
    );
};

export default PokemonCard;