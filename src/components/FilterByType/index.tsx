import React, { useEffect, useState } from 'react'
import { fetchAllTypes } from '../../utils/pokeapi';

interface FilterByTypeProps {
  setFilterType: (type: string) => void;
}

const  FilterByType: React.FC<FilterByTypeProps> = ({ setFilterType }) => {

  const [typesList, setTypesList] = useState<any[]>([{name: '', url: '' }]);

  const getFilterList = async () => {
    const response = await fetchAllTypes();
    if (response.results) {
      setTypesList([...typesList, ...response.results]);
    }
  }

  useEffect(() => {
    getFilterList();
  }, []);

  return (
    <div className='mx-auto w-fit mb-4'>
      <select className='p-2 border rounded w-[200px]' onChange={(e) => setFilterType(e.target.value)}>
        {typesList.map((type) => <option key={type.name} value={type.name}>{type.name || 'all type'}</option>)}
      </select>
    </div>
  )
}

export default FilterByType;