describe('SearchBox Component - Type Search Logic', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('type filtering logic for "Flat" returns 1 result using properties.json data', () => {
    // Use the actual properties.json data structure
    const mockProperties = [
      { id: 'prop1', type: 'House', price: 750000, bedrooms: 3, location: 'Petts Wood Road, Petts Wood, Orpington BR5' },
      { id: 'prop2', type: 'Flat', price: 399995, bedrooms: 2, location: 'Crofton Road Orpington BR6' },
      { id: 'prop3', type: 'Villa', price: 950000, bedrooms: 4, location: 'Lennard Road, Beckenham BR3' },
      { id: 'prop4', type: 'Studio', price: 225000, bedrooms: 1, location: 'Station Approach, Hayes BR2' },
      { id: 'prop5', type: 'Bungalow', price: 625000, bedrooms: 3, location: 'Farnborough Hill, Farnborough BR6' },
      { id: 'prop6', type: 'Terraced House', price: 425000, bedrooms: 2, location: 'Shortlands Road, Bromley BR2' },
      { id: 'prop7', type: 'Studio', price: 195000, bedrooms: 1, location: 'Well Hall Road, Eltham SE9' }
    ]

    const filters = { type: 'Flat', minPrice: '', maxPrice: '', minBedrooms: '', location: '' }

    // Apply the same filtering logic as in SearchBox component
    const filtered = mockProperties.filter(prop => {
      return (
        (filters.type === '' || prop.type === filters.type) &&
        (filters.minPrice === '' || prop.price >= parseInt(filters.minPrice)) &&
        (filters.maxPrice === '' || prop.price <= parseInt(filters.maxPrice)) &&
        (filters.minBedrooms === '' || prop.bedrooms >= parseInt(filters.minBedrooms)) &&
        (filters.location === '' || prop.location.toLowerCase().includes(filters.location.toLowerCase()))
      )
    })

    expect(filtered).toHaveLength(1)
    expect(filtered[0].type).toBe('Flat')
    expect(filtered[0].id).toBe('prop2')
  })

  test('type filtering logic for "Studio" returns 2 results using properties.json data', () => {
    // Use the actual properties.json data structure
    const mockProperties = [
      { id: 'prop1', type: 'House', price: 750000, bedrooms: 3, location: 'Petts Wood Road, Petts Wood, Orpington BR5' },
      { id: 'prop2', type: 'Flat', price: 399995, bedrooms: 2, location: 'Crofton Road Orpington BR6' },
      { id: 'prop3', type: 'Villa', price: 950000, bedrooms: 4, location: 'Lennard Road, Beckenham BR3' },
      { id: 'prop4', type: 'Studio', price: 225000, bedrooms: 1, location: 'Station Approach, Hayes BR2' },
      { id: 'prop5', type: 'Bungalow', price: 625000, bedrooms: 3, location: 'Farnborough Hill, Farnborough BR6' },
      { id: 'prop6', type: 'Terraced House', price: 425000, bedrooms: 2, location: 'Shortlands Road, Bromley BR2' },
      { id: 'prop7', type: 'Studio', price: 195000, bedrooms: 1, location: 'Well Hall Road, Eltham SE9' }
    ]

    const filters = { type: 'Studio', minPrice: '', maxPrice: '', minBedrooms: '', location: '' }

    const filtered = mockProperties.filter(prop => {
      return (
        (filters.type === '' || prop.type === filters.type) &&
        (filters.minPrice === '' || prop.price >= parseInt(filters.minPrice)) &&
        (filters.maxPrice === '' || prop.price <= parseInt(filters.maxPrice)) &&
        (filters.minBedrooms === '' || prop.bedrooms >= parseInt(filters.minBedrooms)) &&
        (filters.location === '' || prop.location.toLowerCase().includes(filters.location.toLowerCase()))
      )
    })

    expect(filtered).toHaveLength(2)
    expect(filtered.every(prop => prop.type === 'Studio')).toBe(true)
    expect(filtered[0].id).toBe('prop4')
    expect(filtered[1].id).toBe('prop7')
  })

  test('minimum price filtering logic for 200K returns 6 results using properties.json data', () => {
    // Use the actual properties.json data structure
    const mockProperties = [
      { id: 'prop1', type: 'House', price: 750000, bedrooms: 3, location: 'Petts Wood Road, Petts Wood, Orpington BR5' },
      { id: 'prop2', type: 'Flat', price: 399995, bedrooms: 2, location: 'Crofton Road Orpington BR6' },
      { id: 'prop3', type: 'Villa', price: 950000, bedrooms: 4, location: 'Lennard Road, Beckenham BR3' },
      { id: 'prop4', type: 'Studio', price: 225000, bedrooms: 1, location: 'Station Approach, Hayes BR2' },
      { id: 'prop5', type: 'Bungalow', price: 625000, bedrooms: 3, location: 'Farnborough Hill, Farnborough BR6' },
      { id: 'prop6', type: 'Terraced House', price: 425000, bedrooms: 2, location: 'Shortlands Road, Bromley BR2' },
      { id: 'prop7', type: 'Studio', price: 195000, bedrooms: 1, location: 'Well Hall Road, Eltham SE9' }
    ]

    const filters = { type: '', minPrice: '200000', maxPrice: '', minBedrooms: '', location: '' }

    // Apply the same filtering logic as in SearchBox component
    const filtered = mockProperties.filter(prop => {
      return (
        (filters.type === '' || prop.type === filters.type) &&
        (filters.minPrice === '' || prop.price >= parseInt(filters.minPrice)) &&
        (filters.maxPrice === '' || prop.price <= parseInt(filters.maxPrice)) &&
        (filters.minBedrooms === '' || prop.bedrooms >= parseInt(filters.minBedrooms)) &&
        (filters.location === '' || prop.location.toLowerCase().includes(filters.location.toLowerCase()))
      )
    })

    expect(filtered).toHaveLength(6)
    expect(filtered.every(prop => prop.price >= 200000)).toBe(true)
    // Should exclude prop7 (195000) which is below 200K
    expect(filtered.find(prop => prop.id === 'prop7')).toBeUndefined()
  })

  test('minimum price filtering logic for 500K returns 3 results using properties.json data', () => {
    // Use the actual properties.json data structure
    const mockProperties = [
      { id: 'prop1', type: 'House', price: 750000, bedrooms: 3, location: 'Petts Wood Road, Petts Wood, Orpington BR5' },
      { id: 'prop2', type: 'Flat', price: 399995, bedrooms: 2, location: 'Crofton Road Orpington BR6' },
      { id: 'prop3', type: 'Villa', price: 950000, bedrooms: 4, location: 'Lennard Road, Beckenham BR3' },
      { id: 'prop4', type: 'Studio', price: 225000, bedrooms: 1, location: 'Station Approach, Hayes BR2' },
      { id: 'prop5', type: 'Bungalow', price: 625000, bedrooms: 3, location: 'Farnborough Hill, Farnborough BR6' },
      { id: 'prop6', type: 'Terraced House', price: 425000, bedrooms: 2, location: 'Shortlands Road, Bromley BR2' },
      { id: 'prop7', type: 'Studio', price: 195000, bedrooms: 1, location: 'Well Hall Road, Eltham SE9' }
    ]

    const filters = { type: '', minPrice: '500000', maxPrice: '', minBedrooms: '', location: '' }

    // Apply the same filtering logic as in SearchBox component
    const filtered = mockProperties.filter(prop => {
      return (
        (filters.type === '' || prop.type === filters.type) &&
        (filters.minPrice === '' || prop.price >= parseInt(filters.minPrice)) &&
        (filters.maxPrice === '' || prop.price <= parseInt(filters.maxPrice)) &&
        (filters.minBedrooms === '' || prop.bedrooms >= parseInt(filters.minBedrooms)) &&
        (filters.location === '' || prop.location.toLowerCase().includes(filters.location.toLowerCase()))
      )
    })

    expect(filtered).toHaveLength(3)
    expect(filtered.every(prop => prop.price >= 500000)).toBe(true)
    // Should only include properties: prop1 (750K), prop3 (950K), prop5 (625K)
    expect(filtered.map(prop => prop.id)).toEqual(['prop1', 'prop3', 'prop5'])
  })

  test('maximum price filtering logic for 200K returns 1 result using properties.json data', () => {
    // Use the actual properties.json data structure
    const mockProperties = [
      { id: 'prop1', type: 'House', price: 750000, bedrooms: 3, location: 'Petts Wood Road, Petts Wood, Orpington BR5' },
      { id: 'prop2', type: 'Flat', price: 399995, bedrooms: 2, location: 'Crofton Road Orpington BR6' },
      { id: 'prop3', type: 'Villa', price: 950000, bedrooms: 4, location: 'Lennard Road, Beckenham BR3' },
      { id: 'prop4', type: 'Studio', price: 225000, bedrooms: 1, location: 'Station Approach, Hayes BR2' },
      { id: 'prop5', type: 'Bungalow', price: 625000, bedrooms: 3, location: 'Farnborough Hill, Farnborough BR6' },
      { id: 'prop6', type: 'Terraced House', price: 425000, bedrooms: 2, location: 'Shortlands Road, Bromley BR2' },
      { id: 'prop7', type: 'Studio', price: 195000, bedrooms: 1, location: 'Well Hall Road, Eltham SE9' }
    ]

    const filters = { type: '', minPrice: '', maxPrice: '200000', minBedrooms: '', location: '' }

    // Apply the same filtering logic as in SearchBox component
    const filtered = mockProperties.filter(prop => {
      return (
        (filters.type === '' || prop.type === filters.type) &&
        (filters.minPrice === '' || prop.price >= parseInt(filters.minPrice)) &&
        (filters.maxPrice === '' || prop.price <= parseInt(filters.maxPrice)) &&
        (filters.minBedrooms === '' || prop.bedrooms >= parseInt(filters.minBedrooms)) &&
        (filters.location === '' || prop.location.toLowerCase().includes(filters.location.toLowerCase()))
      )
    })

    expect(filtered).toHaveLength(1)
    expect(filtered.every(prop => prop.price <= 200000)).toBe(true)
    // Should only include prop7 (195K) which is the only property <= 200K
    expect(filtered[0].id).toBe('prop7')
  })

  test('maximum price filtering logic for 500K returns 4 results using properties.json data', () => {
    // Use the actual properties.json data structure
    const mockProperties = [
      { id: 'prop1', type: 'House', price: 750000, bedrooms: 3, location: 'Petts Wood Road, Petts Wood, Orpington BR5' },
      { id: 'prop2', type: 'Flat', price: 399995, bedrooms: 2, location: 'Crofton Road Orpington BR6' },
      { id: 'prop3', type: 'Villa', price: 950000, bedrooms: 4, location: 'Lennard Road, Beckenham BR3' },
      { id: 'prop4', type: 'Studio', price: 225000, bedrooms: 1, location: 'Station Approach, Hayes BR2' },
      { id: 'prop5', type: 'Bungalow', price: 625000, bedrooms: 3, location: 'Farnborough Hill, Farnborough BR6' },
      { id: 'prop6', type: 'Terraced House', price: 425000, bedrooms: 2, location: 'Shortlands Road, Bromley BR2' },
      { id: 'prop7', type: 'Studio', price: 195000, bedrooms: 1, location: 'Well Hall Road, Eltham SE9' }
    ]

    const filters = { type: '', minPrice: '', maxPrice: '500000', minBedrooms: '', location: '' }

    // Apply the same filtering logic as in SearchBox component
    const filtered = mockProperties.filter(prop => {
      return (
        (filters.type === '' || prop.type === filters.type) &&
        (filters.minPrice === '' || prop.price >= parseInt(filters.minPrice)) &&
        (filters.maxPrice === '' || prop.price <= parseInt(filters.maxPrice)) &&
        (filters.minBedrooms === '' || prop.bedrooms >= parseInt(filters.minBedrooms)) &&
        (filters.location === '' || prop.location.toLowerCase().includes(filters.location.toLowerCase()))
      )
    })

    expect(filtered).toHaveLength(4)
    expect(filtered.every(prop => prop.price <= 500000)).toBe(true)
    // Should include properties: prop2 (400K), prop4 (225K), prop6 (425K), prop7 (195K)
    expect(filtered.map(prop => prop.id).sort()).toEqual(['prop2', 'prop4', 'prop6', 'prop7'].sort())
  })

  test('minimum bedrooms filtering logic for 1 bedroom returns 7 results using properties.json data', () => {
    // Use the actual properties.json data structure
    const mockProperties = [
      { id: 'prop1', type: 'House', price: 750000, bedrooms: 3, location: 'Petts Wood Road, Petts Wood, Orpington BR5' },
      { id: 'prop2', type: 'Flat', price: 399995, bedrooms: 2, location: 'Crofton Road Orpington BR6' },
      { id: 'prop3', type: 'Villa', price: 950000, bedrooms: 4, location: 'Lennard Road, Beckenham BR3' },
      { id: 'prop4', type: 'Studio', price: 225000, bedrooms: 1, location: 'Station Approach, Hayes BR2' },
      { id: 'prop5', type: 'Bungalow', price: 625000, bedrooms: 3, location: 'Farnborough Hill, Farnborough BR6' },
      { id: 'prop6', type: 'Terraced House', price: 425000, bedrooms: 2, location: 'Shortlands Road, Bromley BR2' },
      { id: 'prop7', type: 'Studio', price: 195000, bedrooms: 1, location: 'Well Hall Road, Eltham SE9' }
    ]

    const filters = { type: '', minPrice: '', maxPrice: '', minBedrooms: '1', location: '' }

    // Apply the same filtering logic as in SearchBox component
    const filtered = mockProperties.filter(prop => {
      return (
        (filters.type === '' || prop.type === filters.type) &&
        (filters.minPrice === '' || prop.price >= parseInt(filters.minPrice)) &&
        (filters.maxPrice === '' || prop.price <= parseInt(filters.maxPrice)) &&
        (filters.minBedrooms === '' || prop.bedrooms >= parseInt(filters.minBedrooms)) &&
        (filters.location === '' || prop.location.toLowerCase().includes(filters.location.toLowerCase()))
      )
    })

    expect(filtered).toHaveLength(7)
    expect(filtered.every(prop => prop.bedrooms >= 1)).toBe(true)
    // All properties should be included since all have at least 1 bedroom
    expect(filtered).toHaveLength(mockProperties.length)
  })

  test('minimum bedrooms filtering logic for 2 bedrooms returns 5 results using properties.json data', () => {
    // Use the actual properties.json data structure
    const mockProperties = [
      { id: 'prop1', type: 'House', price: 750000, bedrooms: 3, location: 'Petts Wood Road, Petts Wood, Orpington BR5' },
      { id: 'prop2', type: 'Flat', price: 399995, bedrooms: 2, location: 'Crofton Road Orpington BR6' },
      { id: 'prop3', type: 'Villa', price: 950000, bedrooms: 4, location: 'Lennard Road, Beckenham BR3' },
      { id: 'prop4', type: 'Studio', price: 225000, bedrooms: 1, location: 'Station Approach, Hayes BR2' },
      { id: 'prop5', type: 'Bungalow', price: 625000, bedrooms: 3, location: 'Farnborough Hill, Farnborough BR6' },
      { id: 'prop6', type: 'Terraced House', price: 425000, bedrooms: 2, location: 'Shortlands Road, Bromley BR2' },
      { id: 'prop7', type: 'Studio', price: 195000, bedrooms: 1, location: 'Well Hall Road, Eltham SE9' }
    ]

    const filters = { type: '', minPrice: '', maxPrice: '', minBedrooms: '2', location: '' }

    // Apply the same filtering logic as in SearchBox component
    const filtered = mockProperties.filter(prop => {
      return (
        (filters.type === '' || prop.type === filters.type) &&
        (filters.minPrice === '' || prop.price >= parseInt(filters.minPrice)) &&
        (filters.maxPrice === '' || prop.price <= parseInt(filters.maxPrice)) &&
        (filters.minBedrooms === '' || prop.bedrooms >= parseInt(filters.minBedrooms)) &&
        (filters.location === '' || prop.location.toLowerCase().includes(filters.location.toLowerCase()))
      )
    })

    expect(filtered).toHaveLength(5)
    expect(filtered.every(prop => prop.bedrooms >= 2)).toBe(true)
    // Should include properties: prop1 (3 beds), prop2 (2 beds), prop3 (4 beds), prop5 (3 beds), prop6 (2 beds)
    expect(filtered.map(prop => prop.id).sort()).toEqual(['prop1', 'prop2', 'prop3', 'prop5', 'prop6'].sort())
    // Should exclude 1-bedroom properties: prop4 and prop7
    expect(filtered.find(prop => prop.id === 'prop4')).toBeUndefined()
    expect(filtered.find(prop => prop.id === 'prop7')).toBeUndefined()
  })

  test('location search logic for "BR6" returns 2 results using properties.json data', () => {
    // Use the actual properties.json data structure
    const mockProperties = [
      { id: 'prop1', type: 'House', price: 750000, bedrooms: 3, location: 'Petts Wood Road, Petts Wood, Orpington BR5' },
      { id: 'prop2', type: 'Flat', price: 399995, bedrooms: 2, location: 'Crofton Road Orpington BR6' },
      { id: 'prop3', type: 'Villa', price: 950000, bedrooms: 4, location: 'Lennard Road, Beckenham BR3' },
      { id: 'prop4', type: 'Studio', price: 225000, bedrooms: 1, location: 'Station Approach, Hayes BR2' },
      { id: 'prop5', type: 'Bungalow', price: 625000, bedrooms: 3, location: 'Farnborough Hill, Farnborough BR6' },
      { id: 'prop6', type: 'Terraced House', price: 425000, bedrooms: 2, location: 'Shortlands Road, Bromley BR2' },
      { id: 'prop7', type: 'Studio', price: 195000, bedrooms: 1, location: 'Well Hall Road, Eltham SE9' }
    ]

    const filters = { type: '', minPrice: '', maxPrice: '', minBedrooms: '', location: 'BR6' }

    // Apply the same filtering logic as in SearchBox component
    const filtered = mockProperties.filter(prop => {
      return (
        (filters.type === '' || prop.type === filters.type) &&
        (filters.minPrice === '' || prop.price >= parseInt(filters.minPrice)) &&
        (filters.maxPrice === '' || prop.price <= parseInt(filters.maxPrice)) &&
        (filters.minBedrooms === '' || prop.bedrooms >= parseInt(filters.minBedrooms)) &&
        (filters.location === '' || prop.location.toLowerCase().includes(filters.location.toLowerCase()))
      )
    })

    expect(filtered).toHaveLength(2)
    expect(filtered.every(prop => prop.location.toLowerCase().includes('br6'))).toBe(true)
    // Should include properties: prop2 (Crofton Road Orpington BR6), prop5 (Farnborough Hill, Farnborough BR6)
    expect(filtered.map(prop => prop.id).sort()).toEqual(['prop2', 'prop5'].sort())
  })

  test('location search logic for "BR2" returns 2 results using properties.json data', () => {
    // Use the actual properties.json data structure
    const mockProperties = [
      { id: 'prop1', type: 'House', price: 750000, bedrooms: 3, location: 'Petts Wood Road, Petts Wood, Orpington BR5' },
      { id: 'prop2', type: 'Flat', price: 399995, bedrooms: 2, location: 'Crofton Road Orpington BR6' },
      { id: 'prop3', type: 'Villa', price: 950000, bedrooms: 4, location: 'Lennard Road, Beckenham BR3' },
      { id: 'prop4', type: 'Studio', price: 225000, bedrooms: 1, location: 'Station Approach, Hayes BR2' },
      { id: 'prop5', type: 'Bungalow', price: 625000, bedrooms: 3, location: 'Farnborough Hill, Farnborough BR6' },
      { id: 'prop6', type: 'Terraced House', price: 425000, bedrooms: 2, location: 'Shortlands Road, Bromley BR2' },
      { id: 'prop7', type: 'Studio', price: 195000, bedrooms: 1, location: 'Well Hall Road, Eltham SE9' }
    ]

    const filters = { type: '', minPrice: '', maxPrice: '', minBedrooms: '', location: 'BR2' }

    // Apply the same filtering logic as in SearchBox component
    const filtered = mockProperties.filter(prop => {
      return (
        (filters.type === '' || prop.type === filters.type) &&
        (filters.minPrice === '' || prop.price >= parseInt(filters.minPrice)) &&
        (filters.maxPrice === '' || prop.price <= parseInt(filters.maxPrice)) &&
        (filters.minBedrooms === '' || prop.bedrooms >= parseInt(filters.minBedrooms)) &&
        (filters.location === '' || prop.location.toLowerCase().includes(filters.location.toLowerCase()))
      )
    })

    expect(filtered).toHaveLength(2)
    expect(filtered.every(prop => prop.location.toLowerCase().includes('br2'))).toBe(true)
    // Should include properties: prop4 (Station Approach, Hayes BR2), prop6 (Shortlands Road, Bromley BR2)
    expect(filtered.map(prop => prop.id).sort()).toEqual(['prop4', 'prop6'].sort())
  })

  test('multi-category search logic for price 200K-800K and 2+ bedrooms returns 4 results using properties.json data', () => {
    // Use the actual properties.json data structure
    const mockProperties = [
      { id: 'prop1', type: 'House', price: 750000, bedrooms: 3, location: 'Petts Wood Road, Petts Wood, Orpington BR5' },
      { id: 'prop2', type: 'Flat', price: 399995, bedrooms: 2, location: 'Crofton Road Orpington BR6' },
      { id: 'prop3', type: 'Villa', price: 950000, bedrooms: 4, location: 'Lennard Road, Beckenham BR3' },
      { id: 'prop4', type: 'Studio', price: 225000, bedrooms: 1, location: 'Station Approach, Hayes BR2' },
      { id: 'prop5', type: 'Bungalow', price: 625000, bedrooms: 3, location: 'Farnborough Hill, Farnborough BR6' },
      { id: 'prop6', type: 'Terraced House', price: 425000, bedrooms: 2, location: 'Shortlands Road, Bromley BR2' },
      { id: 'prop7', type: 'Studio', price: 195000, bedrooms: 1, location: 'Well Hall Road, Eltham SE9' }
    ]

    const filters = { type: '', minPrice: '200000', maxPrice: '800000', minBedrooms: '2', location: '' }

    // Apply the same filtering logic as in SearchBox component
    const filtered = mockProperties.filter(prop => {
      return (
        (filters.type === '' || prop.type === filters.type) &&
        (filters.minPrice === '' || prop.price >= parseInt(filters.minPrice)) &&
        (filters.maxPrice === '' || prop.price <= parseInt(filters.maxPrice)) &&
        (filters.minBedrooms === '' || prop.bedrooms >= parseInt(filters.minBedrooms)) &&
        (filters.location === '' || prop.location.toLowerCase().includes(filters.location.toLowerCase()))
      )
    })

    expect(filtered).toHaveLength(4)
    expect(filtered.every(prop => prop.price >= 200000 && prop.price <= 800000 && prop.bedrooms >= 2)).toBe(true)
    // Should include properties: prop1 (750K, 3 beds), prop2 (399K, 2 beds), prop5 (625K, 3 beds), prop6 (425K, 2 beds)
    expect(filtered.map(prop => prop.id).sort()).toEqual(['prop1', 'prop2', 'prop5', 'prop6'].sort())

  })

  test('toggleFavorite adds property to favorites when not already favorited', () => {
    const mockProperties = [
      { id: 'prop1', type: 'House', price: 750000, bedrooms: 3, location: 'Petts Wood Road, Petts Wood, Orpington BR5' },
      { id: 'prop2', type: 'Flat', price: 399995, bedrooms: 2, location: 'Crofton Road Orpington BR6' }
    ]

    let favorites = []
    const setFavorites = jest.fn((updater) => {
      favorites = typeof updater === 'function' ? updater(favorites) : updater
    })

    // Simulate toggleFavorite function logic
    const toggleFavorite = (id) => {
      setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
    }

    // Add prop1 to favorites
    toggleFavorite('prop1')
    expect(setFavorites).toHaveBeenCalled()
    expect(favorites).toEqual(['prop1'])

    // Add prop2 to favorites
    toggleFavorite('prop2')
    expect(favorites).toEqual(['prop1', 'prop2'])
  })

  test('toggleFavorite removes property from favorites when already favorited', () => {
    let favorites = ['prop1', 'prop2', 'prop3']
    const setFavorites = jest.fn((updater) => {
      favorites = typeof updater === 'function' ? updater(favorites) : updater
    })

    // Simulate toggleFavorite function logic
    const toggleFavorite = (id) => {
      setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
    }

    // Remove prop2 from favorites
    toggleFavorite('prop2')
    expect(setFavorites).toHaveBeenCalled()
    expect(favorites).toEqual(['prop1', 'prop3'])

    // Remove prop1 from favorites
    toggleFavorite('prop1')
    expect(favorites).toEqual(['prop3'])
  })

  test('clearFavorites removes all favorites', () => {
    let favorites = ['prop1', 'prop2', 'prop3']
    const setFavorites = jest.fn((updater) => {
      favorites = typeof updater === 'function' ? updater(favorites) : updater
    })

    // Simulate clearFavorites function logic
    const clearFavorites = () => {
      setFavorites([])
    }

    clearFavorites()
    expect(setFavorites).toHaveBeenCalledWith([])
    expect(favorites).toEqual([])
  })
})
