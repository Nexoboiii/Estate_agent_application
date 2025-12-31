import React from 'react'

function SearchWidget({ filters, setFilters }) {
    // Handler for updating filter state when form inputs change
    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters(prev => ({ ...prev, [name]: value }))
    }

    return (
        <form className="search-form">
            <div className="form-group">
                <label>Type:</label>
                <select name="type" value={filters.type} onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="House">House</option>
                    <option value="Flat">Flat</option>
                    <option value="Villa">Villa</option>
                    <option value="Studio">Studio</option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Terraced House">Terraced House</option>
                </select>
            </div>
            <div className="form-group">
                <label>Min Price:</label>
                <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} />
            </div>
            <div className="form-group">
                <label>Max Price:</label>
                <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} />
            </div>
            <div className="form-group">
                <label>Min Bedrooms:</label>
                <input type="number" name="minBedrooms" value={filters.minBedrooms} onChange={handleFilterChange} />
            </div>
            <div className="form-group">
                <label>Location:</label>
                <input type="text" name="location" value={filters.location} onChange={handleFilterChange} />
            </div>
        </form>
    )
}

export default SearchWidget