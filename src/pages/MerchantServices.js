import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'

const MERCHANTSERVICEINFO = gql`
    query getMerchant {
        merchantService {
            data {
              attributes {
                MerchantTitle,
                MerchantHero {
                  Title,
                  Description,
                  ButtonURL,
                  ButtonTitle,
                  BackgroundImage {
                    data {
                      attributes {
                        url,
                        alternativeText
                      }
                    }
                  }
                }
                MerchantAltCTA {
                  ImagePlacement,
                  ImageBackgroundColor,
                  Title,
                  Description,
                  ButtonURL,
                  ButtonTitle,
                  Image {
                    data {
                      attributes {
                        url,
                        alternativeText
                      }
                    }
                  }
                }
                ContactUs {
                  TeamMemberName,
                  TeamMemberPosition,
                  TeamMemberEmail,
                  TeamMemberPhone,
                  TeamMemberImage {
                    data {
                      attributes {
                        url,
                        alternativeText
                      }
                    }
                  }
                }
                EachTransaction {
                  Title,
                  Text,
                  ButtonURL,
                  ButtonTitle,
                  BackgroundImage {
                    data {
                      attributes {
                        url,
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
export default function Merchant() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(MERCHANTSERVICEINFO)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper merchant' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero bg-center' style={{backgroundImage: `url(${data.merchantService.data.attributes.MerchantHero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.merchantService.data.attributes.MerchantHero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.merchantService.data.attributes.MerchantHero.Description !== null &&
                      <p>{data.merchantService.data.attributes.MerchantHero.Description}</p>
                    }
                    {data.merchantService.data.attributes.MerchantHero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.merchantService.data.attributes.MerchantHero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <h2 className='green center mg-top-50 mg-bottom-50'>{data.merchantService.data.attributes.MerchantTitle}</h2>
      <div className='alt-image-color'>
        <div className='container'>
            {data.merchantService.data.attributes.MerchantAltCTA.map((altcta) => (
                <div key={altcta.id} className='alt-cta'>

                    {altcta.ImagePlacement === 'Left' &&
                        <div className={altcta.ImageBackgroundColor === 'Orange' ? 'alt-cta-image left alt-cta-orange' : 'alt-cta-image left alt-cta-green'}><img src={altcta.Image.data.attributes.url} alt={altcta.Image.data.attributes.alternativeText}/></div>
                    }

                    <div className='alt-cta-info'>
                        <div className='title'><h2>{altcta.Title}</h2></div>
                        <hr className='orange'></hr>
                        <div className='desciption'><p>{altcta.Description}</p></div>
                        {data.merchantService.data.attributes.MerchantHero.ButtonTitle !== null &&
                            <div className='btn-ghost-green'><Link to={altcta.ButtonURL}>{altcta.ButtonTitle}</Link></div>
                        }
                    </div>
                    {altcta.ImagePlacement === 'Right' &&
                        <div className={altcta.ImageBackgroundColor === 'Orange' ? 'alt-cta-image right alt-cta-orange' : 'alt-cta-image right alt-cta-green'}><img src={altcta.Image.data.attributes.url} alt={altcta.Image.data.attributes.alternativeText}/></div>
                    }
                </div>
            ))}
        </div>
      </div>
      <div className='merchant-contact container mg-top-50'>
        <h2 className='center'>Contact Us</h2>
        <hr className='green center'></hr>
        <div className='contact-container'>
            {data.merchantService.data.attributes.ContactUs.map((contact) => (
                <div key='contact.id' className='location-team-item mg-auto mg-top-50'>
                    <div className='location-team-image'><img src={contact.TeamMemberImage.data.attributes.url} alt={contact.TeamMemberImage.data.attributes.alternativeText} /></div>
                    <h3 className='green uppercase'>{contact.TeamMemberName}</h3>
                    <p>{contact.TeamMemberPosition}</p>
                    <p>{parse(contact.TeamMemberPhone)}</p>
                    <p>{contact.TeamMemberEmail}</p>
                </div>
            ))}
        </div>
      </div>
      <div className='background-left-text mg-top-50' style={{backgroundImage: `url(${data.merchantService.data.attributes.EachTransaction.BackgroundImage.data.attributes.url})`}}>
          <div className='grad-overlay'></div>
          <div className='background-left-text-text container'>
            <h3 className='max-800 white'>{data.merchantService.data.attributes.EachTransaction.Title}</h3>
            <hr className="orange"></hr>
            <p className='max-800 white mg-top-20'>{parse(data.merchantService.data.attributes.EachTransaction.Text)}</p>
          </div>
      </div>
    </main>
  )
}
