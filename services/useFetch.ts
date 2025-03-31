// Import necessary hooks
import { useEffect, useState } from "react";

// Custom hook to fetch data with loading and error states
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    // State to store fetched data
    const [data, setData] = useState<T | null>(null);
    // State to track loading status
    const [loading, setLoading] = useState(false);
    // State to store any errors
    const [error, setError] = useState<Error | null>(null);

    // Function to fetch data
    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Execute the provided fetch function
            const result = await fetchFunction();

            setData(result);
        } catch (err) {
            // Handle errors
            setError(err instanceof Error ? err : new Error('An error occurred.'));
        } finally {
            setLoading(false);
        }
    };

    // Function to reset the state
    const reset = () => {
        setLoading(false);
        setError(null);
        setData(null);
    };

    // Automatically fetch data if autoFetch is true
    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, []);

    // Return the state and utility functions
    return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;