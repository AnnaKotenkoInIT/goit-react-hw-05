import axios from 'axios';

const API_KEY = '31ace7b6a6824899d80bb6ad6519c3cd';
const BASE_URL = 'https://api.themoviedb.org/3';

axios.defaults.baseURL = BASE_URL;

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWFjZTdiNmE2ODI0ODk5ZDgwYmI2YWQ2NTE5YzNjZCIsIm5iZiI6MTcyODg0OTkyOC4zMTc4MzQsInN1YiI6IjY3MGMyNmI0M2JiNDU1N2M2NjliYzFiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZyiFBGwu87TUf_UuB_Bo9trIErqPK5lO3_60QrlIRmI',
  },
};

const defaultParams = {
  language: 'en-US',
  include_adult: false,
  api_key: API_KEY,
};

export const getTrendingMovies = async () => {
  try {
    const { data } = await axios.get(`/trending/movie/day`, {
      ...options,
      params: defaultParams,
    });
    return data.results;
  } catch (error) {
    console.error('Error fetching trending movies: ', error);
    throw error;
  }
};

export const searchMovies = async query => {
  try {
    const { data } = await axios.get(`/search/movie`, {
      ...options,
      params: {
        ...defaultParams,
        query: encodeURIComponent(query),
        page: 1,
      },
    });
    return data.results;
  } catch (error) {
    console.error('Error searching movies: ', error);
    throw error;
  }
};

export const getMovieDetails = async movieId => {
  try {
    const { data } = await axios.get(`/movie/${movieId}`, {
      ...options,
      params: defaultParams,
    });
    return data;
  } catch (error) {
    console.error('Error fetching movie details: ', error);
    throw error;
  }
};

export const getMoviesCredits = async movieId => {
  try {
    const { data } = await axios.get(`/movie/${movieId}/credits`, {
      ...options,
      params: defaultParams,
    });
    return data.cast;
  } catch (error) {
    console.error('Error fetching movie credits: ', error);
    throw error;
  }
};

export const getMoviesReview = async movieId => {
  try {
    const { data } = await axios.get(`/movie/${movieId}/reviews`, {
      ...options,
      params: {
        ...defaultParams,
        page: 1,
      },
    });
    return data.results;
  } catch (error) {
    console.error('Error fetching movie reviews: ', error);
    throw error;
  }
};
