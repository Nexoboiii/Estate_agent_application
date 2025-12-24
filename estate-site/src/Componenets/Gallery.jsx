import { useState } from 'react'

function Gallery({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Function to go to next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  // Function to go to previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  if (!images || images.length === 0) return null

  return (
    <div>
      <h3>Gallery</h3>
      <div className="gallery-carousel">
        <button className="carousel-btn" onClick={prevImage}>&lt;</button>
        <img src={`/${images[currentImageIndex]}`} alt={`Gallery ${currentImageIndex + 1}`} className="carousel-image" />
        <button className="carousel-btn" onClick={nextImage}>&gt;</button>
      </div>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  )
}

export default Gallery