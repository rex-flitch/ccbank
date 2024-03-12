import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
const GETSERVICES = gql`
    query ServiceQuery {
        service {
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
                Description
                IconCTA {
                  id
                  Title
                  Description
                  ButtonURL
                  ButtonTitle
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
export default function Services() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(GETSERVICES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper services' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero' id={`service-hero-id-${data.service.data.attributes.Hero.id}`} style={{backgroundImage: `url(${data.service.data.attributes.Hero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{parse(data.service.data.attributes.Hero.Title)}</h1>
                    <hr className='orange'></hr>
                    {data.service.data.attributes.Hero.Description !== null &&
                      <p>{parse(data.service.data.attributes.Hero.Description)}</p>
                    }
                    {data.service.data.attributes.Hero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.service.data.attributes.Hero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-80 mg-bottom-50'>
        <h2 className='center orange'>{data.service.data.attributes.Title}</h2>
        <hr className='green center'></hr>
        <p className='max-800 mg-auto mg-top-20 center'>{parse(data.service.data.attributes.Description)}</p>
      </div>
      <div className='bg-grey pd-tb-50'>
        <div className="locations-section container">
            <div className='location-flex'>
                {data.service.data.attributes.IconCTA.map((imagecta) => (
                <div key={imagecta.id} className='location-item'>
                    <div className='location-icon'><img src={imagecta.Icon.data.attributes.url} alt={imagecta.Icon.data.attributes.alternativeText}/></div>
                    <div className='location-info'>
                        <div className='title center'><h3 className='green'>{imagecta.Title}</h3></div>
                        <hr className='green center'></hr>
                        <div className='description mg-top-20 center'><p>{parse(imagecta.Description)}</p></div>
                        {imagecta.ButtonTitle !== null &&
                          <div className='btn-green mg-top-20 center'><Link to={imagecta.ButtonURL}>{imagecta.ButtonTitle}</Link></div>
                        }
                    </div>
                </div>
                ))}
            </div>
        </div>
        </div>
    </main>
  )
}
