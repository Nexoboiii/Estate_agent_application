import { useParams } from 'react-router-dom'

function PropertyPage() {
  const { id } = useParams()
  return <h2>Property {id}</h2>
}

export default PropertyPage
