// Import necessary modules and components
import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

// MovieCard component to display a movie card
const MovieCard = ({ id, poster_path, title, vote_average, release_date }: Movie) => {
    return (
        // Link to navigate to the movie details page
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className="w-[30%]">
                {/* Display the movie poster */}
                <Image
                    source={{
                        uri: poster_path
                            ? `https://image.tmdb.org/t/p/w500${poster_path}`
                            : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
                    }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                />

                {/* Display the movie title */}
                <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
                    {title}
                </Text>

                {/* Display the movie rating */}
                <View className="flex-row items-center justify-start gap-x-1">
                    <Image source={icons.star} alt="star" className="size-4" />
                    <Text className="text-xs text-white font-bold uppercase">{Math.round(vote_average / 2)}</Text>
                </View>

                {/* Display the movie release year */}
                <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-light-300 font-medium mt-1">{release_date?.split('-')[0]}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
}

export default MovieCard;