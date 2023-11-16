import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
const GETONLINEACCOUNTOPENING = gql`
    query getOnlineAccount {
        onlineAccountOpening {
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
                OpeningCTA {
                  Title
                  Description
                }
              }
            }
          }
    }
`
export default function OnlineAccountOpening() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(GETONLINEACCOUNTOPENING)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <div className='wrapper online-account-opening'>
      <div className='hero-banner'>
          <div className='hero' style={{backgroundImage: `url(${data.onlineAccountOpening.data.attributes.Hero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.onlineAccountOpening.data.attributes.Hero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.onlineAccountOpening.data.attributes.Hero.Description !== null &&
                      <p>{data.onlineAccountOpening.data.attributes.Hero.Description}</p>
                    }
                    {data.onlineAccountOpening.data.attributes.Hero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.onlineAccountOpening.data.attributes.Hero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='cta-wrapper'>
            <div className='cta-box container mg-top-50'>
                {data.onlineAccountOpening.data.attributes.OpeningCTA.map((cta) => (
                    <div key={cta.id} className='cta'>
                        <div className='cta-info'>
                            <div className='title'><h2>{cta.Title}</h2></div>
                            <hr className='green'></hr>
                            <div className='desciption'><p>{parse(cta.Description)}</p></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
