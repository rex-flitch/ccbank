import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
const PERSONALBANKING = gql`
    query getPersonalBanking {
        personalBanking {
            data {
              attributes {
                Title
                Description
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
                PersonalBankingHero {
                  id
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
              }
            }
          }
    }
`
export default function PersonalBanking() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(PERSONALBANKING)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper personal-banking' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero' id={`sba-hero-id-${data.personalBanking.data.attributes.PersonalBankingHero.id}`} style={{backgroundImage: `url(${data.personalBanking.data.attributes.PersonalBankingHero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.personalBanking.data.attributes.PersonalBankingHero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.personalBanking.data.attributes.PersonalBankingHero.Description !== null &&
                      <p>{data.personalBanking.data.attributes.PersonalBankingHero.Description}</p>
                    }
                    {data.personalBanking.data.attributes.PersonalBankingHero.ButtonTitle !== null &&
                      <div className='btn-green mg-top-50'><Link to={data.personalBanking.data.attributes.PersonalBankingHero.ButtonTitle}>{data.personalBanking.data.attributes.PersonalBankingHero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-80 mg-bottom-50'>
        <h2 className='center orange'>{data.personalBanking.data.attributes.Title}</h2>
        <hr className='green center'></hr>
        <div className='center'>{parse(data.personalBanking.data.attributes.Description)}</div>
      </div>
      <div className='cta-wrapper col-2'>
            <div className='cta-box container mg-top-50'>
                {data.personalBanking.data.attributes.ImageCTA.map((cta) => (
                    <div key={cta.id} className='cta'>
                        <div className='cta-image' style={{backgroundImage: `url(${cta.Image.data.attributes.url})`}} role="img"></div>
                        <div className='cta-info'>
                            <div className='title'><h2>{cta.Title}</h2></div>
                            <hr className='green'></hr>
                            <div className='desciption'><p>{parse(cta.Description)}</p></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </main>
  )
}
