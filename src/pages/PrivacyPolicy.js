import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
const BILLERSOLUTIONSAUTH = gql`
    query billerSolutions {
        privacyPolicy {
            data {
              id
              attributes {
                Title
                MainContent
                PrivacyHero {
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
export default function PrivacyPolicy() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(BILLERSOLUTIONSAUTH)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <div className='wrapper biller-solutions'>
      <div className='hero-banner'>
          <div className='hero' style={{backgroundImage: `url(${data.privacyPolicy.data.attributes.PrivacyHero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.privacyPolicy.data.attributes.PrivacyHero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.privacyPolicy.data.attributes.PrivacyHero.Description !== null &&
                      <p>{data.privacyPolicy.data.attributes.PrivacyHero.Description}</p>
                    }
                    {data.privacyPolicy.data.attributes.PrivacyHero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.privacyPolicy.data.attributes.PrivacyHero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-80 mg-bottom-50'>
        <h2 className='center orange'>{data.privacyPolicy.data.attributes.Title}</h2>
        <hr className='green center'></hr>
        <div>{parse(data.privacyPolicy.data.attributes.MainContent)}</div>
      </div>
    </div>
  )
}
