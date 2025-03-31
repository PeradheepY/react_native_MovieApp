// Configuration for The Movie Database (TMDB) API
export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3', // Base URL for TMDB API
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY, // API key for authentication
    headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}` // Bearer token for secure access
    }
};

// Function to fetch movies based on a query or discover popular movies
export const fetchMovies = async ({ query }: { query: string }) => {
    // Determine the endpoint based on whether a query is provided
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

    // Fetch data from the TMDB API
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    // Handle errors
    if (!response.ok) {
        throw new Error('Failed to fetch movie', response.statusText);
    }

    // Parse and return the response data
    const data = await response.json();
    return data.results;
};

// Function to fetch detailed information about a specific movie
export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
    try {
        // Fetch movie details from the TMDB API
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        // Handle errors
        if (!response.ok) throw new Error('Failed to fetch movie');

        // Parse and return the response data
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
