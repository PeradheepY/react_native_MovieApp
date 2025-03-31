// Import necessary components and modules
import {ActivityIndicator, FlatList, Image, ScrollView, Text, View} from "react-native";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/searchBar";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/movieCard";
import {getTrendingMovies} from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

// Main component for the index screen
export default function Index() {
    const router = useRouter(); // Router for navigation

    // Fetch trending movies using a custom hook
    const {
        data: trendingMovies,
        loading: trendingLoading,
        error: trendingError
    } = useFetch(getTrendingMovies);

    // Fetch latest movies using a custom hook
    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError
    } = useFetch(()=> fetchMovies({
        query: ''
    }))

    return (
        <View className="flex-1 bg-primary">
            {/* Background image */}
            <Image source={images.bg} className="absolute w-full z-0" />

            {/* Scrollable content */}
            <ScrollView 
                className="flex-1 px-5" 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{ minHeight:"100%", paddingBottom: 10 }}
            >
                {/* App logo */}
                <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

                {/* Show loading indicator or error message if data is not ready */}
                {moviesLoading || trendingLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        className="mt-10 self-center"
                    />
                ) : moviesError || trendingError ? (
                    <Text>Error: {moviesError?.message || trendingError?.message}</Text>
                ) : (
                    <View className="flex-1 mt-5">
                        {/* Search bar for navigating to the search screen */}
                        <SearchBar
                            onPress={() => router.push("/search")}
                            placeholder="Search for a movie"
                        />

                        {/* Trending movies section */}
                        {trendingMovies && (
                            <View className="mt-10">
                                <Text className="text-lg text-white font-bold mt-5 mb-3">
                                    Trending Movies
                                </Text>
                            </View>
                        )}

                        <>
                            {/* Horizontal list of trending movies */}
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                ItemSeparatorComponent={() => <View className="w-4" />}
                                className="mb-4 mt-3"
                                data={trendingMovies}
                                renderItem={({ item, index }) => (
                                    <TrendingCard movie={item} index={index} />
                                )}
                                keyExtractor={(item) => item.movie_id.toString()}
                            />

                            {/* Latest movies section */}
                            <Text className="text-lg text-white font-bold mt-5 mb-3">
                                Latest Movies
                            </Text>

                            {/* Grid list of latest movies */}
                            <FlatList
                                data={movies}
                                renderItem={({ item }) => (
                                    <MovieCard {...item} />
                                )}
                                keyExtractor={(item) => item.id.toString()}
                                numColumns={3}
                                columnWrapperStyle={{
                                    justifyContent: 'flex-start',
                                    gap: 20,
                                    paddingRight: 5,
                                    marginBottom: 10
                                }}
                                className="mt-2 pb-32"
                                scrollEnabled={false}
                            />
                        </>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
