import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
const FINANCIALLIBRARYQUERY = gql`
    query getfinancialLibrary {
      financialLibrary {
        data {
          id
          attributes {
            Hero {
              Title
              Description
              ButtonTitle
              ButtonURL
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
            FinancialToolsButton
            FinancialToolsButtonURL
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
            FLImageCTA {
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
          }
        }
      }
    }
`
export default function FinancialLibrary() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(FINANCIALLIBRARYQUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper biller-solutions' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero' style={{backgroundImage: `url(${data.financialLibrary.data.attributes.Hero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.financialLibrary.data.attributes.Hero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.financialLibrary.data.attributes.Hero.Description !== null &&
                      <p>{data.financialLibrary.data.attributes.Hero.Description}</p>
                    }
                    {data.financialLibrary.data.attributes.Hero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to={data.financialLibrary.data.attributes.Hero.ButtonURL}>{data.financialLibrary.data.attributes.Hero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='cta-wrapper col-3 img-250'>
        {/* <h2 className='center orange'>{data.financialLibrary.data.attributes.Title}</h2>
        <hr className='green center'></hr> */}
        <div className='sbaloans-intro container mg-top-50 mg-bottom-50'>
        <div className='sba-text'>
            <h2>{data.financialLibrary.data.attributes.FLImageCTA.Title}</h2>
            <hr className='green'></hr>
            <div className='mg-top-20'>{parse(data.financialLibrary.data.attributes.FLImageCTA.Description)}</div>
            <div className='btn-green center mg-top-50'><Link to={data.financialLibrary.data.attributes.FLImageCTA.ButtonURL}>{data.financialLibrary.data.attributes.FLImageCTA.ButtonTitle}</Link></div>
        </div>
        <div className='sba-image'><img src={data.financialLibrary.data.attributes.FLImageCTA.Image.data.attributes.url} alt={data.financialLibrary.data.attributes.FLImageCTA.Image.data.attributes.alternativeText} /></div>
      </div>
        {/* <div className='btn-green center mg-top-50'><Link to={data.financialLibrary.data.attributes.FinancialToolsButtonURL}>{data.financialLibrary.data.attributes.FinancialToolsButton}</Link></div> */}
            <div className='cta-box container mg-top-100'>
                {data.financialLibrary.data.attributes.ImageCTA.map((cta) => (
                    <div key={cta.id} className='cta'>
                        <div className='cta-image' style={{backgroundImage: `url(${cta.Image.data.attributes.url})`}}></div>
                        <div className='cta-info'>
                            <div className='title'><h2>{cta.Title}</h2></div>
                            <hr className='green'></hr>
                            <div className='desciption'><p>{parse(cta.Description)}</p></div>
                            {cta.ButtonTitle !== null &&
                              <div className='btn-ghost-green'><Link reloadDocument to={cta.ButtonURL}>{cta.ButtonTitle}</Link></div>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </main>
  )
}
