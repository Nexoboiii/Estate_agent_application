import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Gallery from './Gallery.jsx'

function PropertyPage() {
  // Get the property ID from the URL parameters
  const { id } = useParams()
  // State to store the current property data
  const [property, setProperty] = useState(null)
  // State for the active tab
  const [activeTab, setActiveTab] = useState('description')

  // Effect to fetch the specific property data based on ID
  useEffect(() => {
    fetch('/properties.json')
      .then(response => response.json())
      .then(data => {
        // Find the property that matches the ID
        const prop = data.properties.find(p => p.id === id)
        setProperty(prop)
      })
  }, [id]) // Re-run if ID changes

  // Show loading message if property data hasn't loaded yet
  if (!property) return <div>Loading...</div>

  // Function to render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div>
            <h3>Description</h3>
            <p>{property.description}</p>
          </div>
        )
      case 'floorplan':
        return (
          <div>
            <h3>Floor Plan</h3>
            <img src={`/${property.floorPlan}`} alt="Floor Plan" className="floor-plan" />
          </div>
        )
      case 'map':
        return (
          <div>
            <h3>Location</h3>
            <p><a href={property.mapUrl} target="_blank" rel="noopener noreferrer">View on Google Maps</a></p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="property-detail">
      {/* Link to go back to the search page */}
      <Link to="/">Back to Search</Link>
      <h2>{property.type} - {property.bedrooms} bedrooms</h2>
      {/* Display property image */}
      <img src={`/${property.picture}`} alt={property.type} />
      {/* Display property details */}
      <p><strong>Price:</strong> £{property.price.toLocaleString()}</p>
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Tenure:</strong> {property.tenure}</p>
      {/* Gallery section */}
      <Gallery images={property.gallery} />
      <p><strong>Added:</strong> {property.added.month} {property.added.day}, {property.added.year}</p>

      {/* Tabs */}
      <div className="tabs">
        <button className={activeTab === 'description' ? 'active' : ''} onClick={() => setActiveTab('description')}>Description</button>
        <button className={activeTab === 'floorplan' ? 'active' : ''} onClick={() => setActiveTab('floorplan')}>Floor Plan</button>
        <button className={activeTab === 'map' ? 'active' : ''} onClick={() => setActiveTab('map')}>Map</button>
      </div>
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  )
}

export default PropertyPage
