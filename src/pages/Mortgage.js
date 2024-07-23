import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
const MORTGAGEQUERY = gql`
    query getMortgage {
        shmMortgage {
            data {
              attributes {
                Hero {
                  Title
                  Description
                  ButtonURL
                  ButtonTitle
                  SecondButtonURL
                  SecondButtonTitle
                  BackgroundImage {
                    data {
                      attributes {
                        url
                        alternativeText
                      }
                    }
                  }
                  Active
                }
                MainTitle
                MainDescription
                MainButtonTitle
                MainButtonURL
                ImageCTA {
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
                BottomImageCTA {
                  Title
                  Image {
                    data {
                      attributes {
                        url
                        alternativeText
                      }
                    }
                  }
                  ButtonURL
                  ButtonTitle
                }
              }
            }
          }
    }
`
export default function Mortgage() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(MORTGAGEQUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper personal-banking' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero' id={`sba-hero-id-${data.shmMortgage.data.attributes.Hero.id}`} style={{backgroundImage: `url(${data.shmMortgage.data.attributes.Hero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                {/* <AccountLogin /> */}
                <div className='inner-hero'>
                    <h1>{data.shmMortgage.data.attributes.Hero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.shmMortgage.data.attributes.Hero.Description !== null &&
                      <p>{data.shmMortgage.data.attributes.Hero.Description}</p>
                    }
                    <img src="https://res.cloudinary.com/dk6kie30d/image/upload/v1721777137/SHM_Logos_Wide_Color_White_b0adfbf44a.png" alt="Security Home Mortgage Logo" style={{maxWidth: '244px'}} />
                    {data.shmMortgage.data.attributes.Hero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.shmMortgage.data.attributes.Hero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-50 mg-bottom-50'>
        <h2 className='green center'>{data.shmMortgage.data.attributes.MainTitle}</h2>
        <hr className='green center'></hr>
        <p className='center mg-top-20 max-800 mg-auto mg-bottom-20'>{parse(data.shmMortgage.data.attributes.MainDescription)}</p>
        {data.shmMortgage.data.attributes.MainButtonTitle !== null &&
            <div className='btn-green center'><Link to={data.shmMortgage.data.attributes.MainButtonURL}>{data.shmMortgage.data.attributes.MainButtonTitle}</Link></div>
        }
      </div>
      <div className='bg-grey pd-tb-50'>
        <div className="locations-section container">
            <div className='location-flex'>
                {data.shmMortgage.data.attributes.ImageCTA.map((imagecta) => (
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
      <div className='background-center-text' style={{backgroundImage: `url(${data.shmMortgage.data.attributes.BottomImageCTA.Image.data.attributes.url})`}}>
        <div className='grad-overlay-cover'></div>
        <div className='background-left-text-text container'>
            <h2 className='center white'>{data.shmMortgage.data.attributes.BottomImageCTA.Title}</h2>
            {data.shmMortgage.data.attributes.BottomImageCTA.ButtonTitle !== null &&
                <div className='btn-green center mg-top-20 mg-bottom-50'><Link to={data.shmMortgage.data.attributes.BottomImageCTA.ButtonURL}>{data.shmMortgage.data.attributes.BottomImageCTA.ButtonTitle}</Link></div>
            }
        </div>
      </div>
    </main>
  )
}
