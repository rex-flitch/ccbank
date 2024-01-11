import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
const GETSELFDIRECTEDIRA = gql`
    query queryselfDirectedIRA {
        selfDirectedIra {
            data {
              id
              attributes {
                Hero {
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
                Title
                Content
              }
            }
          }
    }
`
export default function SelfDirectedIRA() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(GETSELFDIRECTEDIRA)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper biller-solutions' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero' style={{backgroundImage: `url(${data.selfDirectedIra.data.attributes.Hero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.selfDirectedIra.data.attributes.Hero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.selfDirectedIra.data.attributes.Hero.Description !== null &&
                      <p>{data.selfDirectedIra.data.attributes.Hero.Description}</p>
                    }
                    {data.selfDirectedIra.data.attributes.Hero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.selfDirectedIra.data.attributes.Hero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-80 mg-bottom-50'>
        <h2 className='center orange'>{data.selfDirectedIra.data.attributes.Title}</h2>
        <hr className='green center'></hr>
        <div>{parse(data.selfDirectedIra.data.attributes.Content)}</div>
      </div>
    </main>
  )
}
