import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SearchWidget from './SearchWidget.jsx'

function SearchBox() {
    // State for storing all properties fetched from JSON
    const [properties, setProperties] = useState([])
    // State for filtered properties based on search criteria
    const [filteredProperties, setFilteredProperties] = useState([])
    // State for favorite property IDs, persisted in localStorage
    const [favorites, setFavorites] = useState([])
    // State for search filter values
    const [filters, setFilters] = useState({
        type: '',
        minPrice: '',
        maxPrice: '',
        minBedrooms: '',
        location: ''
    })

    // Effect to fetch properties data on component mount
    useEffect(() => {
        fetch('./properties.json')
            .then(response => response.json())
            .then(data => {
                setProperties(data.properties)
                setFilteredProperties(data.properties)
            })
        // Load saved favorites from localStorage
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
        setFavorites(savedFavorites)
    }, [])

    // Effect to save favorites to localStorage whenever favorites change
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    // Effect to filter properties based on current filter values
    useEffect(() => {
        let filtered = properties.filter(prop => {
            return (
                (filters.type === '' || prop.type === filters.type) &&
                (filters.minPrice === '' || prop.price >= parseInt(filters.minPrice)) &&
                (filters.maxPrice === '' || prop.price <= parseInt(filters.maxPrice)) &&
                (filters.minBedrooms === '' || prop.bedrooms >= parseInt(filters.minBedrooms)) &&
                (filters.location === '' || prop.location.toLowerCase().includes(filters.location.toLowerCase()))
            )
        })
        setFilteredProperties(filtered)
    }, [filters, properties])

    // Function to toggle a property's favorite status
    const toggleFavorite = (id) => {
        setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
    }

    // Function to clear all favorites
    const clearFavorites = () => {
        setFavorites([])
    }

    // Handler for starting a drag operation on a property
    const handleDragStart = (e, id) => {
        e.dataTransfer.setData('text/plain', id)
    }

    // Handler for dropping a dragged property into favorites
    const handleDrop = (e) => {
        e.preventDefault()
        const id = e.dataTransfer.getData('text/plain')
        if (!favorites.includes(id)) {
            setFavorites(prev => [...prev, id])
        }
    }

    // Handler to allow dropping by preventing default behavior
    const handleDragOver = (e) => {
        e.preventDefault()
    }

    // Get the list of favorited properties
    const favoriteProperties = properties.filter(prop => favorites.includes(prop.id))

    return (
        <div>
            <h2>Property Search</h2>
            {/* Search form with filters */}
            <SearchWidget filters={filters} setFilters={setFilters} />
            {/* Favorites section with drop zone */}
            <div className="favorites-section" onDrop={handleDrop} onDragOver={handleDragOver}>
                <div className="favorites-header">
                    <h3>Favorites (Drag properties here or click heart)</h3>
                    <button onClick={clearFavorites} className="clear-favorites-btn">Clear All</button>
                </div>
                <div className="favorites-list">
                    {favoriteProperties.map(prop => (
                        <div key={prop.id} className="property-item favorite-item">
                            <img src={import.meta.env.BASE_URL + prop.picture} alt={prop.type} />
                            <div className="property-info">
                                <h3>{prop.type} - {prop.bedrooms} bedrooms</h3>
                                <p>£{prop.price.toLocaleString()}</p>
                                <p>{prop.location}</p>
                                <button onClick={() => toggleFavorite(prop.id)}>❤️ Remove</button>
                                <Link to={`/property/${prop.id}`} className="view-details-btn">View Details</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <h3>All Properties</h3>
            {/* List of filtered properties */}
            <div className="property-list">
                {filteredProperties.map(prop => (
                    <div key={prop.id} className="property-item" draggable onDragStart={(e) => handleDragStart(e, prop.id)}>
                        <img src={import.meta.env.BASE_URL + prop.picture} alt={prop.type} />
                        <div className="property-info">
                            <h3>{prop.type} - {prop.bedrooms} bedrooms</h3>
                            <p>£{prop.price.toLocaleString()}</p>
                            <p>{prop.location}</p>
                            <p>{prop.description.substring(0, 100)}...</p>
                            <button onClick={() => toggleFavorite(prop.id)}>
                                {favorites.includes(prop.id) ? '❤️' : '🤍'}
                            </button>
                            <Link to={`/property/${prop.id}`} className="view-details-btn">View Details</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default SearchBox;