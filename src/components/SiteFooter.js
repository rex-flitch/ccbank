import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const CCSettingsFooter = gql`
query getFooter {
  ccBankSettings {
    data {
      attributes {
        FooterLogo {
          data {
            attributes {
              url
            }
          }
        }
        FacebookURL,
        InstagramURL,
        TwitterURL,
        LinkedInURL,
        YouTubeURL,
        RouterNumber,
        NMLSnumber,
        AppleAppURL,
        GoogleAppURL
      }
    }
  }
}
`

export default function SiteFooter() {
  const { loading, error, data } = useQuery(CCSettingsFooter)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  // console.log(data)

  return (
    <div className="footer">
      <div className='footer-main container'>
        <div className='footer-top-line'>
            <div className='footer-logo-area'><Link to="/"><img src={process.env.REACT_APP_BACKEND + data.ccBankSettings.data[0].attributes.FooterLogo.data.attributes.url} alt='CC Bank Logo'/></Link></div>
            <div className='footer-social'>
                <div className='social-item'><Link to={data.ccBankSettings.data[0].attributes.FacebookURL}><img src={process.env.REACT_APP_BACKEND + "/uploads/facebook_icon_889eb6bc9d.svg"} alt="CCBank Facebook"></img></Link></div>
                <div className='social-item'><Link to={data.ccBankSettings.data[0].attributes.TwitterURL}><img src={process.env.REACT_APP_BACKEND + "/uploads/twitter_icon_e6abf60938.svg"} alt="CCBank Twitter"></img></Link></div>
                <div className='social-item'><Link to={data.ccBankSettings.data[0].attributes.LinkedInURL}><img src={process.env.REACT_APP_BACKEND + "/uploads/linkedin_icon_0d42f0467a.svg"} alt="CCBank LinkedIn"></img></Link></div>
            </div>
            <nav className="footer-nav">
            <ul>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/locations">Locations</Link></li>
                <li><Link to="/rates">Rates</Link></li>
                <li><Link to="/site-map">Site Map</Link></li>
                <li><Link to="/privacy">Privacy</Link></li>
            </ul>
            </nav>
        </div>
        <div className='footer-middle-line'>
            <span>Routing &amp; Transit Number: {data.ccBankSettings.data[0].attributes.RouterNumber}</span>
            <span>NMLS Number: {data.ccBankSettings.data[0].attributes.NMLSnumber}</span>
            <span className='grey'>EQUAL HOUSING LENDER | MEMBER FDIC</span>
        </div>
        <div className='footer-bottom-line'>
            <ul>
                <li>Download Our Banking Apps</li>
                <li><img src={process.env.REACT_APP_BACKEND + "/uploads/apple_fe528cd245.webp"} alt="Apply App"></img></li>
                <li><img src={process.env.REACT_APP_BACKEND + "/uploads/android_dfc846f560.webp"} alt="Android App"></img></li>
            </ul>
        </div>
      </div>
      <div className='footer-copy'>
        <p>Copyright &copy; 2022-2023 CCBank. Al Right Reserved</p>
      </div>
    </div>
  )
}
