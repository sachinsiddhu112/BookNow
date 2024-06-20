import React from 'react';
import "./FeaturedProperties.css";
import useFetch from '../../hooks/useFetch';

export default function FeaturedProperties() {
    const { data, loading, error } = useFetch("/hotels?featured=true&limit=6");

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Ensure data is an array
    if (!Array.isArray(data)) return <div>No featured properties available.</div>;

    return (
        <div className='fp'>
            {data.map((item, i) => (
                <div className="fpItem" key={i}>
                    <img
                        src={item.photos[0]}
                        alt=""
                        className="fpImg"
                    />
                    <span className="fpName">{item.name}</span>
                    <span className="fpCity">{item.city}</span>
                    <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
                    {item.rating && (
                        <div className="fpRating">
                            <button>{item.rating}</button>
                            <span>Excellent</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
