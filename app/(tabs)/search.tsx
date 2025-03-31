import {StyleSheet, Text, View, Image, FlatList, ActivityIndicator} from 'react-native'
import React, {useEffect} from 'react'
import {useState} from "react";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import {images} from "@/constants/images";
import MovieCard from "@/components/movieCard";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/searchBar";
import {updateSearchCount} from "@/services/appwrite";

const Search = () => {
    // State to store the search query entered by the user
    const [searchQuery, setSearchQuery] = useState('');

    // Custom hook to fetch movies based on the search query
    const {
        data: movies, // Fetched movies data
        loading, // Loading state
        error, // Error state
        refetch: loadMovies, // Function to refetch movies
        reset, // Function to reset the fetch state
    } = useFetch(()=> fetchMovies({
        query: searchQuery
    }), false)

    // Effect to handle debounced search query changes
    useEffect(()=>{
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                // Fetch movies if the search query is not empty
                await loadMovies();
            } else {
                // Reset the fetch state if the search query is empty
                reset();
            }
        }, 500); // Debounce delay of 500ms

        return () => clearTimeout(timeoutId); // Cleanup timeout on unmount or query change
    }, [searchQuery]);

    // Effect to update the search count when movies are fetched
    useEffect(() => {
        if (movies?.length > 0 && movies?.[0]) {
            updateSearchCount(searchQuery, movies[0]);
        }
    }, [movies]);

  return (
    <View className="flex-1 bg-primary">
      {/* Background image */}
      <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />

        <FlatList
            data={movies} // List of movies to display
            renderItem={({item}) => <MovieCard {...item} /> } // Render each movie using MovieCard component
            keyExtractor={(item) => item.id.toString()} // Unique key for each movie
            className="px-5"
            numColumns={3} // Display movies in 3 columns
            columnWrapperStyle={{
                justifyContent: 'center',
                gap: 16,
                marginVertical: 16
            }}
            contentContainerStyle={{ paddingBottom: 100}}
            ListHeaderComponent={
            <>
            {/* App logo */}
            <View className="w-full flex-row justify-center mt-20 items-center">
                <Image source={icons.logo} className="w-12 h-10" />
            </View>

                {/* Search bar */}
                <View className="my-5">
                    <SearchBar
                        placeholder="Search movies..."
                        value={searchQuery}
                        onChangeText={(text: string) => setSearchQuery(text)} // Update search query on text change
                    />
                </View>

                {/* Loading indicator */}
                {loading && (
                    <ActivityIndicator size="large" color="#0000ff" className="my-3"/>
                )}

                {/* Error message */}
                {error && (
                    <Text className="text-red-500 px-5 my-3">Error : {error.message}</Text>
                )}

                {/* Display search results header */}
                {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
                    <Text className="text-xl text-white font-bold">
                        Search Results for{' '}
                        <Text className="text-accent">{searchQuery}</Text>
                    </Text>
                )}

            </>
            }
            ListEmptyComponent={
                // Display message when no movies are found or no search query is entered
                !loading && !error ? (
                    <View className="mt-10 px-5">
                        <Text className="text-center text-gray-500">
                            {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
                        </Text>
                    </View>
                ) : null
            }

        />


    </View>
  )
}

export default Search

const styles = StyleSheet.create({})