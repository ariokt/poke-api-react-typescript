import React, { ChangeEventHandler, useEffect, useState } from 'react'
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

  const handleFilterSelection: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setFilterType(e.target.value);
  }

  return (
    <div className='mx-auto w-fit mb-4'>
      <select className='p-2 border rounded w-[200px]' onChange={handleFilterSelection}>
        {typesList.map((type) => <option key={type.name} value={type.name}>{type.name || 'all type'}</option>)}
      </select>
    </div>
  )
}

export default FilterByType;