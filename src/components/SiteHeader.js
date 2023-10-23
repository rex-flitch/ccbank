import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const CCSettings = gql`
query getHomepage {
  ccBankSettings {
    data {
      attributes {
        Logo {
          data {
            attributes {
              url
            }
          }
        }
        InstagramURL,
        TwitterURL,
        LinkedInURL,
        YouTubeURL
      }
    }
  }
}
`

export default function SiteHeader() {
  const { loading, error, data } = useQuery(CCSettings)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  // console.log(data)

  return (
    <div className="site-header">
      <div className="top-header">
        <ul className="container">
          <li><Link to="/about"><img src="https://res.cloudinary.com/dk6kie30d/image/upload/v1698100903/solar_loan_payment_21222ecbfe.png" alt="Solar Loan Payment"/>Solar Loan Payment</Link></li>
          <li><Link to="/careers"><img src="https://res.cloudinary.com/dk6kie30d/image/upload/v1698101083/careers_icon_b81ac6f9b1.png" alt="Careers Icon" />Careers</Link></li>
          <li><Link to="/locations"><img src="https://res.cloudinary.com/dk6kie30d/image/upload/v1698101186/locations_icon_772a372fd8.png" alt="Branch Locations Icon" />Branch Locations</Link></li>
        </ul>
      </div>
      <div className='main-header container'>
        <div className='logo-area'><Link to="/"><img src={data.ccBankSettings.data[0].attributes.Logo.data.attributes.url} alt='CC Bank Logo'/></Link></div>
        <nav className="main-nav">
          <ul>
            <li><Link to="/about">ABOUT</Link></li>
            <li><Link to="/personal">PERSONAL</Link></li>
            <li><Link to="/business-banking">BUSINESS</Link></li>
            <li><Link to="/resources">RESOURCES</Link></li>
            <li><Link to="/news">NEWS</Link></li>
            <li><Link to="/contact">CONTACT</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
