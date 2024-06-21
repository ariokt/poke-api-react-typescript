import { useNavigate, useParams } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import { fetchPokemonDetails } from "../../utils/pokeapi";
import { useEffect, useState } from "react";
import TagPokemonType from "../../components/TagPokemonType";


function PokemonDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [detailPokemon, setDetailPokemon] = useState<any>(null);

  
  const getDataPokemon = async () => {
    if (name) {
      const response = await fetchPokemonDetails('', name);
      if (response.status === 404) {
        navigate('/');
      }
      setDetailPokemon(response);
    }
  };

  useEffect(() => {
    getDataPokemon();
  }, []);

  return (
    <DefaultLayout>
      <div className='bg-white p-8 min-h-[100vh]'>
        {
          detailPokemon ?
          <div className='flex flex-col'>
            <img className='mx-auto' src={detailPokemon.sprites.front_shiny} alt={detailPokemon.species.name} width={200} height={200} />
            <div className='flex flex-col translate-y-[-1rem]'>
              <h3 className='text-2xl mx-auto mb-2 font-bold'>{detailPokemon.species.name.charAt(0).toUpperCase() + detailPokemon.species.name.slice(1)}</h3>
              <div className='flex gap-2 justify-center'>{detailPokemon.types.map((typeInfo: any) => <TagPokemonType key={typeInfo.type.name} pokemonType={typeInfo.type.name} />)}</div>
              <div className='overflow-x-scroll'>
                <table className='mt-8 mx-auto w-fit table-auto bg-white border border-gray-300 overflow-x-scroll'>
                  <thead>
                    <tr>
                      {detailPokemon.stats.map((stat: any) => <th key={stat.stat.name} className='px-4 py-2 border-2 border-gray-300 text-sm md:text-base'>{stat.stat.name}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {detailPokemon.stats.map((stat: any) => <td key={stat.stat.name} className='px-4 py-2 border-2 border-gray-300 text-sm md:text-base'>{stat.base_stat}</td>)}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          :
          <div className='mx-auto w-fit my-4'>Loading...</div>
        }
      </div>
    </DefaultLayout>
    
  )
}

export default PokemonDetail;