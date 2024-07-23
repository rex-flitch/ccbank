import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
const BUSINESMANAGER = gql`
    query getBusinessManager {
        businessManagerConnectAccount {
            data {
              id
              attributes {
                Hero {
                  Title
                  Description
                  BackgroundImage {
                    data {
                      attributes {
                        url
                        alternativeText
                      }
                    }
                  }
                  ButtonURL
                  ButtonTitle
                }
                Maximize {
                  id
                  Title
                  Description
                  Image {
                    data {
                      attributes {
                        url
                        alternativeText
                      }
                    }
                  }
                }
                Rates {
                  id
                  MainTitle
                  SuperTitle
                }
                Content
                TeamMember {
                  id,
                  TeamMemberName,
                  TeamMemberPhone,
                  TeamMemberEmail,
                  TeamMemberPosition
                  NMLS,
                  slug,
                  Bio,
                  TeamMemberImage {
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
    }
`
export default function BusinessManagerConnectAccount() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(BUSINESMANAGER)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero' style={{backgroundImage: `url(${data.businessManagerConnectAccount.data.attributes.Hero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.businessManagerConnectAccount.data.attributes.Hero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.businessManagerConnectAccount.data.attributes.Hero.Description !== null &&
                      <p>{data.businessManagerConnectAccount.data.attributes.Hero.Description}</p>
                    }
                    {data.businessManagerConnectAccount.data.attributes.Hero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to={data.businessManagerConnectAccount.data.attributes.Hero.ButtonURL}>{data.businessManagerConnectAccount.data.attributes.Hero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-50'>
        <div className='maximize bg-orange cta-box pd-50'>
            <div className='width-50'><img src={data.businessManagerConnectAccount.data.attributes.Maximize.Image.data.attributes.url} alt={data.businessManagerConnectAccount.data.attributes.Maximize.Image.data.attributes.alternativeText} /></div>
            <div className='width-50'><h2 className='white'>{data.businessManagerConnectAccount.data.attributes.Maximize.Title}</h2>
            <p>{data.businessManagerConnectAccount.data.attributes.Maximize.Description}</p></div>
        </div>
      </div>
      <div className='container mg-top-100'>
        <div className='box-cta bmca'>
            {data.businessManagerConnectAccount.data.attributes.Rates.map((rate) => (
                <div key={rate.id} className='box-item'>
                    <h3 >EARN</h3>
                    <h2 className='large'>{rate.MainTitle}</h2>
                    <h5>Annual Percentage Yield (APY)</h5>
                    <hr className='orange'></hr>
                    <h4 className='mg-top-20'>{rate.SuperTitle}</h4>
                </div>
            ))}
        </div>
      </div>
      <div className='container mg-top-100 mg-bottom-50'>
        <h2>How does a money market sweep account work?</h2>
        <hr className='orange mg-bottom-50'></hr>
        {parse(data.businessManagerConnectAccount.data.attributes.Content)}
        {/* <div className='btn-green center mg-top-50'><Link to='https://ccb.cloud.processmaker.net/webentry/12/business_account'>OPEN YOUR ACCOUNT</Link></div> */}
        <h3 className='mg-top-50 green'>Connect with us Directly:</h3>
        <hr className='orange'></hr>
        <div className='team-container container'>
            {data.businessManagerConnectAccount.data.attributes.TeamMember.map((team) => (
                <div key='team.id' className='location-team-item'>
                    <div className='link-overlay'><Link to={`/team/${team.slug}`}></Link></div>
                    <div className='location-team-image'><img src={team.TeamMemberImage.data.attributes.url} alt={team.TeamMemberImage.data.attributes.alternativeText} /></div>
                    <h3 className='green uppercase'>{team.TeamMemberName}</h3>
                    <p>{team.TeamMemberPosition}</p>
                    {team.NMLS !== null &&
                        <p>NMLS {team.NMLS}</p>
                    }
                    <div className='mg-top-20'>{parse(team.TeamMemberPhone)}</div>
                    <p>{team.TeamMemberEmail}</p>
                    {team.Bio !== null &&
                        <div className='mg-top-20'>{parse(team.Bio)}</div>
                    }   
                </div>
            ))}
        </div>
      </div>
    </main>
  )
}
