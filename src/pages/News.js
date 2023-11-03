import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'

const NEWSINFO = gql`
    query getNews {
        new {
            data {
              attributes {
                NewsHero {
                  Title
                  Description
                  ButtonURL
                  ButtonTitle
                  BackgroundImage {
                    data {
                      attributes {
                        alternativeText
                        url
                      }
                    }
                  }
                }
              }
            }
        }
        ccBanksNews(sort:"Date:desc")
        {
            data {
                id,
                attributes {
                    Title,
                    Date,
                    Story,
                    Media {
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
`
export default function News() {

  const { loading, error, data } = useQuery(NEWSINFO)
  console.log(data)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <div className='wrapper intafi'>
      <div className='hero-banner'>
          <div className='hero bg-center' style={{backgroundImage: `url(${data.new.data.attributes.NewsHero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.new.data.attributes.NewsHero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.new.data.attributes.NewsHero.Description !== null &&
                      <p>{data.new.data.attributes.NewsHero.Description}</p>
                    }
                    {data.new.data.attributes.NewsHero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.intraFi.data.attributes.NewsHero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='cc-news-preview'>
            <div className='cc-news-page-box container'>
                {data.ccBanksNews.data.map((news) => (
                    <div key={news.id} className='cc-news-page-inner'>
                        <div className='cc-news-overlay'><Link className='bold uppercase' to={`/news/${news.id}`}></Link></div>
                        <div className='cc-news-page-image'><img src={news.attributes.Media.data[0].attributes.url} alt={news.attributes.Media.data[0].attributes.alternativeText} /></div>
                        <div className='cc-news-page-info'>
                            <h5 className='center'>PRESS RELEASE</h5>
                            <hr className='center orange'></hr>
                            <h5 className='center dark-grey'>{news.attributes.Date}</h5>
                            <h4 className="fjalla center">{news.attributes.Title}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
