// Import necessary modules and components
import { Image, Text, TextInput, View } from 'react-native';
import React from 'react';
import { icons } from "@/constants/icons";

// Props interface for the SearchBar component
interface Props {
    placeholder: string;
    onPress?: () => void;
    value?: string;
    onChangeText?: (text: string) => void;
}

// SearchBar component to provide a search input field
const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
    return (
        <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
            {/* Search icon */}
            <Image source={icons.search} className="size-5" resizeMode="contain" tintColor="#ab8bff" />
            
            {/* Text input for search */}
            <TextInput
                onPress={onPress}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#a8b5db"
                className="flex-1 ml-2 text-white"
            />
        </View>
    );
}

export default SearchBar;