// Import necessary modules and components
import { Stack } from "expo-router";
import './globals.css';
import { StatusBar } from "react-native";

// Root layout component for the application
export default function RootLayout() {
  return (
      <>
        {/* Hide the status bar for a cleaner UI */}
        <StatusBar hidden={true} />
        
        {/* Define the navigation stack */}
        <Stack>
          {/* Main tabs screen, header is hidden */}
          <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false }} />
          
          {/* Movie details screen, header is hidden */}
          <Stack.Screen
              name="movies/[id]"
              options={{ headerShown: false }} />
        </Stack>
      </>
  );
}
