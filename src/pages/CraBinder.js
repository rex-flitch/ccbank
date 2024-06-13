import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'

const QUERYCRABINDER = gql`
    query getCRABinder {
        craBinder {
            data {
              id
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
                PDFLinks {
                  id
                  MainTitle
                  SuperTitle
                }
                AdditionalInformation
              }
            }
          }
    }
`
export default function CraBinder() {

  const { loading, error, data } = useQuery(QUERYCRABINDER)
  console.log(data)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper intrafi' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero bg-center' style={{backgroundImage: `url(${data.craBinder.data.attributes.Hero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.craBinder.data.attributes.Hero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.craBinder.data.attributes.Hero.Description !== null &&
                      <p>{parse(data.craBinder.data.attributes.Hero.Description)}</p>
                    }
                    {data.craBinder.data.attributes.Hero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.craBinder.data.attributes.Hero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-50 mg-bottom-50'>
        <h2 className='center'>Bank Information</h2>
        <hr className='green center'></hr>
        <div className='mg-top-20 mg-bottom-20 center'>{parse(data.craBinder.data.attributes.AdditionalInformation)}</div>
        <hr className='green center'></hr>
        <div className='mg-top-50 max-500 mg-auto'>
            <ol className='numbers mg-left-50'>
            {data.craBinder.data.attributes.PDFLinks.map((pdflink) => (
                <li key={pdflink.id}><Link to={pdflink.SuperTitle}>{pdflink.MainTitle}</Link></li>
            ))}
            </ol>
        </div>
      </div>
    </main>
  )
}
