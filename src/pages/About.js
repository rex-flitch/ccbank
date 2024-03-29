import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'

const ABOUTPAGEINFO = gql`
    query getAbout {
        about {
          data {
            attributes {
              Title,
              Description,
              Quote,
              IconTitle,
              AboutHero {
                Title,
                Description,
                ButtonURL,
                ButtonTitle,
                BackgroundImage {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
              AboutVideo {
                Description,
                Title,
                YouTubeSRC,
                Video {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
              IconCTA {
                id,
                Title,
                Description,
                ButtonURL,
                ButtonTitle,
                Icon {
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
export default function About() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(ABOUTPAGEINFO)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper about' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero' style={{backgroundImage: `url(${data.about.data.attributes.AboutHero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.about.data.attributes.AboutHero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.about.data.attributes.AboutHero.Description !== null &&
                      <p>{data.about.data.attributes.AboutHero.Description}</p>
                    }
                    {data.about.data.attributes.AboutHero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to={data.about.data.attributes.AboutHero.ButtonURL}>{data.about.data.attributes.AboutHero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-50 mg-bottom-50'>
        <h2 className='center'>{data.about.data.attributes.Title}</h2>
        <hr className="green center"></hr>
        <p className='max-800 mg-auto'>{parse(data.about.data.attributes.Description)}</p>
      </div>
      <div className='video-wrapper'>
          <div className='video-box container'>
              <div className='video-info'>
                  <h2>{data.about.data.attributes.AboutVideo.Title}</h2>
                  <hr className='green'></hr>
                  <p>{data.about.data.attributes.AboutVideo.Description}</p>
              </div>
              <div className='video-player'>
                  {data.about.data.attributes.AboutVideo.Video.data !== null &&
                      <video controls>
                          <source src={data.about.data.attributes.AboutVideo.Video.data.attributes.url} type="video/mp4"/>
                      </video>
                  }
                  {data.about.data.attributes.AboutVideo.YouTubeSRC !== null &&
                      <iframe className="youtube" src={data.about.data.attributes.AboutVideo.YouTubeSRC} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                  }
                  
              </div>
          </div>
      </div>
      <div className='quote container'>
          <div className='quote-inner'>
              {parse(data.about.data.attributes.Quote)}
          </div>
      </div>
      <div className='icon-cta'>
          <h2 className='center'>{data.about.data.attributes.IconTitle}</h2>
          <hr className="green center mg-bottom-50"></hr>
          <div className='container cta-icon-box'>
              {data.about.data.attributes.IconCTA.map((iconcta) => (
                  <div key={iconcta.id} className='iconcta'>
                      <div className='iconcta-image'><img src={iconcta.Icon.data.attributes.url} alt={iconcta.Icon.data.attributes.alternativeText}/></div>
                      <div className='iconcta-info'>
                          <div className='title'><h3 className='orange'>{iconcta.Title}</h3></div>
                          <hr className='green'></hr>
                          <div className='desciption'><p>{iconcta.Description}</p></div>
                          <div className='btn-ghost-green'><Link to={iconcta.ButtonURL}>{iconcta.ButtonTitle}</Link></div>
                      </div>
                  </div>
              ))}
          </div>
      </div>
    </main>
  )
}
