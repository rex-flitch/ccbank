import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const GETCTA = gql`
  query getCTA($id: ID!) {
    imageCta(id: $id) {
        data {
            id,
            attributes {
                Title,
                Description
            }
        }
    }
  }
`

export default function Resources() {
    const { id } = useParams()
    const { loading, error, data } = useQuery(GETCTA, {
      variables: { id: id }
    })
  
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
  
    console.log(data)
  
    return (
      <div className="review-card container">
        <h2>{data.imageCta.data.attributes.Title}</h2>
  
        <small>console list</small>
  
        <p>{data.imageCta.data.attributes.Description}</p>
      </div>
    )  
}
