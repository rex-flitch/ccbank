import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
const GETZELLE = gql`
    query zelleQuery {
        zelle {
            data {
              id
              attributes {
                Hero {
                  Title
                  ButtonURL
                  ButtonTitle
                  Description
                  BackgroundImage {
                    data {
                      attributes {
                        url
                        alternativeText
                      }
                    }
                  }
                }
                IntroParagraph
                CTABoxes {
                  id
                  MainTitle
                  SuperTitle
                }
                MainContent
                ZelleVideo {
                  Title
                  Description
                  Video {
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
export default function Zelle() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(GETZELLE)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper opp-loans' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero' style={{backgroundImage: `url(${data.zelle.data.attributes.Hero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.zelle.data.attributes.Hero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.zelle.data.attributes.Hero.Description !== null &&
                      <p>{parse(data.zelle.data.attributes.Hero.Description)}</p>
                    }
                    {data.zelle.data.attributes.Hero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.zelle.data.attributes.Hero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-80 mg-bottom-50'>
        <div className='max-800 mg-auto'>{parse(data.zelle.data.attributes.IntroParagraph)}</div>
      </div>
        <div className='box-cta container mg-top-50 mg-bottom-50'>
            {data.zelle.data.attributes.CTABoxes.map((box) => (
                <div key='box.id' className='box-item'>
                    <h4 className='green center'>{box.MainTitle}</h4>
                    <p className='center'>{box.SuperTitle}</p>
                </div>
            ))}
        </div>
        <div className='zellevideo container center'>
            <h3 className='green'>{data.zelle.data.attributes.ZelleVideo.Title}</h3>
            <video width="800" height="auto" controls className='mg-top-20'>
                <source src={data.zelle.data.attributes.ZelleVideo.Video.data.attributes.url} type="video/mp4" />
            </video>
            <div className='mg-top-50'>{data.zelle.data.attributes.ZelleVideo.Description}</div>
            <div className='flexbox mg-top-20'>
                <div className='right'><a href="https://apps.apple.com/us/app/ccbankutah/id1511763497"><img src="https://res.cloudinary.com/dk6kie30d/image/upload/v1696618158/apple_ba04a3b94a.webp" alt="Apply App" /></a></div>
                <div className='left'><a href="https://play.google.com/store/apps/details?id=com.mfoundry.mb.android.mb_18u&hl=en_US"><img src="https://res.cloudinary.com/dk6kie30d/image/upload/v1696618137/android_6c0eb5e92a.webp" alt="Android App" /></a></div>
            </div>
        </div>
        <div className='container mg-top-100'>
            {parse(data.zelle.data.attributes.MainContent)}
        </div>
    </main>
  )
}
