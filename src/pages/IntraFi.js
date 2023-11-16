import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'

const INTRAFIINFO = gql`
    query getIntraFi {
        intraFi {
            data {
              id
              attributes {
                IntrafiTitle
                IntrafiDesc
                YouTubeVid
                BottomDescription
                ButtonURL
                ButtonTitle
                IntrafiHero {
                  Title
                  Description
                  ButtonURL
                  ButtonTitle
                  BackgroundImage {
                    data {
                      id
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
export default function IntraFi() {

  const { loading, error, data } = useQuery(INTRAFIINFO)
  console.log(data)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper intrafi' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero bg-center' style={{backgroundImage: `url(${data.intraFi.data.attributes.IntrafiHero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.intraFi.data.attributes.IntrafiHero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.intraFi.data.attributes.IntrafiHero.Description !== null &&
                      <p>{data.intraFi.data.attributes.IntrafiHero.Description}</p>
                    }
                    {data.intraFi.data.attributes.IntrafiHero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.intraFi.data.attributes.IntrafiHero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <h2 className='center mg-top-50'>{data.intraFi.data.attributes.IntrafiTitle}</h2>
      <hr className='green center'></hr>
      <div className='max-800 mg-top-20 mg-auto h-green'>{parse(data.intraFi.data.attributes.IntrafiDesc)}</div>
      <div className='max-800 mg-top-50 mg-auto btn-green'><Link to={data.intraFi.data.attributes.ButtonURL}>{data.intraFi.data.attributes.ButtonTitle}</Link></div>
      <div className='video-player max-800 mg-top-50 mg-auto'>
        {data.intraFi.data.attributes.YouTubeVid !== null &&
            <iframe className="youtube" src={data.intraFi.data.attributes.YouTubeVid} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        }
      </div>
      <div className='max-800 mg-top-50 mg-auto'>
        {parse(data.intraFi.data.attributes.BottomDescription)}
      </div>
    </main>
  )
}
