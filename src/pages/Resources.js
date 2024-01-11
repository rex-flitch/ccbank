import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
const RESOURCESQUERY = gql`
    query getResources {
      resource {
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
            ImageCTAs {
              id
              Title
              Description
              ButtonURL
              ButtonTitle
              Image {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
            }
            PrivacyTitle
            PrivacyText
          }
        }
      }
    }
`
export default function Resources() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(RESOURCESQUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper personal-banking' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero' id={`sba-hero-id-${data.resource.data.attributes.Hero.id}`} style={{backgroundImage: `url(${data.resource.data.attributes.Hero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.resource.data.attributes.Hero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.resource.data.attributes.Hero.Description !== null &&
                      <p>{data.resource.data.attributes.Hero.Description}</p>
                    }
                    {data.resource.data.attributes.Hero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.resource.data.attributes.Hero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='bg-grey pd-tb-50'>
        <div className="locations-section container">
            <div className='location-flex'>
                {data.resource.data.attributes.ImageCTAs.map((imagecta) => (
                <div key={imagecta.id} className='location-item'>
                    <div className='location-image'><img src={imagecta.Image.data.attributes.url} alt={imagecta.Image.data.attributes.alternativeText}/></div>
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
      <div className='container mg-top-80 mg-bottom-50'>
        <h2 className='center orange'>{data.resource.data.attributes.PrivacyTitle}</h2>
        <hr className='green center'></hr>
        <div>{parse(data.resource.data.attributes.PrivacyText)}</div>
      </div>
    </main>
  )
}
