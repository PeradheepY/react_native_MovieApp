// Import necessary modules and components
import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images";

// TrendingCard component to display a trending movie card
const TrendingCard = ({ movie: { movie_id, title, poster_url }, index }: TrendingCardProps) => {
    return (
        // Link to navigate to the movie details page
        <Link href={`/movies/${movie_id}`} asChild>
            <TouchableOpacity className="w-32 relative pl-5">
                {/* Display the movie poster */}
                <Image
                    source={{ uri: poster_url }}
                    className="w-32 h-48 rounded-lg"
                    resizeMode="cover"
                />

                {/* Display the ranking number with a gradient background */}
                <View className="absolute px-2 py-1 bottom-9 -left-3.5 rounded-full">
                    <MaskedView maskElement={
                        <Text className="font-bold text-white text-6xl">{index + 1}</Text>
                    }>
                        <Image source={images.rankingGradient} resizeMode="cover" className="size-14" />
                    </MaskedView>
                </View>

                {/* Display the movie title */}
                <Text className="text-sm font-bold text-light-200 mt-2" numberOfLines={2}>{title}</Text>
            </TouchableOpacity>
        </Link>
    );
}

export default TrendingCard;
