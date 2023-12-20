import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'

const SBALOANSINFO = gql`
    query getSBALoans {
        sbaLoan {
            data {
              id,
              attributes {
                SBAHero {
                  id,
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
                  id,
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
                  id,
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
export default function SBALoans() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.signalintent.com/js/embedded.js?org-guid=4159706a-6c26-49d4-bfac-58d685253c89';
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (isScriptLoaded) {
      setTimeout(() => {
        if (window.Chimney?.calculators?.createCalc) {
          window.Chimney.calculators.createCalc('calculators', '793f8707-fa07-4f89-899f-75fc786d3401');
        }
      }, 1000); // Adjust the delay as necessary
    }
  }, [isScriptLoaded]);
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { data } = useQuery(SBALOANSINFO)

  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper sbaloans' id='main' tabIndex="-1">
      {data && (
        <>
      <div className='hero-banner'>
          <div className='hero bg-center' id={`sba-hero-id-${data.sbaLoan.data.attributes.SBAHero.id}`} style={{backgroundImage: `url(${data.sbaLoan.data.attributes.SBAHero.BackgroundImage.data[0].attributes.url})`}}>
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
            <div>{parse(data.sbaLoan.data.attributes.SBALoansIntro.Text)}</div>
        </div>
        <div className='sba-image'><img src={data.sbaLoan.data.attributes.SBALoansIntro.BackgroundImage.data.attributes.url} alt={data.sbaLoan.data.attributes.SBALoansIntro.BackgroundImage.data.attributes.alternativeText} /></div>
      </div>
      <div className='sbapreferredloans grey-box'>
        <h2 className='center container'>{data.sbaLoan.data.attributes.SBAPreferred}</h2>
        <hr className='center green'></hr>
        <div className='max-800 mg-auto'>{parse(data.sbaLoan.data.attributes.SBAPreferredDescription)}</div>
        <div className='box-cta container'>
            {data.sbaLoan.data.attributes.SBALoans.map((box) => (
                <div key={box.id} className='box-item'>
                    <h4 className='green left'>{box.MainTitle}</h4>
                    <div>{parse(box.SuperTitle)}</div>
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
      </div>
      </>
      )}
      <div className='calculators' id="calculators">
      </div>
    </main>
  )
}
