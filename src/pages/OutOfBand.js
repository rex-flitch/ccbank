import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
const OUTOFBANDQUERY = gql`
    query getcookiePolicy {
        outOfBand {
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
                Title
                MainContent
              }
            }
          }
    }
`
export default function OutOfBand() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(OUTOFBANDQUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper biller-solutions' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero' style={{backgroundImage: `url(${data.outOfBand.data.attributes.Hero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.outOfBand.data.attributes.Hero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.outOfBand.data.attributes.Hero.Description !== null &&
                      <p>{data.outOfBand.data.attributes.Hero.Description}</p>
                    }
                    {data.outOfBand.data.attributes.Hero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.outOfBand.data.attributes.Hero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-80 mg-bottom-50'>
        <h2 className='center orange'>{data.outOfBand.data.attributes.Title}</h2>
        <hr className='green center'></hr>
        <div>{parse(data.outOfBand.data.attributes.MainContent)}</div>
      </div>
    </main>
  )
}
