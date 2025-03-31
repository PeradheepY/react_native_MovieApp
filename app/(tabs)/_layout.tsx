// Import necessary components and libraries
import {ImageBackground, Image, StyleSheet, Text, View} from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images"; // Importing image constants
import { icons } from "@/constants/icons"; // Importing icon constants

// Component to render the tab icon with different styles based on focus state
const TabIcon = ({focused, icon, title}: any) => {
    if (focused) {
        // Render highlighted tab with background and title when focused
        return (
            <>
                <ImageBackground
                    source={images.highlight} // Highlight background image
                    className="flex flex-row w-full flex-1 min-w-[100px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
                >
                    <Image source={icon} tintColor="#151312" className="size-5"/> {/* Icon with dark tint */}
                    <Text className="text-secondary text-base font-semibold ml-2">{title}</Text> {/* Tab title */}
                </ImageBackground>
            </>
        )
    }

    // Render default tab icon when not focused
    return (
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Image source={icon} tintColor="#A8B5DB" className="size-5" /> {/* Icon with light tint */}
        </View>
    )
}

// Main layout component for the tab navigation
const _layout = () => {
  return (
    <Tabs
        screenOptions={{
            // Common options for all tabs
             tabBarShowLabel: false, // Hide default tab labels
             tabBarItemStyle: {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
             },
            tabBarStyle: {
                backgroundColor: '#0f0D23', // Tab bar background color
                borderRadius: 50, // Rounded tab bar
                marginHorizontal: 10, // Horizontal margin
                marginBottom: 10, // Bottom margin
                height: 52, // Tab bar height
                position: "absolute", // Absolute positioning
                overflow: 'hidden', // Hide overflow
                borderWidth: 1, // Border width
                borderColor: '#0f0d23' // Border color
            }
        }}
    >
      {/* Define individual tabs */}
      <Tabs.Screen 
      name="index" 
      options={{
        title: "Home", // Tab title
        headerShown: false, // Hide header
        tabBarIcon: ({ focused }) => (
            <TabIcon
             focused={focused} // Pass focus state
             icon={icons.home} // Home icon
             title="Home" // Tab title
            />
        )
      }}
      />
      <Tabs.Screen 
      name="search" 
      options={{
        title: "Search", 
        headerShown: false,
          tabBarIcon: ({ focused }) => (
              <TabIcon
                  focused={focused}
                  icon={icons.search} // Search icon
                  title="Search"
              />
          )
      }} />
      <Tabs.Screen 
      name="saved" 
      options={{
        title: "Saved", 
        headerShown: false,
          tabBarIcon: ({ focused }) => (
              <TabIcon
                  focused={focused}
                  icon={icons.save} // Saved icon
                  title="Saved"
              />
          )
      }} />
      <Tabs.Screen 
      name="profile" 
      options={{
        title: "Profile", 
        headerShown: false,
          tabBarIcon: ({ focused }) => (
              <TabIcon
                  focused={focused}
                  icon={icons.person} // Profile icon
                  title="Profile"
              />
          )
      }} />
    </Tabs>
  );
};

export default _layout;

// Stylesheet for additional styling (currently empty)
const styles = StyleSheet.create({});
