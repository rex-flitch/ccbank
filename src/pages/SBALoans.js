import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'

const SBALOANSINFO = gql`
    query getSBALoans {
        sbaLoan {
            data {
              attributes {
                SBAHero {
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
                SBALoansIntro {
                  Title,
                  Text,
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
                SBAPreferred,
                SBAPreferredDescription,
                SBALoans {
                  MainTitle,
                  SuperTitle
                }
                SBALendingTeamTitle,
                SBALendingTeam {
                  id,
                  TeamMemberName,
                  TeamMemberPhone,
                  TeamMemberEmail,
                  TeamMemberPosition
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
              }
            }
          }
    }
`
export default function SBALoans() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(SBALOANSINFO)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <div className='wrapper sbaloans'>
      <div className='hero-banner'>
          <div className='hero bg-center' style={{backgroundImage: `url(${data.sbaLoan.data.attributes.SBAHero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.sbaLoan.data.attributes.SBAHero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.sbaLoan.data.attributes.SBAHero.Description !== null &&
                      <p>{data.sbaLoan.data.attributes.SBAHero.Description}</p>
                    }
                    {data.sbaLoan.data.attributes.SBAHero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.sbaLoan.data.attributes.SBAHero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='sbaloans-intro container mg-top-50'>
        <div className='sba-text'>
            <h2>{data.sbaLoan.data.attributes.SBALoansIntro.Title}</h2>
            <hr className='green'></hr>
            <p>{parse(data.sbaLoan.data.attributes.SBALoansIntro.Text)}</p>
        </div>
        <div className='sba-image'><img src={data.sbaLoan.data.attributes.SBALoansIntro.BackgroundImage.data.attributes.url} alt={data.sbaLoan.data.attributes.SBALoansIntro.BackgroundImage.data.attributes.alternativeText} /></div>
      </div>
      <div className='sbapreferredloans grey-box'>
        <h2 className='center'>{data.sbaLoan.data.attributes.SBAPreferred}</h2>
        <hr className='center green'></hr>
        <p className='max-800 mg-auto'>{parse(data.sbaLoan.data.attributes.SBAPreferredDescription)}</p>
        <div className='box-cta container'>
            {data.sbaLoan.data.attributes.SBALoans.map((box) => (
                <div key='box.id' className='box-item'>
                    <h4 className='green left'>{box.MainTitle}</h4>
                    <p>{parse(box.SuperTitle)}</p>
                </div>
            ))}
        </div>
      </div>
      <div className='sbateam mg-top-50'>
        <div className='loan-officers-inner container'>
            <h2 className='center'>{data.sbaLoan.data.attributes.SBALendingTeamTitle}</h2>
            <hr className='green center'></hr>
            <div className='team-container container'>
                {data.sbaLoan.data.attributes.SBALendingTeam.map((team) => (
                    <div key='team.id' className='location-team-item'>
                        <div className='location-team-image'><img src={team.TeamMemberImage.data.attributes.url} alt={team.TeamMemberName} /></div>
                        <h3 className='green uppercase'>{team.TeamMemberName}</h3>
                        <p>{team.TeamMemberPosition}</p>
                        <p>NMLS {team.NMLS}</p>
                        <p className='mg-top-20'>{parse(team.TeamMemberPhone)}</p>
                        <p>{team.TeamMemberEmail}</p>
                        {team.Bio !== null &&
                            <p className='mg-top-20'>{parse(team.Bio)}</p>
                        }   
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  )
}