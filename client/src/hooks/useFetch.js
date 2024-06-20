import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState([]);  // Initialize with an empty array
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);  // Set error to null initially

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);  // Reset error state before fetching
            try {
                const res = await axios.get(url);
                setData(Array.isArray(res.data) ? res.data : []); // Ensure data is an array
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);

    const reFetch = async (url) => {
        setLoading(true);
        setError(null);  // Reset error state before re-fetching
        try {
            const res = await axios.get(url);
            setData(Array.isArray(res.data) ? res.data : []); // Ensure data is an array
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    return { data, loading, error, reFetch };
};

export default useFetch;
