import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'

const HELOCINFO = gql`
    query getHelco {
        heloc {
            data {
              attributes {
                HELOCHero {
                  Title,
                  Description,
                  ButtonURL,
                  ButtonTitle,
                  BackgroundImage {
                    data {
                      attributes {
                        url,
                        alternativeText
                      }
                    }
                  }
                }
                HELOCTitle,
                HELOCDescription,
                LoanOfficer {
                  TeamMemberName,
                  TeamMemberPosition,
                  TeamMemberEmail,
                  TeamMemberPhone,
                  NMLS,
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
                BoxCTAs {
                  SuperTitle,
                  MainTitle
                }
              }
            }
          }
    }
`
export default function Heloc() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { data } = useQuery(HELOCINFO)

  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper merchant' id='main' tabindex="-1">
      {data && (
        <>
        <div className='hero-banner'>
          <div className='hero bg-center' style={{backgroundImage: `url(${data.heloc.data.attributes.HELOCHero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.heloc.data.attributes.HELOCHero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.heloc.data.attributes.HELOCHero.Description !== null &&
                        <p>{data.heloc.data.attributes.HELOCHero.Description}</p>
                    }
                    {data.heloc.data.attributes.HELOCHero.ButtonTitle !== null &&
                        <div className='btn-green'><Link to=''>{data.heloc.data.attributes.HELOCHero.ButtonTitle}</Link></div>
                    }
                </div>
            </div>
          </div>
      </div>
      <h2 className='center mg-top-50'>{data.heloc.data.attributes.HELOCTitle}</h2>
      <hr className='green center'></hr>
      <p className='max-800 mg-top-20 mg-auto'>{parse(data.heloc.data.attributes.HELOCDescription)}</p>
      <div className='grey-box'>
        <div className='box-cta max-800 mg-auto'>
            {data.heloc.data.attributes.BoxCTAs.map((box) => (
                <div key='box.id' className='box-item'>
                    <h4 className='green center'>{box.MainTitle}</h4>
                    <hr className='orange center mg-top-20 mg-bottom-20'></hr>
                    <p className='center'>{box.SuperTitle}</p>
                </div>
            ))}
        </div>
      </div>
      <div className='loan-officers mg-top-50'>
        <div className='loan-officers-inner container'>
            <h2 className='center'>Loan Officers</h2>
            <hr className='green center'></hr>
            <div className='team-container container'>
                {data.heloc.data.attributes.LoanOfficer.map((team) => (
                    <div key='team.id' className='location-team-item'>
                        <div className='location-team-image'><img src={team.TeamMemberImage.data.attributes.url} alt={team.TeamMemberImage.data.attributes.alternativeText} /></div>
                        <h3 className='green uppercase'>{team.TeamMemberName}</h3>
                        <p>{team.TeamMemberPosition}</p>
                        <p>NMLS {team.NMLS}</p>
                        <p className='mg-top-20'>{team.TeamMemberPhone}</p>
                        <p>{team.TeamMemberEmail}</p>
                        <p className='mg-top-20'>{parse(team.Bio)}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
        </>
      )}
      <div className='calculators'>
        <div id='sgi' data-guid='a72417a0-9193-4d41-885f-3d3d6a37af3d'></div>
      </div>
    </main>
  )
}
