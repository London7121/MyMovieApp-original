import { API_KEY } from "../constants";
import apiRequest from "./axios";
const base_url = "https://api.themoviedb.org/3"

const trendingMoviesUrl = `${base_url}/trending/movie/day?api_key=${API_KEY}`;
const upcomingMoviesUrl = `${base_url}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMoviesUrl = `${base_url}/movie/top_rated?api_key=${API_KEY}`;
const topPopularMoviesUrl = `${base_url}/movie/popular?api_key=${API_KEY}`;
const movieDetailsUrl = (id) => `${base_url}/movie/${id}?api_key=${API_KEY}`;
const movieCreditsUrl = (id) => `${base_url}/movie/${id}/credits?api_key=${API_KEY}`;
const movieVideosUrl = (id) => `${base_url}/movie/${id}/videos?api_key=${API_KEY}`;
const similarMoviesUrl = (id) => `${base_url}/movie/${id}/similar?api_key=${API_KEY}`;
const personalDetailUrl = (id) => `${base_url}/person/${id}?api_key=${API_KEY}`
const personalMoviesUrl = (id) => `${base_url}/person/${id}/movie_credits?api_key=${API_KEY}`

export const fetchTrendingMovies = () => {
    return apiRequest(trendingMoviesUrl);
}
export const fetchUpcomingMovie = () => {
    return apiRequest(upcomingMoviesUrl);
}
export const fetchTopRatedMovie = () => {
    return apiRequest(topRatedMoviesUrl);
}
export const fetchPopularMovie = () => {
    return apiRequest(topPopularMoviesUrl);
}

export const fetchMovieDetails = (id) => {
    return apiRequest(movieDetailsUrl(id));
}

export const fetchMovieCredits = (id) => {
    return apiRequest(movieCreditsUrl(id));
}

export const fetchMovieVideos = (id) => {
    return apiRequest(movieVideosUrl(id));
}

export const fetchSimilarMovies = (id) => {
    return apiRequest(similarMoviesUrl(id));
}

export const fetchPersonDetail = (id) => {
    return apiRequest(personalDetailUrl(id))
}
export const fetchPersonMovies = (id) => {
    return apiRequest(personalMoviesUrl(id))
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