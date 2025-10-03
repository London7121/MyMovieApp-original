import { API_KEY } from "../constants";
import apiRequest from "./axios";
const base_url = "https://api.themoviedb.org/3"

const trendingMoviesUrl = `${base_url}/trending/movie/day?api_key=${API_KEY}`;
const upcomingMoviesUrl = `${base_url}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMoviesUrl = `${base_url}/movie/top_rated?api_key=${API_KEY}`;


export const fetchTrendingMovies = () => {
    return apiRequest(trendingMoviesUrl);
}
export const fetchUpcomingMovie = () => {
    return apiRequest(upcomingMoviesUrl);
}
export const fetchTopRatedMovie = () => {
    return apiRequest(topRatedMoviesUrl);
}

export const image500 = (posterPath) => {
    return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : null;
}
export const image342 = (posterPath) => {
    return posterPath ? `https://image.tmdb.org/t/p/w342${posterPath}` : null;
}
export const image185 = (posterPath) => {
    return posterPath ? `https://image.tmdb.org/t/p/w185${posterPath}` : null;
}