// Import necessary modules from Appwrite SDK
import { Client, Databases, ID, Query } from "react-native-appwrite";
import { renderCurrentTest } from "nativewind/test";

// Constants for database and collection IDs
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

// Initialize Appwrite client
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite endpoint
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); // Appwrite project ID

// Initialize Appwrite database instance
const database = new Databases(client);

// Function to update the search count for a movie
export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        // Check if the search term already exists in the database
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal('searchTerm', query)]);

        if (result.documents.length > 0) {
            // Update the count if the search term exists
            const existingMovies = result.documents[0];
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovies.$id,
                {
                    count: existingMovies.count + 1
                }
            );
        } else {
            // Create a new document if the search term does not exist
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: query,
                movie_id: movie.id,
                count: 1,
                title: movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            });
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Function to fetch trending movies based on search count
export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        // Query the database for the top 5 trending movies
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count'),
        ]);
        return result.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.error(error);
        return undefined;
    }
};