import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'

const PERSONALBANKINGLANINGGET = gql`
    query getPersonalBankingLanding {
        personalBankingLanding {
            data {
              attributes {
                Hero {
                  Title
                  Description
                  ButtonURL
                  ButtonTitle
                  BackgroundImage {
                    data {
                      attributes {
                        url
                        alternativeText
                      }
                    }
                  }
                }
                ImageCTA {
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
                PBTeam {
                    id
                    TeamMemberName
                    TeamMemberPhone
                    TeamMemberEmail
                    TeamMemberPosition
                    slug
                    NMLS
                    TeamMemberImage {
                      data {
                        attributes {
                          url
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
export default function PersonalBankingLanding() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(PERSONALBANKINGLANINGGET)
  console.log(data)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  
  return (
    <div className='wrapper personal-banking-landing'>
      <div className='hero-banner'>
          <div className='hero bg-center' style={{backgroundImage: `url(${data.personalBankingLanding.data.attributes.Hero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.personalBankingLanding.data.attributes.Hero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.personalBankingLanding.data.attributes.Hero.Description !== null &&
                      <p>{data.personalBankingLanding.data.attributes.Hero.Description}</p>
                    }
                    {data.personalBankingLanding.data.attributes.Hero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.personalBankingLanding.data.attributes.Hero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='bg-grey pd-tb-50'>
        <div className="locations-section container">
            <div className='location-flex'>
                {data.personalBankingLanding.data.attributes.ImageCTA.map((imagecta) => (
                <div key={imagecta.id} className='location-item'>
                    <div className='location-image'><img src={imagecta.Image.data.attributes.url} alt={imagecta.Image.data.attributes.alternativeText}/></div>
                    <div className='location-info'>
                        <h4 className='green'>{imagecta.Title}</h4>
                        <div className='description'><p>{parse(imagecta.Description)}</p></div>
                    </div>
                </div>
                ))}
            </div>
        </div>
        </div>
        <div className='personal-banking-team container mg-top-50 mg-bottom-50'>
            <h2 className='center'>Meet the Personal Banking</h2>
            <hr className='center green' />
            <div className='img-cta-container container'>
                {data.personalBankingLanding.data.attributes.PBTeam.map((team) => (
                    <div key='team.id' className='img-cta-team-item'>
                        <div className='link-overlay'><Link to={`/team/${team.slug}`}></Link></div>
                        {team.TeamMemberImage.data && 
                            <div className='img-cta-team-image'><img src={team.TeamMemberImage.data.attributes.url} alt={team.TeamMemberName} /></div>
                        }
                        
                        <h3 className='green uppercase'>{team.TeamMemberName}</h3>
                        <p>{parse(team.TeamMemberPosition)}</p>
                        {team.NMLS && 
                            <p>NMLS: {team.NMLS}</p>
                        }
                        <p>{parse(team.TeamMemberPhone)}</p>
                        <p>{team.TeamMemberEmail}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
