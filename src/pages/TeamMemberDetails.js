import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import ContactForm from '../components/ContactForm'

const TEAMMEMBERSINFO = gql`
    query getAllTeamMembers($slug: String!) {
        ccBankAllTeamMembers(filters: { slug: { eq: $slug } }) {
            data {
              attributes {
                slug,
                Name,
                Position,
                Email,
                Phone,
                NMLSNumber,
                Bio,
                Location,
                Photo {
                  data {
                    attributes {
                      url,
                      alternativeText
                    }
                  }
                }
              }
            }
          }
    }
`

export default function TeamMemberDetails() {
    //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
    const { slug } = useParams()
    const { loading, error, data } = useQuery(TEAMMEMBERSINFO, {
        variables: { slug: slug }
    })
    
  
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
  
    console.log(data)
    return (
      <main className='wrapper team-details' id='main' tabindex="-1">
        <div className='max-600 mg-auto'>
            <div className='details-flex'>
                <div className='details-image'>
                    <img src={ data.ccBankAllTeamMembers.data[0].attributes.Photo.data.attributes.url } alt={ data.ccBankAllTeamMembers.data[0].attributes.Photo.data.attributes.alternativeText } />
                </div>
                <div className='details-info'>
                    <div className='details-info-inner'>
                        <h4 className='green'>{ data.ccBankAllTeamMembers.data[0].attributes.Name }</h4>
                        <p>{ data.ccBankAllTeamMembers.data[0].attributes.Position }<br />
                        NMLS { data.ccBankAllTeamMembers.data[0].attributes.NMLSNumber }<br />
                        { data.ccBankAllTeamMembers.data[0].attributes.Phone }<br />
                        { data.ccBankAllTeamMembers.data[0].attributes.Email }</p>
                    </div>
                </div>
            </div>
            <div className='mg-top-50'>{ parse(data.ccBankAllTeamMembers.data[0].attributes.Bio) }</div>
            <div className='contact-form'>
                <ContactForm />
            </div>
        </div>
      </main>
    )
  }
  