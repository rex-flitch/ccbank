import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
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
    <div className='wrapper about'>
      <div className='hero-banner'>
          <div className='hero' style={{backgroundImage: `url(${data.about.data.attributes.AboutHero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-hero'>
                  <h1>{data.about.data.attributes.AboutHero.Title}</h1>
                  <hr className='orange'></hr>
                  <p>{data.about.data.attributes.AboutHero.Description}</p>
                  <div className='btn-green'><a href="/">{data.about.data.attributes.AboutHero.ButtonTitle}</a></div>
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
                  <video controls>
                      <source src={data.about.data.attributes.AboutVideo.Video.data.attributes.url} type="video/mp4"/>
                  </video>
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
                      <div className='iconcta-image'><img src={iconcta.Icon.data.attributes.url} alt={iconcta.Title}/></div>
                      <div className='iconcta-info'>
                          <div className='title'><h3 className='orange'>{iconcta.Title}</h3></div>
                          <hr className='green'></hr>
                          <div className='desciption'><p>{iconcta.Description}</p></div>
                          <div className='btn-ghost-green'><Link to={`/api/details/${iconcta.id}`}>Read more</Link></div>
                      </div>
                  </div>
              ))}
          </div>
      </div>
    </div>
  )
}
