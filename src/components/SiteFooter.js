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
    <footer className="footer" id="footer">
      <div className='footer-main container'>
        <div className='footer-top-line'>
            <div className='footer-logo-area'><Link to="/"><img src={data.ccBankSettings.data[0].attributes.FooterLogo.data.attributes.url} alt='CC Bank Logo'/></Link></div>
            <div className='footer-social'>
                <div className='social-item'><Link to={data.ccBankSettings.data[0].attributes.LinkedInURL} target="_blank" rel="noopener noreferrer" aria-label="New Window"><img src={"https://res.cloudinary.com/dk6kie30d/image/upload/v1696618102/linkedin_icon_9157cad4a8.svg"} alt="CCBank LinkedIn"></img></Link></div>
                <div className='social-item'><Link to={data.ccBankSettings.data[0].attributes.FacebookURL} target="_blank" rel="noopener noreferrer" aria-label="New Window"><img src={"https://res.cloudinary.com/dk6kie30d/image/upload/v1696618023/facebook_icon_a5c278f767.svg"} alt="CCBank Facebook"></img></Link></div>
                <div className='social-item'><Link to={data.ccBankSettings.data[0].attributes.InstagramURL} target="_blank" rel="noopener noreferrer" aria-label="New Window"><img src={"https://res.cloudinary.com/dk6kie30d/image/upload/v1712343900/instagram_icon_9eaba86326.svg"} alt="CCBank Instagram"></img></Link></div>
                <div className='social-item'><Link to={data.ccBankSettings.data[0].attributes.TwitterURL} target="_blank" rel="noopener noreferrer" aria-label="New Window"><img src={"https://res.cloudinary.com/dk6kie30d/image/upload/v1712334959/twitter_x_icon_886c4c9b78.svg"} alt="CCBank Twitter"></img></Link></div>
                <div className='social-item'><Link to={data.ccBankSettings.data[0].attributes.YouTubeURL} target="_blank" rel="noopener noreferrer" aria-label="New Window"><img src={"https://res.cloudinary.com/dk6kie30d/image/upload/v1710525067/youtube_icon_219f76a0a1.svg"} alt="CCBank YouTube"></img></Link></div>
            </div>
            <nav className="footer-nav">
            <ul>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/locations">Locations</Link></li>
                <li><Link to="/rates">Rates</Link></li>
                <li><Link to="/site-map">Site Map</Link></li>
                <li><Link to="/privacy-policy">Privacy</Link></li>
            </ul>
            </nav>
        </div>
        <div className='footer-middle-line'>
            <span>Routing &amp; Transit Number: {data.ccBankSettings.data[0].attributes.RouterNumber}</span>
            <span>NMLS Number: {data.ccBankSettings.data[0].attributes.NMLSnumber}</span>
            <span className='footer-last'><img src="https://res.cloudinary.com/dk6kie30d/image/upload/v1706204381/house_icon_d68a6d70d1.svg" alt="House Icon" />EQUAL HOUSING LENDER | MEMBER FDIC</span>
        </div>
        <div className='footer-bottom-line'>
            <ul>
                <li>Download Our Banking Apps</li>
                <li><img src={"https://res.cloudinary.com/dk6kie30d/image/upload/v1696618158/apple_ba04a3b94a.webp"} alt="Apply App"></img></li>
                <li><img src={"https://res.cloudinary.com/dk6kie30d/image/upload/v1696618137/android_6c0eb5e92a.webp"} alt="Android App"></img></li>
            </ul>
            <div className='footer-app-links'>
              <div>
              <h4>Personal Banking:</h4>
              <Link to="https://apps.apple.com/us/app/ccbankutah/id1511763497">IOS Banking App</Link><br />
              <Link to="https://play.google.com/store/apps/details?id=com.mfoundry.mb.android.mb_18u">Android Banking App</Link>
              </div>
              <div>
              <h4>Business Banking:</h4>
              <Link to="https://apps.apple.com/us/app/ccbank-for-business/id1511762156">IOS Banking App</Link><br />
              <Link to="https://play.google.com/store/apps/details?id=com.mfoundry.mb.android.mb_beb101490">Android Banking App</Link>
              </div>
              <div>
                <Link to='/news/best-of-utah-valley-2024'><img className='footer-ribbon' src='https://res.cloudinary.com/dk6kie30d/image/upload/v1715976676/Best_Of_Utah_Valley_2024_b45b74879b.png' alt='Best of Utah Valley 2024 Ribbon' /></Link>
              </div>
            </div>
        </div>
      </div>
      <div className='footer-copy'>
        <p>Copyright &copy; 2024-2025 CCBank. All Rights Reserved</p>
      </div>
    </footer>
  )
}
