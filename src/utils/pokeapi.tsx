import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (url = `${API_URL}/pokemon?limit=10`) => {
  if (url === 'null') {
      return null;
  } else {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error: any) {
        window.alert('koneksi bermasalah!');
        return error.response;
      }
  }
};

export const fetchPokemonDetails = async (url: string, name: string) => {
  if (url) {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error: any) {
        window.alert('koneksi bermasalah!');
        return error.response;
      }
  }
  if (name) {
      try {
          const response = await axios.get(`${API_URL}/pokemon/${name}`);
          return response.data;
      } catch (error: any) {
          window.alert('koneksi bermasalah!');
          return error.response;
      }
  }
};